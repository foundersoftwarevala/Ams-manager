import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { playSound, type UiSound } from "@/lib/ams/ui-sound";

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold tracking-[-0.005em] cursor-pointer select-none",
    "transition-[background-color,border-color,color,box-shadow,transform,filter] duration-150 ease-[var(--ease-enterprise)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "active:scale-[0.985] disabled:pointer-events-none disabled:opacity-45 disabled:saturate-50 disabled:shadow-none disabled:cursor-not-allowed",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-150 hover:[&_svg]:scale-110",
    "motion-reduce:transition-none motion-reduce:active:scale-100",

  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-[image:var(--gradient-primary)] bg-primary text-primary-foreground shadow-[0_1px_0_0_oklch(1_0_0/0.22)_inset,0_8px_20px_-10px_color-mix(in_oklab,var(--color-primary)_85%,transparent)] hover:-translate-y-px hover:brightness-110 hover:shadow-[var(--shadow-glow-primary)] active:translate-y-0",
        destructive:
          "bg-destructive text-destructive-foreground shadow-[0_1px_0_0_oklch(1_0_0/0.18)_inset,0_8px_18px_-10px_color-mix(in_oklab,var(--color-destructive)_80%,transparent)] hover:-translate-y-px hover:brightness-110 active:translate-y-0",
        outline:
          "border border-border bg-surface/70 text-foreground shadow-sm hover:-translate-y-px hover:bg-accent hover:text-accent-foreground hover:border-primary/45 active:translate-y-0",
        secondary:
          "bg-secondary text-secondary-foreground border border-border/60 shadow-sm hover:bg-surface-elevated hover:border-primary/35 hover:-translate-y-px active:translate-y-0",
        ghost: "text-foreground/90 hover:bg-accent/70 hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline active:scale-100",

      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9 p-0",
        "icon-sm": "h-8 w-8 p-0 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  /** Shows an inline spinner and blocks interaction. */
  loading?: boolean;
  /** UI sound cue played on click. Defaults to the subtle "click" tick. */
  sound?: UiSound | false;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, sound, onClick, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (sound !== false) playSound(sound ?? (variant === "destructive" ? "delete" : "click"));
      onClick?.(e);
    };
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        data-loading={loading || undefined}
        aria-busy={loading || undefined}
        disabled={asChild ? undefined : loading || props.disabled}
        onClick={handleClick}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
            {children}
          </>
        )}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
