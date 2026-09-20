import { useState } from "react";

import { AppShell } from "@/components/app-shell/AppShell";
import { HomePage } from "@/pages/HomePage";
import { ProcessingPage } from "@/pages/ProcessingPage";

type AppView = "home" | "processing" | "results";

function App() {
  const [view, setView] = useState<AppView>("home");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  function handleFileSelected(file: File) {
    console.log("File selected:", file);

    setSelectedFile(file);
    setView("processing");
  }

  function handleProcessingComplete() {
    setView("results");
  }

  return (
    <AppShell>
      {view === "home" && (
        <HomePage onFileSelected={handleFileSelected} />
      )}

      {view === "processing" && selectedFile && (
        <ProcessingPage
          file={selectedFile}
          onComplete={handleProcessingComplete}
        />
      )}

      {view === "results" && (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
          Results
        </div>
      )}
    </AppShell>
  );
}

export default App;