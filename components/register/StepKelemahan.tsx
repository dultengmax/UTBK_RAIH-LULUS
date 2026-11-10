"use client"

import { OVERSEAS_PROGRAM_ID, WEAKNESS_OPTIONS } from "@/data/registerData"
import type { ProgramId } from "@/types/register"

interface StepKelemahanProps {
  program: ProgramId | ""
  selected: string[]
  error: string
  onToggle: (value: string) => void
}

export function StepKelemahan({ program, selected, error, onToggle }: StepKelemahanProps) {
  const weaknessProgram = program || OVERSEAS_PROGRAM_ID
  const options = WEAKNESS_OPTIONS[weaknessProgram]
  const isOverseas = program === OVERSEAS_PROGRAM_ID

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-sm text-slate-600">
          {isOverseas
            ? "Pilih skill yang paling ingin kamu tingkatkan untuk kebutuhan aplikasi internasional."
            : "Pilih subtes atau area materi yang paling sering terasa menghambat saat latihan."}
        </p>

        <span
          key={selected.length}
          className="anim-pop-in rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"
        >
          {selected.length} dipilih
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((option, index) => {
          const isSelected = selected.includes(option.value)

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onToggle(option.value)}
              className="anim-fade-up text-left"
              style={{ animationDelay: `${0.05 + index * 0.05}s` }}
            >
              <div
                className={`flex h-full items-start gap-4 rounded-2xl border p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.985] ${
                  isSelected
                    ? "border-blue-600/50 bg-blue-600/[0.08]"
                    : "border-slate-300/90 bg-white/[0.92]"
                }`}
              >
                <div
                  className={`mt-1 flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors duration-200 ${
                    isSelected ? "border-blue-600 bg-blue-600" : "border-slate-300 bg-white/90"
                  }`}
                >
                  {isSelected ? (
                    <svg viewBox="0 0 20 20" className="size-3.5 text-white" fill="none" aria-hidden="true">
                      <path
                        d="M5 10.5 8.4 14 15 7.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <p className="font-pixel text-sm font-semibold text-slate-900">{option.label}</p>
                  <p className="text-sm leading-relaxed text-slate-500">{option.description}</p>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {error ? (
        <p className="anim-expand rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
          {error}
        </p>
      ) : null}
    </div>
  )
}
