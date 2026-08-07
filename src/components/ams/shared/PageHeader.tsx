import { type ReactNode } from "react";

/**
 * Premium page banner used at the top of every screen.
 * Gradient hero surface + kicker + title + description + actions.
 */
export function PageHeader({
  kicker, title, description, actions,
}: {
  kicker?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 sm:p-6 lg:p-7 shadow-[var(--shadow-card)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          backgroundImage:
            "radial-gradient(70% 120% at 0% 0%, color-mix(in oklab, var(--color-primary) 22%, transparent), transparent 60%), radial-gradient(50% 110% at 100% 0%, color-mix(in oklab, var(--color-accent-pink) 16%, transparent), transparent 65%)",
        }}
      />
      <div className="relative grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:flex-wrap sm:justify-between">
        <div className="min-w-0">
          {kicker && (
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary/90">
              {kicker}
            </div>
          )}
          <h1 className="mt-1 truncate text-2xl sm:text-3xl lg:text-[34px] font-semibold tracking-tight text-foreground">
            {title}
          </h1>
          {description && (
            <p className="mt-1.5 max-w-2xl text-sm sm:text-[15px] text-muted-foreground">
              {description}
            </p>
          )}
        </div>
        {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
      </div>
    </div>
  );
}
