import * as React from "react"
import { cn } from "@/lib/utils"

const Typography = {
  h1: React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => (
      <h1
        ref={ref}
        className={cn(
          "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
          className
        )}
        {...props}
      />
    )
  ),
  p: React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
    ({ className, ...props }, ref) => (
      <p
        ref={ref}
        className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
        {...props}
      />
    )
  ),
  // Add more as needed (h2, h3, blockquote, etc.)
}

Typography.h1.displayName = "TypographyH1"
Typography.p.displayName = "TypographyP"

export { Typography }
