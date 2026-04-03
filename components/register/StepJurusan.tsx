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
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm text-white/65">
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
          <p className="text-sm font-medium text-white">{OVERSEAS_SEARCH_COPY.title}</p>
          <p className="text-sm text-white/65">{OVERSEAS_SEARCH_COPY.description}</p>
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
                    ? "border-primary/40 bg-primary/15 text-primary"
                    : "border-white/10 bg-white/[0.03] text-white/65 hover:text-white",
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
            className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-primary/50 focus:outline-none"
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
                      borderColor: isSelected ? "rgba(34,211,238,0.65)" : "rgba(255,255,255,0.08)",
                      backgroundColor: isSelected ? "rgba(8,145,178,0.14)" : "rgba(255,255,255,0.03)",
                    }}
                    transition={{ duration: 0.18 }}
                    className="h-full rounded-2xl border p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg" aria-hidden="true">
                            {itemData.flag}
                          </span>
                          <p className="text-sm font-semibold text-white">{itemData.name}</p>
                        </div>
                        <p className="mt-1 text-sm text-white/60">{itemData.country}</p>
                      </div>

                      <div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-white/70">
                        QS #{itemData.qsRank}
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {itemData.previewMajors.map((major) => (
                        <span
                          key={major}
                          className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-white/70"
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
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-5 text-sm text-white/60">
            <p className="font-medium text-white">{OVERSEAS_SEARCH_COPY.emptyTitle}</p>
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
              className="overflow-hidden rounded-2xl border border-primary/20 bg-primary/[0.08] p-4"
            >
              <div className="space-y-2">
                <p className="text-sm font-semibold text-white">{OVERSEAS_SEARCH_COPY.majorsTitle}</p>
                <p className="text-sm text-white/65">{OVERSEAS_SEARCH_COPY.majorsDescription}</p>
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
                          borderColor: isSelected ? "rgba(34,211,238,0.65)" : "rgba(255,255,255,0.08)",
                          backgroundColor: isSelected ? "rgba(34,211,238,0.12)" : "rgba(255,255,255,0.03)",
                        }}
                        transition={{ duration: 0.18 }}
                        className="rounded-2xl border p-4"
                      >
                        <p className="text-sm font-semibold text-white">{major.label}</p>
                        <p className="mt-2 text-sm leading-relaxed text-white/65">{major.focus}</p>
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
              className="rounded-xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200"
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
        <p className="text-sm font-medium text-white">{fieldMeta.title}</p>
        <p className="text-sm text-white/65">{fieldMeta.description}</p>
      </div>

      <label className="block">
        <span className="sr-only">{fieldMeta.searchPlaceholder}</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={fieldMeta.searchPlaceholder}
          className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-primary/50 focus:outline-none"
        />
      </label>

      {sections.length > 0 ? (
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
          {sections.map((section) => (
            <motion.div
              key={section.id}
              variants={item}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-4"
            >
              <div className="mb-4 space-y-1">
                <p className="text-sm font-semibold text-white">{section.label}</p>
                <p className="text-sm text-white/60">{section.description}</p>
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
                          borderColor: isSelected ? "rgba(34,211,238,0.65)" : "rgba(255,255,255,0.08)",
                          backgroundColor: isSelected ? "rgba(8,145,178,0.14)" : "rgba(255,255,255,0.03)",
                        }}
                        transition={{ duration: 0.18 }}
                        className="rounded-2xl border p-4"
                      >
                        <p className="text-sm font-semibold text-white">{itemData.label}</p>
                        <p className="mt-2 text-sm leading-relaxed text-white/65">
                          {itemData.description}
                        </p>
                        <p className="mt-3 text-xs text-white/45">{itemData.hint}</p>
                      </motion.div>
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-5 text-sm text-white/60">
          <p className="font-medium text-white">{fieldMeta.emptyTitle}</p>
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
            className="rounded-xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200"
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
