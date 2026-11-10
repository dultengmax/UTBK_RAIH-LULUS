"use client"

import {
  Briefcase,
  GraduationCap,
  Globe,
  Landmark,
  Shield,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react"

import { PROGRAM_OPTIONS } from "@/data/registerData"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { ProgramId } from "@/types/register"

interface StepProgramProps {
  value: ProgramId | ""
  error: string
  onChange: (program: ProgramId) => void
}

const PROGRAM_ICONS: Record<ProgramId, LucideIcon> = {
  cpns: Landmark,
  utbk_snbt: GraduationCap,
  kedinasan: ShieldCheck,
  bumn: Briefcase,
  pppk: Users,
  tni_polri: Shield,
  luar_negeri: Globe,
}

export function StepProgram({ value, error, onChange }: StepProgramProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {PROGRAM_OPTIONS.map((program, index) => {
          const selected = program.id === value
          const Icon = PROGRAM_ICONS[program.id]

          return (
            <button
              key={program.id}
              type="button"
              onClick={() => onChange(program.id)}
              className="anim-fade-up text-left"
              style={{ animationDelay: `${0.05 + index * 0.05}s` }}
            >
              <div
                className={cn(
                  "flex h-full min-h-40 flex-col rounded-2xl border p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]",
                  selected ? "border-blue-600/55 bg-blue-600/[0.08]" : "border-slate-300/80 bg-white/90",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={cn(
                      "flex size-11 items-center justify-center rounded-xl transition-all duration-200",
                      selected ? "scale-105 bg-blue-600 text-white" : "bg-slate-100 text-slate-500",
                    )}
                  >
                    <Icon size={20} />
                  </span>
                  {program.badge ? (
                    <Badge className="border-blue-200 bg-blue-50 text-blue-700" variant="outline">
                      {program.badge}
                    </Badge>
                  ) : null}
                </div>

                <p className="mt-4 font-pixel text-sm font-semibold text-slate-900">{program.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{program.description}</p>

                <div className="mt-auto flex items-center justify-between pt-4 text-xs">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5",
                      selected ? "font-semibold text-blue-700" : "text-slate-400",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-4 items-center justify-center rounded-full border transition-colors",
                        selected ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300",
                      )}
                    >
                      {selected ? (
                        <svg viewBox="0 0 20 20" className="size-3" fill="none" aria-hidden="true">
                          <path
                            d="M5 10.5 8.4 14 15 7.5"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : null}
                    </span>
                    {selected ? "Terpilih" : "Pilih"}
                  </span>
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
