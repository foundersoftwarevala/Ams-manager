import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ChevronDown, PanelLeftClose, PanelLeftOpen, Search, X,
  LayoutDashboard, UsersRound, BookMarked, Fingerprint, Trophy, Award, Shield,
  Ribbon, Crown, Zap, ArrowUpCircle, Target, Compass, Swords, Gift, PackageCheck,
  BarChart3, LineChart, Bell, ScrollText, Star, Sparkles, MessageSquare, Landmark,
  Gem, Layers, Archive, Settings,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { SHOWCASES } from "@/lib/ams/museum";
import { COLLECTION_TYPES } from "@/lib/ams/signature-collection";

const COLLAPSE_KEY = "ams:sidebar:collapsed";

export type NavItem = {
  label: string;
  to: string;
  params?: Record<string, string>;
  icon: React.ComponentType<{ className?: string }>;
};

export function useSidebarState() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    try {
      setCollapsed(localStorage.getItem(COLLAPSE_KEY) === "1");
    } catch {
      /* ignore */
    }
  }, []);

  const toggleCollapsed = () =>
    setCollapsed((v) => {
      const next = !v;
      try {
        localStorage.setItem(COLLAPSE_KEY, next ? "1" : "0");
      } catch {
        /* ignore */
      }
      return next;
    });

  return { collapsed, toggleCollapsed, mobileOpen, setMobileOpen };
}

const primary: NavItem[] = [
  { label: "Overview", to: "/", icon: LayoutDashboard },
  { label: "Role Manager", to: "/role-manager", icon: UsersRound },
  { label: "Passport", to: "/passport", icon: BookMarked },
  { label: "Identity", to: "/identity", icon: Fingerprint },
];

const groups: { label: string; items: NavItem[] }[] = [
  {
    label: "Recognition",
    items: [
      { label: "Achievements", to: "/achievements", icon: Trophy },
      { label: "Awards", to: "/awards", icon: Award },
      { label: "Badges", to: "/badges", icon: Shield },
      { label: "Trophies", to: "/trophies", icon: Trophy },
      { label: "Certificates", to: "/certificates", icon: Ribbon },
      { label: "Ranks", to: "/ranks", icon: Crown },
      { label: "Hall of Fame", to: "/hall-of-fame", icon: Star },
      { label: "Legacy", to: "/legacy", icon: Archive },
    ],
  },
  {
    label: "Progression",
    items: [
      { label: "XP", to: "/xp", icon: Zap },
      { label: "Levels", to: "/levels", icon: ArrowUpCircle },
      { label: "Missions", to: "/missions", icon: Target },
      { label: "Quests", to: "/quests", icon: Compass },
      { label: "Challenges", to: "/challenges", icon: Swords },
      { label: "Rewards", to: "/rewards", icon: Gift },
      { label: "Claims", to: "/claims", icon: PackageCheck },
      { label: "Dev Progression", to: "/developer-progression", icon: ArrowUpCircle },
      { label: "Author Progression", to: "/author-progression", icon: ArrowUpCircle },
      { label: "Vendor Progression", to: "/vendor-progression", icon: ArrowUpCircle },
    ],
  },
  {
    label: "3D Collectible Vaults",
    items: [
      { label: "Trophies", to: "/trophy-vault", icon: Gem },
      { label: "Awards", to: "/award-vault", icon: Gem },
      { label: "Achievements", to: "/achievement-vault", icon: Gem },
      { label: "Badges", to: "/badge-vault", icon: Gem },
      { label: "Certificates", to: "/certificate-vault", icon: Gem },
      { label: "Digital Passports", to: "/passport-vault", icon: Gem },
      { label: "Membership Cards", to: "/membership-vault", icon: Gem },
      { label: "Rank Emblems", to: "/rank-vault", icon: Gem },
      { label: "Verification Shields", to: "/verification-vault", icon: Gem },
      { label: "Reputation Medals", to: "/reputation-vault", icon: Gem },
      { label: "Trust Seals", to: "/trust-seal-vault", icon: Gem },
      { label: "Recognition Coins", to: "/recognition-coin-vault", icon: Gem },
      { label: "XP Crystals", to: "/xp-crystal-vault", icon: Gem },
      { label: "Reward Chests", to: "/reward-chest-vault", icon: Gem },
      { label: "Honor Coins", to: "/honor-coin-vault", icon: Gem },
      { label: "Legacy Medals", to: "/legacy-medal-vault", icon: Gem },
      { label: "Identity Cards", to: "/identity-card-vault", icon: Gem },
      { label: "License Cards", to: "/license-card-vault", icon: Gem },
      { label: "Founder Seals", to: "/founder-seal-vault", icon: Gem },
      { label: "Hall of Fame", to: "/hall-of-fame-vault", icon: Gem },
    ],
  },
  {
    label: "Museums & Galleries",
    items: [
      { label: "Trophy Gallery", to: "/trophy-gallery", icon: Landmark },
      { label: "Role Rooms", to: "/role-showcase", icon: Crown },
      ...SHOWCASES.map((s) => ({
        label: s.title,
        to: "/museum/$showcase",
        params: { showcase: s.slug },
        icon: Landmark,
      })),
    ],
  },
  {
    label: "Signature Collections",
    items: [
      { label: "All Collections", to: "/collections", icon: Layers },
      ...COLLECTION_TYPES.map((t) => ({
        label: t.title.replace("Signature ", ""),
        to: "/collection/$type",
        params: { type: t.slug },
        icon: Crown,
      })),
    ],
  },
  {
    label: "Insights",
    items: [
      { label: "Leaderboards", to: "/leaderboards", icon: BarChart3 },
      { label: "Analytics", to: "/analytics", icon: LineChart },
      { label: "Notifications", to: "/notifications", icon: Bell },
      { label: "Audit Logs", to: "/audit", icon: ScrollText },
    ],
  },
];

