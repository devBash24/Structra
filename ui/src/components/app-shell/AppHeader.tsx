import { Layers3, Settings } from "lucide-react";

export function AppHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-background px-8">
      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Layers3 className="size-5" strokeWidth={2.2} />
        </div>

        <span className="font-heading text-xl font-semibold tracking-tight">
          Structra
        </span>
      </div>

      <button
        type="button"
        aria-label="Open settings"
        className="
          flex size-9 items-center justify-center
          rounded-lg
          text-muted-foreground
          transition-colors
          hover:bg-accent
          hover:text-accent-foreground
        "
      >
        <Settings className="size-5" />
      </button>
    </header>
  );
}