"use client"

import { useDeferredValue, useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"

import {
  OVERSEAS_PROGRAM_ID,
  OVERSEAS_REGION_TABS,
  OVERSEAS_SEARCH_COPY,
  PROGRAM_FIELD_META,
  PROGRAM_GROUPS,
  UNIVERSITIES,
} from "@/data/registerData"
import { cn } from "@/lib/utils"
import type { ProgramId, RegisterData, UniversityOption } from "@/types/register"

interface StepJurusanProps {
  program: ProgramId | ""
  university: string
  jurusan: string
  error: string
  onChange: (fields: Partial<RegisterData>) => void
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

function matchesUniversity(university: UniversityOption, query: string) {
  if (!query) {
    return true
  }

  const haystack = [
    university.name,
    university.country,
    ...university.previewMajors,
    ...university.majors.map((major) => major.label),
    ...university.tags,
  ]
    .join(" ")
    .toLowerCase()

  return haystack.includes(query)
}

export function StepJurusan({
  program,
  university,
  jurusan,
  error,
  onChange,
}: StepJurusanProps) {
  const [query, setQuery] = useState("")
  const [activeRegion, setActiveRegion] = useState(OVERSEAS_REGION_TABS[0]?.id ?? "amerika")
  const deferredQuery = useDeferredValue(query.trim().toLowerCase())

  const selectedUniversity = UNIVERSITIES.find((item) => item.id === university) ?? null

  useEffect(() => {
    if (selectedUniversity) {
      setActiveRegion(selectedUniversity.region)
    }
  }, [selectedUniversity])

  if (!program) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 text-sm text-slate-500">
        Pilih program pada langkah sebelumnya untuk membuka daftar tujuan yang relevan.
      </div>
    )
  }

  if (program === OVERSEAS_PROGRAM_ID) {
    const filteredUniversities = UNIVERSITIES.filter(
      (item) => item.region === activeRegion && matchesUniversity(item, deferredQuery),
    )

    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-900">{OVERSEAS_SEARCH_COPY.title}</p>
          <p className="text-sm text-slate-500">{OVERSEAS_SEARCH_COPY.description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {OVERSEAS_REGION_TABS.map((tab) => {
            const isActive = tab.id === activeRegion

            return (
              <motion.button
                key={tab.id}
                type="button"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveRegion(tab.id)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm transition-colors",
                  isActive
                    ? "border-sky-200 bg-sky-50 text-sky-700"
                    : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-900",
                )}
              >
                {tab.label}
              </motion.button>
            )
          })}
        </div>

        <label className="block">
          <span className="sr-only">{OVERSEAS_SEARCH_COPY.searchPlaceholder}</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={OVERSEAS_SEARCH_COPY.searchPlaceholder}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none"
          />
        </label>

        {filteredUniversities.length > 0 ? (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-3 sm:grid-cols-2"
          >
            {filteredUniversities.map((itemData) => {
              const isSelected = itemData.id === university

              return (
                <motion.button
                  key={itemData.id}
                  type="button"
                  variants={item}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.985 }}
                  className="text-left"
                  onClick={() =>
                    onChange({
                      university: itemData.id,
                      jurusan: university === itemData.id ? jurusan : "",
                    })
                  }
                >
                  <motion.div
                    animate={{
                      borderColor: isSelected ? "rgba(14,165,233,0.52)" : "rgba(203,213,225,0.9)",
                      backgroundColor: isSelected ? "rgba(14,165,233,0.08)" : "rgba(255,255,255,0.92)",
                    }}
                    transition={{ duration: 0.18 }}
                    className="h-full rounded-2xl border p-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg" aria-hidden="true">
                            {itemData.flag}
                          </span>
                          <p className="text-sm font-semibold text-slate-900">{itemData.name}</p>
                        </div>
                        <p className="mt-1 text-sm text-slate-500">{itemData.country}</p>
                      </div>

                      <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500">
                        QS #{itemData.qsRank}
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {itemData.previewMajors.map((major) => (
                        <span
                          key={major}
                          className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] text-slate-500"
                        >
                          {major}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </motion.button>
              )
            })}
          </motion.div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-5 text-sm text-slate-500">
            <p className="font-medium text-slate-900">{OVERSEAS_SEARCH_COPY.emptyTitle}</p>
            <p className="mt-2">{OVERSEAS_SEARCH_COPY.emptyDescription}</p>
          </div>
        )}

        <AnimatePresence initial={false}>
          {selectedUniversity ? (
            <motion.div
              key={selectedUniversity.id}
              initial={{ opacity: 0, height: 0, y: 8 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.24 }}
              className="overflow-hidden rounded-2xl border border-sky-200 bg-sky-50/80 p-4"
            >
              <div className="space-y-2">
                <p className="text-sm font-semibold text-slate-900">{OVERSEAS_SEARCH_COPY.majorsTitle}</p>
                <p className="text-sm text-slate-500">{OVERSEAS_SEARCH_COPY.majorsDescription}</p>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {selectedUniversity.majors.map((major) => {
                  const isSelected = major.label === jurusan

                  return (
                    <motion.button
                      key={major.id}
                      type="button"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.985 }}
                      onClick={() => onChange({ jurusan: major.label })}
                      className="text-left"
                    >
                      <motion.div
                        animate={{
                          borderColor: isSelected ? "rgba(14,165,233,0.52)" : "rgba(203,213,225,0.9)",
                          backgroundColor: isSelected ? "rgba(14,165,233,0.08)" : "rgba(255,255,255,0.92)",
                        }}
                        transition={{ duration: 0.18 }}
                        className="rounded-2xl border p-4"
                      >
                        <p className="text-sm font-semibold text-slate-900">{major.label}</p>
                        <p className="mt-2 text-sm leading-relaxed text-slate-500">{major.focus}</p>
                      </motion.div>
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

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

  const domesticProgram = program as Exclude<ProgramId, "luar_negeri">
  const fieldMeta = PROGRAM_FIELD_META[domesticProgram]
  const sections = PROGRAM_GROUPS[domesticProgram]
    .map((section) => ({
      ...section,
      items: section.items.filter((itemData) => {
        if (!deferredQuery) {
          return true
        }

        const haystack = [itemData.label, itemData.description, itemData.hint]
          .join(" ")
          .toLowerCase()

        return haystack.includes(deferredQuery)
      }),
    }))
    .filter((section) => section.items.length > 0)

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-medium text-slate-900">{fieldMeta.title}</p>
        <p className="text-sm text-slate-500">{fieldMeta.description}</p>
      </div>

      <label className="block">
        <span className="sr-only">{fieldMeta.searchPlaceholder}</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={fieldMeta.searchPlaceholder}
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none"
        />
      </label>

      {sections.length > 0 ? (
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
          {sections.map((section) => (
            <motion.div
              key={section.id}
              variants={item}
              className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4"
            >
              <div className="mb-4 space-y-1">
                <p className="text-sm font-semibold text-slate-900">{section.label}</p>
                <p className="text-sm text-slate-500">{section.description}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {section.items.map((itemData) => {
                  const isSelected = itemData.value === jurusan

                  return (
                    <motion.button
                      key={itemData.value}
                      type="button"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.985 }}
                      onClick={() => onChange({ university: "", jurusan: itemData.value })}
                      className="text-left"
                    >
                      <motion.div
                        animate={{
                          borderColor: isSelected ? "rgba(14,165,233,0.52)" : "rgba(203,213,225,0.9)",
                          backgroundColor: isSelected ? "rgba(14,165,233,0.08)" : "rgba(255,255,255,0.92)",
                        }}
                        transition={{ duration: 0.18 }}
                        className="rounded-2xl border p-4"
                      >
                        <p className="text-sm font-semibold text-slate-900">{itemData.label}</p>
                        <p className="mt-2 text-sm leading-relaxed text-slate-500">
                          {itemData.description}
                        </p>
                        <p className="mt-3 text-xs text-slate-400">{itemData.hint}</p>
                      </motion.div>
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-5 text-sm text-slate-500">
          <p className="font-medium text-slate-900">{fieldMeta.emptyTitle}</p>
          <p className="mt-2">{fieldMeta.emptyDescription}</p>
        </div>
      )}

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
