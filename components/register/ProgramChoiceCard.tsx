"use client"

import { cn } from "@/lib/utils"

interface ProgramChoiceCardProps {
  selected: boolean
  onSelect: () => void
  title: string
  description: string
  hint?: string
}

/**
 * Kartu pilihan dengan state terpilih/diam murni CSS.
 * Dipakai bersama oleh StepProgram, StepJurusan, dan StepKelemahan.
 */
export function ProgramChoiceCard({
  selected,
  onSelect,
  title,
  description,
  hint,
}: ProgramChoiceCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="h-full w-full text-left"
    >
      <div
        className={cn(
          "h-full rounded-2xl border p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.985]",
          selected ? "border-blue-600/52 bg-blue-600/[0.08]" : "border-slate-300/90 bg-white/[0.92]",
        )}
      >
        <p className="font-pixel text-sm font-semibold text-slate-900">{title}</p>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">{description}</p>
        {hint ? <p className="mt-3 text-xs text-slate-400">{hint}</p> : null}
      </div>
    </button>
  )
}

export default ProgramChoiceCard
