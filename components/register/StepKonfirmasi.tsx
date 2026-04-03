"use client"

import { AnimatePresence, motion } from "motion/react"

import {
  OVERSEAS_PROGRAM_ID,
  PROGRAM_FIELD_META,
  PROGRAM_LABELS,
  SUMMARY_FIELDS,
  UNIVERSITIES,
} from "@/data/registerData"
import type { RegisterData } from "@/types/register"

interface StepKonfirmasiProps {
  data: RegisterData
  submitError: string
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

export function StepKonfirmasi({ data, submitError }: StepKonfirmasiProps) {
  const isOverseas = data.program === OVERSEAS_PROGRAM_ID
  const selectedUniversity = UNIVERSITIES.find((itemData) => itemData.id === data.university) ?? null
  const domesticProgram =
    data.program && data.program !== OVERSEAS_PROGRAM_ID
      ? (data.program as Exclude<typeof data.program, "luar_negeri">)
      : null

  const jurusanLabel =
    domesticProgram ? PROGRAM_FIELD_META[domesticProgram].label : "Jurusan"

  const summaryRows = SUMMARY_FIELDS.map((row) => {
    if (row.id === "program") {
      return {
        id: row.id,
        label: row.label,
        value: data.program ? PROGRAM_LABELS[data.program] : "-",
      }
    }

    if (row.id === "university") {
      return {
        id: row.id,
        label: row.label,
        value: selectedUniversity ? `${selectedUniversity.flag} ${selectedUniversity.name}` : "",
      }
    }

    if (row.id === "jurusan") {
      return {
        id: row.id,
        label: jurusanLabel,
        value: data.jurusan,
      }
    }

    return {
      id: row.id,
      label: row.label,
      value: data[row.id],
    }
  }).filter((row) => (row.id === "university" ? isOverseas && Boolean(row.value) : Boolean(row.value)))

  return (
    <div className="space-y-6">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
      >
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-white">Ringkasan pendaftaran</p>
            <p className="mt-1 text-sm text-white/60">
              Semua detail ini akan dikirim saat kamu menekan tombol buat akun.
            </p>
          </div>
          <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            Final check
          </span>
        </div>

        <div className="space-y-3">
          {summaryRows.map((row) => (
            <motion.div
              key={row.id}
              variants={item}
              className="flex flex-col gap-2 rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
                {row.label}
              </span>
              <span className="text-sm font-medium text-white">{row.value}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
      >
        <div className="mb-4">
          <p className="text-sm font-semibold text-white">Fokus kelemahan</p>
          <p className="mt-1 text-sm text-white/60">
            Area ini akan membantu personalisasi rekomendasi awal di dashboard.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {data.weaknesses.map((weakness) => (
            <motion.span
              key={weakness}
              variants={item}
              className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-sm text-primary"
            >
              {weakness}
            </motion.span>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {submitError ? (
          <motion.p
            initial={{ opacity: 0, height: 0, y: -4 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="rounded-xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200"
          >
            {submitError}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
