import { FileText } from "lucide-react";
import { useRef, useState } from "react";
import type { ChangeEvent, DragEvent } from "react";

type DropZoneProps = {
  onFileSelected: (file: File) => void;
};

export function DropZone({ onFileSelected }: DropZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  function openFilePicker() {
    inputRef.current?.click();
  }

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      console.warn("Only PDF files are supported.");
      return;
    }

    onFileSelected(file);
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      console.warn("Only PDF files are supported.");
      return;
    }

    onFileSelected(file);

    // Allows selecting the same file again later.
    event.target.value = "";
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,.pdf"
        onChange={handleFileChange}
        className="hidden"
      />

      <div
        role="button"
        tabIndex={0}
        onClick={openFilePicker}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openFilePicker();
          }
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          group
          flex min-h-[330px]
          cursor-pointer
          flex-col
          items-center
          justify-center
          rounded-2xl
          border-2
          border-dashed
          transition-all
          duration-200
          ${
            isDragging
              ? "border-primary bg-primary/5"
              : "border-primary/35 bg-muted/10 hover:border-primary/60 hover:bg-primary/[0.025]"
          }
        `}
      >
        <div
          className="
            mb-6
            flex size-20
            items-center
            justify-center
            rounded-full
            bg-muted/60
            text-muted-foreground
            transition-colors
            group-hover:text-primary
          "
        >
          <FileText className="size-10" strokeWidth={1.6} />
        </div>

        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Drag & drop a PDF here
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          or{" "}
          <span className="font-medium text-primary">
            click to browse
          </span>
        </p>
      </div>
    </>
  );
}