const bottomItems: NavItem[] = [
  { label: "AI Center", to: "/ai", icon: Sparkles },
  { label: "Chat", to: "/chat", icon: MessageSquare },
  { label: "Settings", to: "/settings", icon: Settings },
];

interface AppSidebarProps {
  collapsed: boolean;
  onToggleCollapsed: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export function AppSidebar({ collapsed, onToggleCollapsed, mobileOpen, onCloseMobile }: AppSidebarProps) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [query, setQuery] = useState("");
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  const resolved = (item: NavItem) =>
    item.params
      ? item.to.replace(/\$(\w+)/g, (_, k: string) => item.params![k] ?? "")
      : item.to;

  const isActive = (item: NavItem) => {
    const to = resolved(item);
    return to === "/" ? pathname === "/" : pathname.startsWith(to);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return groups
      .map((g) => ({ ...g, items: g.items.filter((i) => i.label.toLowerCase().includes(q)) }))
      .filter((g) => g.items.length > 0);
  }, [query]);

  const groupOpen = (label: string, items: NavItem[]) =>
    openGroups[label] ?? items.some((i) => isActive(i));

  const ItemLink = ({ item }: { item: NavItem }) => {
    const active = isActive(item);
    return (
      <Link
        to={item.to}
        params={item.params as never}
        onClick={onCloseMobile}
        title={item.label}
        className={cn(
          "group/item relative flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-sm transition-colors duration-150",
          collapsed && "justify-center px-0",
          active
            ? "bg-primary/18 text-foreground font-medium"
            : "text-muted-foreground hover:text-foreground hover:bg-white/[0.04]",
        )}
      >
        {active && <span className="absolute left-0 top-1.5 bottom-1.5 w-[2px] rounded-full bg-primary" />}
        <item.icon className="h-4 w-4 shrink-0" />
        {!collapsed && <span className="truncate">{item.label}</span>}
      </Link>
    );
  };

  const content = (
    <div className="flex h-full flex-col">
      <div className={cn("flex h-16 items-center gap-2 border-b border-border px-3 shrink-0", collapsed && "justify-center px-0")}>
        <Link to="/" className="flex items-center gap-2 min-w-0" onClick={onCloseMobile}>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground">
            <Trophy className="h-4.5 w-4.5" />
          </span>
          {!collapsed && (
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-sm font-semibold tracking-tight">AMS Manager</span>
              <span className="block truncate text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Software Vala
              </span>
            </span>
          )}
        </Link>
        {!collapsed && (
          <button
            onClick={onToggleCollapsed}
            className="ml-auto hidden lg:grid h-8 w-8 place-items-center rounded-lg border border-border text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Collapse sidebar"
          >
            <PanelLeftClose className="h-4 w-4" />
          </button>
        )}
        <button
          onClick={onCloseMobile}
          className="ml-auto lg:hidden grid h-8 w-8 place-items-center rounded-lg border border-border text-muted-foreground"
          aria-label="Close menu"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {collapsed && (
        <button
          onClick={onToggleCollapsed}
          className="mx-auto mt-3 hidden lg:grid h-8 w-8 place-items-center rounded-lg border border-border text-muted-foreground hover:text-foreground"
          aria-label="Expand sidebar"
        >
          <PanelLeftOpen className="h-4 w-4" />
        </button>
      )}

      {!collapsed && (
        <div className="px-3 pt-3 shrink-0">
          <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-2.5 py-1.5">
            <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find a module…"
              className="w-full bg-transparent text-xs outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>
      )}

      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-3">
        <div className="space-y-0.5">
          {primary.map((item) => (
            <ItemLink key={item.to} item={item} />
          ))}
        </div>

        {(filtered ?? groups).map((group) => {
          const open = filtered ? true : groupOpen(group.label, group.items);
          if (collapsed) {
            return (
              <div key={group.label} className="space-y-0.5 border-t border-border/60 pt-2">
                {group.items.map((item) => (
                  <ItemLink key={item.to + item.label} item={item} />
                ))}
              </div>
            );
          }
          return (
            <div key={group.label}>
              <button
                onClick={() => setOpenGroups((s) => ({ ...s, [group.label]: !open }))}
                className="flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
              >
                {group.label}
                <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", open && "rotate-180")} />
              </button>
              {open && (
                <div className="mt-0.5 space-y-0.5">
                  {group.items.map((item) => (
                    <ItemLink key={item.to + item.label} item={item} />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="shrink-0 border-t border-border px-2 py-2 space-y-0.5">
        {bottomItems.map((item) => (
          <ItemLink key={item.to} item={item} />
        ))}
      </div>
    </div>
  );

  return (
    <>
      <aside
        className={cn(
          "hidden lg:flex flex-col shrink-0 border-r border-border bg-background/80 backdrop-blur-xl sticky top-0 h-screen transition-[width] duration-200",
          collapsed ? "w-[72px]" : "w-[264px]",
        )}
      >
        {content}
      </aside>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <button
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
            onClick={onCloseMobile}
            aria-label="Close menu overlay"
          />
          <div className="absolute inset-y-0 left-0 w-[280px] max-w-[85vw] border-r border-border bg-background shadow-2xl">
            {content}
          </div>
        </div>
      )}
    </>
  );
}
