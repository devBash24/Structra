from pathlib import Path
import webview
from core.extractors.docling_extractor import DoclingExtractor

class StructraAPI:
    def __init__(self):
        self.window = None
        self.extractor = DoclingExtractor()

    def select_document(self):
        if not self.window:
            return None

        result = self.window.create_file_dialog(
            webview.FileDialog.OPEN,
            allow_multiple=False,
            file_types=(
                "Documents (*.pdf;*.png;*.jpg;*.jpeg)",
            ),
        )

        if not result:
            return None

        file_path = Path(result[0])

        return {
            "path": str(file_path),
            "name": file_path.name,
            "extension": file_path.suffix.lower(),
        }

    def extract_document(self, file_path: str):
        try:
            result = self.extractor.extract(file_path)

            return {
                "success": True,
                "data": result,
            }

        except Exception as exc:
            return {
                "success": False,
                "error": str(exc),
            }