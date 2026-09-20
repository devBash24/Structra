import {
  FileText,
  LockKeyhole,
} from "lucide-react";

import {
  ProcessingStage,
  type ProcessingStageState,
} from "./ProcessingStage";

type Stage = {
  id: string;
  label: string;
  state: ProcessingStageState;
};

type ProcessingStatusProps = {
  fileName: string;
  stages: Stage[];
};

export function ProcessingStatus({
  fileName,
  stages,
}: ProcessingStatusProps) {
  const completedCount = stages.filter(
    (stage) => stage.state === "complete"
  ).length;

  const progress =
    stages.length === 0
      ? 0
      : Math.round((completedCount / stages.length) * 100);

  return (
    <div className="w-full max-w-xl">
      <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
        <div className="flex flex-col items-center text-center">
          <div className="mb-5 flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <FileText className="size-8" strokeWidth={1.8} />
          </div>

          <h1 className="font-heading text-2xl font-semibold tracking-tight">
            Processing document
          </h1>

          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Structra is analyzing your document and preparing the extracted
            content.
          </p>

          <div className="mt-5 rounded-lg bg-muted px-4 py-2">
            <p className="max-w-[320px] truncate text-sm font-medium">
              {fileName}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="font-medium text-muted-foreground">
              Progress
            </span>

            <span className="font-medium text-foreground">
              {progress}%
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-5">
          {stages.map((stage) => (
            <ProcessingStage
              key={stage.id}
              label={stage.label}
              state={stage.state}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <LockKeyhole className="size-3.5" />
        <span>Processing locally on your device</span>
      </div>
    </div>
  );
}