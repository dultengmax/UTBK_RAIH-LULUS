"use client"

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
      <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="font-pixel text-sm font-semibold text-slate-900">Ringkasan pendaftaran</p>
            <p className="mt-1 text-sm text-slate-500">
              Semua detail ini akan dikirim saat kamu menekan tombol buat akun.
            </p>
          </div>
          <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            Final check
          </span>
        </div>

        <div className="space-y-3">
          {summaryRows.map((row, index) => (
            <div
              key={row.id}
              className="anim-fade-up flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
              style={{ animationDelay: `${0.05 + index * 0.05}s` }}
            >
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                {row.label}
              </span>
              <span className="text-sm font-medium text-slate-800">{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
        <div className="mb-4">
          <p className="font-pixel text-sm font-semibold text-slate-900">Fokus kelemahan</p>
          <p className="mt-1 text-sm text-slate-500">
            Area ini akan membantu personalisasi rekomendasi awal di dashboard.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {data.weaknesses.map((weakness, index) => (
            <span
              key={weakness}
              className="anim-fade-up rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm text-blue-700"
              style={{ animationDelay: `${0.05 + index * 0.05}s` }}
            >
              {weakness}
            </span>
          ))}
        </div>
      </div>

      {submitError ? (
        <p className="anim-expand rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
          {submitError}
        </p>
      ) : null}
    </div>
  )
}
