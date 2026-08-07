import { type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { TopBar } from "./TopBar";
import { WorkspaceBar } from "./WorkspaceBar";

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="flex min-h-dvh w-full flex-col">
      <TopBar />
      <main className="min-w-0 flex-1 px-4 py-5 sm:px-6 sm:py-6">
        <div className="mx-auto w-full max-w-[1600px]">
          <WorkspaceBar />
          {/* Route key restarts the entrance transition on navigation. */}
          <div key={pathname} className="motion-rise">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
