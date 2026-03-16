import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg" | "xl";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const variants = {
      primary: "bg-primary text-white hover:opacity-90 shadow-lg shadow-primary/20",
      secondary: "bg-zinc-100 text-zinc-900 hover:bg-zinc-200",
      outline: "border-2 border-zinc-200 bg-transparent hover:border-primary hover:text-primary",
      ghost: "hover:bg-zinc-100 text-zinc-600",
      destructive: "bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-200",
    };

    const sizes = {
      sm: "h-9 px-4 text-xs font-bold",
      md: "h-12 px-6 text-sm font-bold",
      lg: "h-14 px-8 text-base font-black",
      xl: "h-20 px-12 text-xl font-black",
    };

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-2xl transition-all active:scale-95 disabled:pointer-events-none disabled:opacity-50 font-sans",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
