import {
  Check,
  Circle,
  LoaderCircle,
} from "lucide-react";

export type ProcessingStageState =
  | "pending"
  | "active"
  | "complete";

type ProcessingStageProps = {
  label: string;
  state: ProcessingStageState;
};

export function ProcessingStage({
  label,
  state,
}: ProcessingStageProps) {
  return (
    <div className="flex items-center gap-3 py-2.5">
      <div className="flex size-6 shrink-0 items-center justify-center">
        {state === "complete" && (
          <div className="flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Check className="size-3.5" strokeWidth={2.5} />
          </div>
        )}

        {state === "active" && (
          <LoaderCircle className="size-5 animate-spin text-primary" />
        )}

        {state === "pending" && (
          <Circle className="size-4 text-muted-foreground/50" />
        )}
      </div>

      <span
        className={
          state === "active"
            ? "text-sm font-medium text-foreground"
            : state === "complete"
              ? "text-sm text-foreground"
              : "text-sm text-muted-foreground"
        }
      >
        {label}
      </span>
    </div>
  );
}