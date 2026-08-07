import { Link } from "@tanstack/react-router";
import { Bell, Search, Sparkles, Trophy, Zap, ChevronDown, User2, Settings, Menu } from "lucide-react";

import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { RouteHistoryArrows } from "@/components/layout/RouteHistory";
import { SoundControl } from "@/components/ams/ui/SoundControl";

/** Shared premium 3D-style icon button surface. */
const ICON_BTN =
  "icon3d relative grid h-9 w-9 shrink-0 place-items-center rounded-xl text-muted-foreground " +
  "transition-[transform,box-shadow,color,background-color] duration-200 " +
  "hover:text-foreground active:scale-[0.96] " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function TopBar({ onOpenMenu }: { onOpenMenu?: () => void }) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="h-16 flex items-center gap-2 px-3 sm:px-5">
        <button
          onClick={onOpenMenu}
          aria-label="Open menu"
          className={cn(ICON_BTN, "lg:hidden")}
        >
          <Menu className="h-[18px] w-[18px]" />
        </button>

        <RouteHistoryArrows className="shrink-0" />

        <div className="relative flex-1 max-w-xl">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search achievements, users, rewards…"
            className="h-9 w-full rounded-xl border border-border bg-surface pl-9 pr-14 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted/60 px-1.5 font-mono text-[10px] text-muted-foreground">
            ⌘K
          </kbd>
        </div>

        <div className="ml-auto flex items-center gap-1.5">
          <Link to="/hall-of-fame" aria-label="Achievement alerts" className={ICON_BTN}>
            <Trophy className="h-[18px] w-[18px]" />
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
          </Link>
          <Link to="/notifications" aria-label="Notifications" className={ICON_BTN}>
            <Bell className="h-[18px] w-[18px]" />
          </Link>
          <Link to="/ai" aria-label="AI Assistant" className={cn(ICON_BTN, "hidden sm:grid")}>
            <Sparkles className="h-[18px] w-[18px]" />
          </Link>
          <Link to="/missions" aria-label="Quick actions" className={cn(ICON_BTN, "hidden sm:grid")}>
            <Zap className="h-[18px] w-[18px]" />
          </Link>
          <SoundControl />

          <div className="mx-1 h-6 w-px bg-border" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex h-9 items-center gap-2 rounded-xl px-1.5 hover:bg-white/[0.04] transition-colors">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-primary to-primary-glow text-xs font-semibold text-primary-foreground">
                  A
                </span>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="text-xs text-muted-foreground">Admin</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem><User2 className="h-4 w-4 mr-2" /> Profile</DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings"><Settings className="h-4 w-4 mr-2" /> Settings</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
