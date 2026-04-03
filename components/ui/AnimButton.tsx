"use client"

import * as React from "react"
import { motion, type HTMLMotionProps } from "motion/react"

import { cn } from "@/lib/utils"

type AnimButtonVariant = "primary" | "secondary" | "outline" | "ghost"

interface AnimButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: AnimButtonVariant
  loading?: boolean
  children?: React.ReactNode
}

const variantClasses: Record<AnimButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90",
  secondary:
    "bg-white/10 text-white hover:bg-white/14 border border-white/10",
  outline:
    "border border-white/12 bg-white/[0.03] text-white hover:bg-white/[0.07]",
  ghost: "bg-transparent text-white/80 hover:bg-white/[0.06] hover:text-white",
}

export function AnimButton({
  className,
  variant = "primary",
  loading = false,
  disabled,
  children,
  type = "button",
  ...props
}: AnimButtonProps) {
  return (
    <motion.button
      type={type}
      whileHover={!disabled && !loading ? { scale: 1.02 } : undefined}
      whileTap={!disabled && !loading ? { scale: 0.97 } : undefined}
      transition={{ duration: 0.15 }}
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-60",
        variantClasses[variant],
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          <span>{children}</span>
        </>
      ) : (
        children
      )}
    </motion.button>
  )
}
