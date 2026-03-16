import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full rounded-2xl border-2 border-zinc-200 bg-white px-6 py-4 text-base font-medium text-zinc-900 transition-all placeholder:text-zinc-400 focus:bg-white focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20 disabled:cursor-not-allowed disabled:opacity-50 font-sans",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
