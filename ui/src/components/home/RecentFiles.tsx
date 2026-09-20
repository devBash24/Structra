import {
  RecentFileItem,
  type RecentFile,
} from "./RecentFileItem";

const recentFiles: RecentFile[] = [
  {
    id: "1",
    name: "Invoice_2024.pdf",
    processedAt: "Processed 2 hours ago",
  },
  {
    id: "2",
    name: "Report_Q1.pdf",
    processedAt: "Processed 1 day ago",
  },
  {
    id: "3",
    name: "Financial_Statement.pdf",
    processedAt: "Processed 3 days ago",
  },
];

export function RecentFiles() {
  return (
    <section className="mt-10">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-heading text-base font-semibold">
          Recently Processed
        </h2>

        <button
          type="button"
          className="
            text-sm
            font-medium
            text-primary
            transition-opacity
            hover:opacity-75
          "
        >
          See all →
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        {recentFiles.map((file, index) => (
          <div
            key={file.id}
            className={
              index !== recentFiles.length - 1
                ? "border-b border-border"
                : ""
            }
          >
            <RecentFileItem file={file} />
          </div>
        ))}
      </div>
    </section>
  );
}