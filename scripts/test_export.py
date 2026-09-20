import argparse
from pathlib import Path
from core.extractors.docling_extractor import DoclingExtractor
from core.extractors.excel_exporter import ExcelExporter
from core.extractors.word_exporter import WordExporter


def main():
    parser = argparse.ArgumentParser()

    parser.add_argument(
        "file",
        help="PDF or image to extract",
    )

    args = parser.parse_args()

    source = Path(args.file)

    output_directory = Path("output")
    output_directory.mkdir(exist_ok=True)

    extractor = DoclingExtractor()

    excel_exporter = ExcelExporter()
    word_exporter = WordExporter()

    print(f"Extracting: {source}")

    result = extractor.extract(source)

    stem = source.stem

    excel_path = output_directory / f"{stem}.xlsx"
    word_path = output_directory / f"{stem}.docx"

    excel_exporter.export(
        result,
        excel_path,
    )

    word_exporter.export(
        result,
        word_path,
    )

    print()
    print("Export complete:")
    print(f"Excel: {excel_path}")
    print(f"Word:  {word_path}")


if __name__ == "__main__":
    main()