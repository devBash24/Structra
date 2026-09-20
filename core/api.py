from pathlib import Path
import webview
from core.extractors.docling_extractor import DoclingExtractor
from exporters.excel_exporter import ExcelExporter
from exporters.word_exporter import WordExporter

class StructraAPI:
    def __init__(self):
        self.window = None

        self.extractor = DoclingExtractor()
        self.excel_exporter = ExcelExporter()
        self.word_exporter = WordExporter()

        self.current_result = None
        self.current_source = None

    def select_document(self):
        if not self.window:
            return None

        result = self.window.create_file_dialog(
            webview.FileDialog.OPEN,
            allow_multiple=False,
            file_types=(
                "Supported documents (*.pdf;*.png;*.jpg;*.jpeg)",
                "PDF files (*.pdf)",
                "Images (*.png;*.jpg;*.jpeg)",
            ),
        )

        if not result:
            return None

        path = Path(result[0])

        return {
            "path": str(path),
            "name": path.name,
            "extension": path.suffix.lower(),
        }

    def extract_document(self, file_path: str):
        try:
            result = self.extractor.extract(file_path)

            self.current_result = result
            self.current_source = Path(file_path)

            return {
                "success": True,
                "data": result,
            }

        except Exception as exc:
            return {
                "success": False,
                "error": str(exc),
            }

    def export_current(self, export_type: str):
        if not self.current_result or not self.current_source:
            return {
                "success": False,
                "error": "No extracted document is available.",
            }

        try:
            stem = self.current_source.stem

            if export_type == "excel":
                extension = ".xlsx"
                default_name = f"{stem}.xlsx"

                output = self.window.create_file_dialog(
                    webview.FileDialog.SAVE,
                    save_filename=default_name,
                    file_types=(
                        "Excel Workbook (*.xlsx)",
                    ),
                )

                if not output:
                    return {"success": False, "cancelled": True}

                path = Path(output[0])

                if path.suffix.lower() != extension:
                    path = path.with_suffix(extension)

                self.excel_exporter.export(
                    self.current_result,
                    path,
                )

            elif export_type == "word":
                extension = ".docx"
                default_name = f"{stem}.docx"

                output = self.window.create_file_dialog(
                    webview.FileDialog.SAVE,
                    save_filename=default_name,
                    file_types=(
                        "Word Document (*.docx)",
                    ),
                )

                if not output:
                    return {"success": False, "cancelled": True}

                path = Path(output[0])

                if path.suffix.lower() != extension:
                    path = path.with_suffix(extension)

                self.word_exporter.export(
                    self.current_result,
                    path,
                )

            else:
                return {
                    "success": False,
                    "error": f"Unsupported export type: {export_type}",
                }

            return {
                "success": True,
                "path": str(path),
            }

        except Exception as exc:
            return {
                "success": False,
                "error": str(exc),
            }

    def clear_document(self):
        self.current_result = None
        self.current_source = None

        return {"success": True}