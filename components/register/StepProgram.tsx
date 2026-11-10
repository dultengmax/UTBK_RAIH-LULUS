"use client"

import { AnimatePresence, motion } from "motion/react"
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

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
  },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
}

export function StepProgram({ value, error, onChange }: StepProgramProps) {
  return (
    <div className="space-y-6">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 gap-3 sm:grid-cols-3"
      >
        {PROGRAM_OPTIONS.map((program) => {
          const selected = program.id === value
          const Icon = PROGRAM_ICONS[program.id]

          return (
            <motion.button
              key={program.id}
              variants={item}
              type="button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onChange(program.id)}
              className="text-left"
            >
              <motion.div
                animate={{
                  borderColor: selected ? "rgba(37,99,235,0.55)" : "rgba(203,213,225,0.8)",
                  backgroundColor: selected ? "rgba(37,99,235,0.08)" : "rgba(255,255,255,0.9)",
                }}
                transition={{ duration: 0.18 }}
                className="flex h-full min-h-40 flex-col rounded-2xl border p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <motion.span
                    animate={{
                      backgroundColor: selected ? "rgba(37,99,235,0.95)" : "rgba(241,245,249,1)",
                      color: selected ? "rgba(255,255,255,1)" : "rgba(100,116,139,1)",
                      scale: selected ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.18 }}
                    className="flex size-11 items-center justify-center rounded-xl"
                  >
                    <Icon size={20} />
                  </motion.span>
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
                        "flex size-4 items-center justify-center rounded-full border",
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
              </motion.div>
            </motion.button>
          )
        })}
      </motion.div>

      <AnimatePresence>
        {error ? (
          <motion.p
            initial={{ opacity: 0, height: 0, y: -4 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600"
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
