from pathlib import Path
from typing import Any

from docling.document_converter import DocumentConverter


class DoclingExtractor:
    """
    Core document extraction engine for Structra.

    Converts supported documents into:
    - Plain text
    - Markdown
    - Structured tables
    """

    def __init__(self) -> None:
        self.converter = DocumentConverter()

    def extract(self, file_path: str | Path) -> dict[str, Any]:
        path = Path(file_path).expanduser().resolve()

        if not path.exists():
            raise FileNotFoundError(f"File does not exist: {path}")

        if not path.is_file():
            raise ValueError(f"Path is not a file: {path}")

        result = self.converter.convert(path)
        document = result.document

        tables = []

        for index, table in enumerate(document.tables, start=1):
            dataframe = table.export_to_dataframe(doc=document)

            # Replace NaN values so that the result can later
            # be safely passed to JSON / React.
            dataframe = dataframe.fillna("")

            tables.append(
                {
                    "index": index,
                    "columns": [str(column) for column in dataframe.columns],
                    "rows": [
                        [str(value) for value in row]
                        for row in dataframe.values.tolist()
                    ],
                    "row_count": len(dataframe),
                    "column_count": len(dataframe.columns),
                }
            )

        return {
            "filename": path.name,
            "path": str(path),
            "text": document.export_to_markdown(strict_text=True),
            "markdown": document.export_to_markdown(),
            "table_count": len(tables),
            "tables": tables,
        }