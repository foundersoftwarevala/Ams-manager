import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-md border px-2.5 py-0.5 text-xs font-semibold tracking-[0.01em] transition-[background-color,border-color,color,box-shadow] duration-150 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-primary/45 bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[0_1px_0_0_oklch(1_0_0/0.2)_inset] hover:brightness-110",
        secondary:
          "border-border bg-surface-elevated text-foreground hover:border-primary/40",
        destructive:
          "border-destructive/45 bg-destructive text-destructive-foreground shadow-[0_1px_0_0_oklch(1_0_0/0.16)_inset] hover:brightness-110",
        outline: "border-border/80 bg-surface/60 text-foreground/90 hover:border-primary/45 hover:text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);


export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
