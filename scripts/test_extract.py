import argparse
import json
from core.extractors.docling_extractor import DoclingExtractor


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Test Structra document extraction."
    )

    parser.add_argument(
        "file",
        help="Path to a PDF or image",
    )

    args = parser.parse_args()

    extractor = DoclingExtractor()

    print("\nStructra")
    print("--------")
    print(f"Processing: {args.file}\n")

    result = extractor.extract(args.file)

    print(f"File: {result['filename']}")
    print(f"Tables found: {result['table_count']}")

    print("\n--- Extracted Text ---\n")

    text = result["text"]

    # Don't flood the terminal with huge documents.
    print(text[:2000])

    if len(text) > 2000:
        print("\n... [truncated]")

    print("\n--- Tables ---")

    for table in result["tables"]:
        print(
            f"\nTable {table['index']}: "
            f"{table['row_count']} rows × "
            f"{table['column_count']} columns"
        )

        print(json.dumps(table, indent=2)[:3000])


if __name__ == "__main__":
    main()