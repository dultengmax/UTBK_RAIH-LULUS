"use client"

import { useId } from "react"
import { motion } from "motion/react"

import {
  REGISTER_EXPERIENCE_COPY,
  REGISTER_LEARNING_CURVE,
  REGISTER_LEARNING_STATS,
} from "@/data/registerExperience"
import { cn } from "@/lib/utils"

interface LearningCurveCardProps {
  compact?: boolean
  className?: string
}

const chartWidth = 320
const chartHeight = 168
const chartPaddingX = 18
const chartPaddingY = 22

function buildChart() {
  const maxValue = Math.max(...REGISTER_LEARNING_CURVE.map((point) => point.score))

  const points = REGISTER_LEARNING_CURVE.map((point, index) => {
    const x =
      chartPaddingX +
      (index * (chartWidth - chartPaddingX * 2)) / Math.max(REGISTER_LEARNING_CURVE.length - 1, 1)
    const y = chartHeight - chartPaddingY - (point.score / maxValue) * (chartHeight - chartPaddingY * 2)

    return { ...point, x, y }
  })

  const linePath = points
    .map((point, index) => `${index === 0 ? "M" : "L"}${point.x} ${point.y}`)
    .join(" ")

  const areaPath = `${linePath} L ${points.at(-1)?.x ?? chartWidth - chartPaddingX} ${chartHeight - chartPaddingY} L ${points[0]?.x ?? chartPaddingX} ${chartHeight - chartPaddingY} Z`

  return { points, linePath, areaPath }
}

export function LearningCurveCard({ compact = false, className }: LearningCurveCardProps) {
  const gradientId = useId().replace(/:/g, "")
  const { points, linePath, areaPath } = buildChart()
  const lastPoint = points.at(-1)

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[1.75rem] border border-sky-100/90 bg-white/[0.92] p-5 shadow-[0_18px_60px_rgba(14,165,233,0.14)] backdrop-blur",
        compact ? "p-4" : "p-5",
        className,
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-2">
          <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-700">
            {REGISTER_EXPERIENCE_COPY.eyebrow}
          </span>
          <div>
            <p className={cn("font-semibold text-slate-900", compact ? "text-base" : "text-lg")}>
              {REGISTER_EXPERIENCE_COPY.chartTitle}
            </p>
            <p className={cn("mt-1 max-w-md leading-relaxed text-slate-500", compact ? "text-xs" : "text-sm")}>
              {REGISTER_EXPERIENCE_COPY.chartDescription}
            </p>
          </div>
        </div>

        {lastPoint ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-right">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-600">Akhir fase awal</p>
            <p className="mt-1 text-xl font-bold text-emerald-700">{lastPoint.score}%</p>
          </div>
        ) : null}
      </div>

      <div className="mt-5 rounded-[1.5rem] border border-slate-100 bg-linear-to-br from-sky-50 via-white to-emerald-50 p-4">
        <div className="relative">
          <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="h-48 w-full">
            {[0, 1, 2, 3].map((line) => {
              const y = chartPaddingY + (line * (chartHeight - chartPaddingY * 2)) / 3

              return (
                <line
                  key={line}
                  x1={chartPaddingX}
                  x2={chartWidth - chartPaddingX}
                  y1={y}
                  y2={y}
                  stroke="rgba(148, 163, 184, 0.18)"
                  strokeDasharray="5 7"
                />
              )
            })}

            <motion.path
              d={areaPath}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35 }}
              fill={`url(#${gradientId}-fill)`}
            />
            <motion.path
              d={linePath}
              fill="none"
              stroke={`url(#${gradientId}-line)`}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
            />

            {points.map((point, index) => (
              <g key={point.label}>
                <motion.circle
                  cx={point.x}
                  cy={point.y}
                  r="5"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.18 + index * 0.08, type: "spring", stiffness: 240, damping: 16 }}
                  fill="#ffffff"
                  stroke="#0ea5e9"
                  strokeWidth="3"
                />
                <text
                  x={point.x}
                  y={chartHeight - 4}
                  textAnchor="middle"
                  className="fill-slate-400 text-[10px] font-semibold uppercase tracking-[0.18em]"
                >
                  {point.label}
                </text>
              </g>
            ))}

            <defs>
              <linearGradient id={`${gradientId}-line`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
              <linearGradient id={`${gradientId}-fill`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(14,165,233,0.28)" />
                <stop offset="100%" stopColor="rgba(16,185,129,0.02)" />
              </linearGradient>
            </defs>
          </svg>

          {lastPoint ? (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45, duration: 0.3 }}
              className="absolute top-2 right-0 rounded-full border border-sky-200 bg-white/95 px-3 py-1 text-[11px] font-semibold text-sky-700 shadow-sm"
            >
              {lastPoint.accent}
            </motion.div>
          ) : null}
        </div>
      </div>

      <div className={cn("mt-5 grid gap-3", compact ? "grid-cols-1" : "sm:grid-cols-3")}>
        {REGISTER_LEARNING_STATS.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 + index * 0.08, duration: 0.28 }}
            className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">{stat.label}</p>
            <p className="mt-2 text-lg font-bold text-slate-900">{stat.value}</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">{stat.description}</p>
          </motion.div>
        ))}
      </div>

      <p className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
        {REGISTER_EXPERIENCE_COPY.chartFooter}
      </p>
    </div>
  )
}
