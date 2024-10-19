import * as React from "react"

import { cn } from "/src/lib/utils"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const handleAutoResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  const element = e.target
  element.style.height = "auto";
  element.style.height = `${element.scrollHeight}px`;
};

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, rows, onInput, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "resize-none flex min-h-0 max-h-[30vh] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        rows={rows || 1}
        onInput={(e) => {
          onInput && onInput(e)
          handleAutoResize(e)
        }}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export default Textarea
