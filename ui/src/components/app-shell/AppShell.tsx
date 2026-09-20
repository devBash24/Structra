import type { ReactNode } from "react";
import { AppHeader } from "./AppHeader";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <AppHeader />

      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}