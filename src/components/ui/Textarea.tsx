import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[120px] w-full rounded-2xl border-2 border-zinc-200 bg-white px-6 py-4 text-base font-medium text-zinc-900 transition-all placeholder:text-zinc-400 focus:bg-white focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:text-zinc-900 disabled:cursor-not-allowed disabled:opacity-50 font-sans resize-none",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
