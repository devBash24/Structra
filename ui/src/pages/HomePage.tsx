import { DropZone } from "@/components/home/DropZone";
import { RecentFiles } from "@/components/home/RecentFiles";

type HomePageProps = {
  onFileSelected: (file: File) => void;
};

export function HomePage({
  onFileSelected,
}: HomePageProps) {
  return (
    <div className="mx-auto w-full max-w-5xl px-8 py-10 lg:px-12">
      <DropZone onFileSelected={onFileSelected} />

      <RecentFiles />
    </div>
  );
}