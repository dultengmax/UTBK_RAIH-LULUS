"use client"

import {
  ClipboardCheck,
  LayoutGrid,
  Target,
  TrendingUp,
  UserRound,
  type LucideIcon,
} from "lucide-react"

import { REGISTER_STEP_META } from "@/data/registerData"
import { cn } from "@/lib/utils"

interface ProgressBarProps {
  step: number
  onStepClick?: (step: number) => void
}

export const REGISTER_STEP_ICONS: LucideIcon[] = [
  LayoutGrid,
  Target,
  TrendingUp,
  UserRound,
  ClipboardCheck,
]

export function ProgressBar({ step, onStepClick }: ProgressBarProps) {
  const totalSteps = REGISTER_STEP_META.length
  const progress = totalSteps > 1 ? step / (totalSteps - 1) : 0

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute left-[10%] right-[10%] top-5 h-1 -translate-y-1/2 rounded-full bg-white/10" />
        <div
          className="absolute left-[10%] right-[10%] top-5 h-1 origin-left -translate-y-1/2 rounded-full bg-linear-to-r from-cyan-400 via-blue-500 to-violet-500 shadow-[0_0_16px_rgba(56,189,248,0.5)] transition-transform duration-500 ease-out"
          style={{ transform: `scaleX(${progress})` }}
        />

        <div className="relative grid grid-cols-5 gap-1 sm:gap-3">
          {REGISTER_STEP_META.map((item, index) => {
            const isDone = index < step
            const isActive = index === step
            const isClickable = Boolean(onStepClick) && index < step

            return (
              <div key={item.id} className="flex min-w-0 flex-col items-center gap-2 text-center">
                <div className="relative">
                  {isActive ? (
                    <span className="anim-ring-pulse absolute inset-0 rounded-2xl bg-cyan-400/40" />
                  ) : null}
                  <button
                    type="button"
                    disabled={!isClickable}
                    aria-label={`${item.label}${isDone ? " (selesai)" : isActive ? " (aktif)" : " (terkunci)"}`}
                    aria-current={isActive ? "step" : undefined}
                    onClick={isClickable ? () => onStepClick?.(index) : undefined}
                    className={cn(
                      "relative flex size-10 items-center justify-center rounded-2xl border shadow-lg outline-none transition-all duration-200",
                      isClickable
                        ? "cursor-pointer hover:scale-105 focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 active:scale-95"
                        : "cursor-default",
                    )}
                    style={{
                      backgroundColor: isDone
                        ? "rgba(16,185,129,0.95)"
                        : isActive
                          ? "rgba(34,211,238,0.95)"
                          : "rgba(255,255,255,0.08)",
                      borderColor: isDone
                        ? "rgba(16,185,129,0.9)"
                        : isActive
                          ? "rgba(34,211,238,1)"
                          : "rgba(255,255,255,0.18)",
                      color: isDone || isActive ? "rgba(6,17,38,1)" : "rgba(255,255,255,0.55)",
                    }}
                  >
                    {isDone ? (
                      <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden="true">
                        <path
                          d="M5 10.5 8.4 14 15 7.5"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      (() => {
                        const Icon = REGISTER_STEP_ICONS[index]
                        return <Icon size={18} aria-hidden="true" />
                      })()
                    )}
                  </button>
                </div>

                <p
                  className={cn(
                    "max-w-full truncate font-pixel text-[10px] font-semibold sm:text-[11px]",
                    isActive ? "text-cyan-200" : isDone ? "text-emerald-200/80" : "text-white/40",
                  )}
                >
                  <span className="hidden sm:inline">{item.label}</span>
                  <span className="sm:hidden">{index + 1}</span>
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
