import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-brand text-white hover:bg-brand-600 active:bg-brand-700 rounded-full",
        destructive: "bg-danger text-white hover:bg-danger/90 rounded-xl",
        outline: "border border-border bg-surface hover:bg-[color-mix(in_oklab,var(--ink)_4%,transparent)] text-ink rounded-xl",
        secondary: "border border-border bg-[color-mix(in_oklab,var(--ink)_1%,transparent)] hover:bg-[color-mix(in_oklab,var(--ink)_4%,transparent)] text-ink rounded-xl",
        ghost: "hover:bg-[color-mix(in_oklab,var(--ink)_4%,transparent)] text-ink rounded-xl",
        link: "text-indigo hover:underline focus:ring-2 focus:ring-indigo focus:ring-offset-2",
        sakura: "bg-gradient-sakura text-white hover:opacity-90 rounded-full shadow-lg",
      },
      size: {
        default: "h-10 px-4 py-2 text-sm",
        sm: "h-9 px-3 text-sm",
        lg: "h-11 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
