"use client"

import { AnimatePresence, motion } from "motion/react"

import { PROGRAM_OPTIONS } from "@/data/registerData"
import { Badge } from "@/components/ui/badge"
import type { ProgramId } from "@/types/register"

interface StepProgramProps {
  value: ProgramId | ""
  error: string
  onChange: (program: ProgramId) => void
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
                  borderColor: selected ? "rgba(14,165,233,0.55)" : "rgba(203,213,225,0.8)",
                  backgroundColor: selected ? "rgba(14,165,233,0.08)" : "rgba(255,255,255,0.9)",
                }}
                transition={{ duration: 0.18 }}
                className="flex h-full min-h-36 flex-col justify-between rounded-2xl border p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="text-sm font-semibold text-slate-900">{program.label}</span>
                  {program.badge ? (
                    <Badge className="border-sky-200 bg-sky-50 text-sky-700" variant="outline">
                      {program.badge}
                    </Badge>
                  ) : null}
                </div>

                <p className="mt-4 text-sm leading-relaxed text-slate-600">{program.description}</p>

                <div className="mt-5 flex items-center justify-between text-xs text-slate-500">
                  <span>Sesuaikan materi</span>
                  <span className={selected ? "font-semibold text-sky-700" : ""}>
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
