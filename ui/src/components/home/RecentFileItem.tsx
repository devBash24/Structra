// src/components/home/RecentFileItem.tsx

import { ChevronRight, FileText } from "lucide-react";

export type RecentFile = {
  id: string;
  name: string;
  processedAt: string;
};

type RecentFileItemProps = {
  file: RecentFile;
};

export function RecentFileItem({
  file,
}: RecentFileItemProps) {
  return (
    <button
      type="button"
      className="
        group
        flex w-full
        items-center
        gap-4
        px-5
        py-4
        text-left
        transition-colors
        hover:bg-accent/50
      "
    >
      <div
        className="
          flex size-11
          shrink-0
          items-center
          justify-center
          rounded-xl
          border
          border-red-100
          bg-red-50
          text-red-500
        "
      >
        <FileText className="size-5" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">
          {file.name}
        </p>

        <p className="mt-1 text-xs text-muted-foreground">
          {file.processedAt}
        </p>
      </div>

      <ChevronRight
        className="
          size-5
          shrink-0
          text-muted-foreground
          transition-transform
          group-hover:translate-x-0.5
          group-hover:text-foreground
        "
      />
    </button>
  );
}