import { RecentFiles } from "@/components/Home/RecentFiles";
import { DropZone } from "@/components/Home/dropzone";

export function HomePage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-8 py-10 lg:px-12">
      <DropZone />

      <RecentFiles />
    </div>
  );
}