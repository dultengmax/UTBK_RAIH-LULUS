"use client"

import { AnimatePresence, motion } from "motion/react"

import { OVERSEAS_PROGRAM_ID, WEAKNESS_OPTIONS } from "@/data/registerData"
import type { ProgramId } from "@/types/register"

interface StepKelemahanProps {
  program: ProgramId | ""
  selected: string[]
  error: string
  onToggle: (value: string) => void
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

export function StepKelemahan({ program, selected, error, onToggle }: StepKelemahanProps) {
  const weaknessProgram = program || OVERSEAS_PROGRAM_ID
  const options = WEAKNESS_OPTIONS[weaknessProgram]
  const isOverseas = program === OVERSEAS_PROGRAM_ID

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-sm text-white/70">
          {isOverseas
            ? "Pilih skill yang paling ingin kamu tingkatkan untuk kebutuhan aplikasi internasional."
            : "Pilih subtes atau area materi yang paling sering terasa menghambat saat latihan."}
        </p>

        <motion.span
          key={selected.length}
          initial={{ scale: 0.9, opacity: 0.75 }}
          animate={{ scale: 1, opacity: 1 }}
          className="rounded-full border border-primary/25 bg-primary/12 px-3 py-1 text-xs font-semibold text-primary"
        >
          {selected.length} dipilih
        </motion.span>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-3 sm:grid-cols-2"
      >
        {options.map((option) => {
          const isSelected = selected.includes(option.value)

          return (
            <motion.button
              key={option.value}
              type="button"
              variants={item}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => onToggle(option.value)}
              className="text-left"
            >
              <motion.div
                animate={{
                  borderColor: isSelected ? "rgba(34,211,238,0.65)" : "rgba(255,255,255,0.08)",
                  backgroundColor: isSelected ? "rgba(8,145,178,0.14)" : "rgba(255,255,255,0.03)",
                }}
                transition={{ duration: 0.18 }}
                className="flex h-full items-start gap-4 rounded-2xl border p-4"
              >
                <motion.div
                  animate={{
                    backgroundColor: isSelected ? "rgba(34,211,238,0.95)" : "rgba(255,255,255,0.03)",
                    borderColor: isSelected ? "rgba(34,211,238,0.95)" : "rgba(255,255,255,0.14)",
                  }}
                  transition={{ duration: 0.18 }}
                  className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-md border"
                >
                  {isSelected ? (
                    <svg viewBox="0 0 20 20" className="size-3.5 text-slate-950" fill="none" aria-hidden="true">
                      <path
                        d="M5 10.5 8.4 14 15 7.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : null}
                </motion.div>

                <div className="space-y-2">
                  <p className="text-sm font-semibold text-white">{option.label}</p>
                  <p className="text-sm leading-relaxed text-white/65">{option.description}</p>
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
