"use client"

import { motion } from "motion/react"

import { REGISTER_STEP_META } from "@/data/registerData"
import { cn } from "@/lib/utils"

interface ProgressBarProps {
  step: number
}

export function ProgressBar({ step }: ProgressBarProps) {
  const totalSteps = REGISTER_STEP_META.length
  const progress = totalSteps > 1 ? step / (totalSteps - 1) : 0

  return (
    <div className="space-y-4">
      <div className="relative px-2">
        <div className="absolute left-8 right-8 top-4 h-px bg-white/10" />
        <motion.div
          className="absolute left-8 right-8 top-4 h-px bg-primary"
          animate={{ scaleX: progress }}
          style={{ transformOrigin: "left center" }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        />

        <div className="relative grid grid-cols-5 gap-3">
          {REGISTER_STEP_META.map((item, index) => {
            const isDone = index < step
            const isActive = index === step

            return (
              <div key={item.id} className="flex min-w-0 flex-col items-center gap-2 text-center">
                <motion.div
                  animate={
                    isDone
                      ? {
                          backgroundColor: "rgba(52,211,153,0.95)",
                          borderColor: "rgba(52,211,153,0.95)",
                          scale: 1,
                        }
                      : isActive
                        ? {
                            backgroundColor: "rgba(34,211,238,0.22)",
                            borderColor: "rgba(34,211,238,0.9)",
                            scale: [1, 1.08, 1],
                          }
                        : {
                            backgroundColor: "rgba(255,255,255,0.04)",
                            borderColor: "rgba(255,255,255,0.1)",
                            scale: 1,
                          }
                  }
                  transition={
                    isActive
                      ? {
                          duration: 1.2,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "mirror",
                        }
                      : { duration: 0.2 }
                  }
                  className="flex size-8 items-center justify-center rounded-full border text-xs font-semibold"
                >
                  {isDone ? (
                    <svg viewBox="0 0 20 20" className="size-4" fill="none" aria-hidden="true">
                      <path
                        d="M5 10.5 8.4 14 15 7.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <span className={cn(isActive ? "text-white" : "text-white/65")}>
                      {index + 1}
                    </span>
                  )}
                </motion.div>

                <div className="space-y-1">
                  <p className={cn("text-[11px] font-semibold", isActive ? "text-white" : "text-white/60")}>
                    {item.label}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
