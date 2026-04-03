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
    "bg-linear-to-r from-sky-500 to-cyan-500 text-white shadow-lg shadow-sky-500/20 hover:from-sky-500/95 hover:to-cyan-500/95",
  secondary:
    "border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50",
  outline:
    "border border-slate-200 bg-slate-50/80 text-slate-700 hover:bg-slate-100",
  ghost: "bg-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-900",
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
