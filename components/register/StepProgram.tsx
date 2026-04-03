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
                  borderColor: selected ? "rgba(34,211,238,0.7)" : "rgba(255,255,255,0.08)",
                  backgroundColor: selected ? "rgba(8,145,178,0.14)" : "rgba(255,255,255,0.03)",
                }}
                transition={{ duration: 0.18 }}
                className="flex h-full min-h-36 flex-col justify-between rounded-2xl border p-4 shadow-lg shadow-black/10"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="text-sm font-semibold text-white">{program.label}</span>
                  {program.badge ? (
                    <Badge className="border-primary/30 bg-primary/15 text-primary" variant="outline">
                      {program.badge}
                    </Badge>
                  ) : null}
                </div>

                <p className="mt-4 text-sm leading-relaxed text-white/68">{program.description}</p>

                <div className="mt-5 flex items-center justify-between text-xs text-white/55">
                  <span>Sesuaikan materi</span>
                  <span>{selected ? "Terpilih" : "Pilih"}</span>
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
            className="rounded-xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200"
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
