"use client"

import { useDeferredValue, useEffect, useState } from "react"

import {
  OVERSEAS_PROGRAM_ID,
  OVERSEAS_REGION_TABS,
  OVERSEAS_SEARCH_COPY,
  PROGRAM_FIELD_META,
  PROGRAM_GROUPS,
  UNIVERSITIES,
} from "@/data/registerData"
import { ProgramChoiceCard } from "@/components/register/ProgramChoiceCard"
import { cn } from "@/lib/utils"
import type { ProgramId, RegisterData, UniversityOption } from "@/types/register"

interface StepJurusanProps {
  program: ProgramId | ""
  university: string
  jurusan: string
  error: string
  onChange: (fields: Partial<RegisterData>) => void
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
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveRegion(tab.id)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm transition-all duration-200 hover:-translate-y-0.5 active:scale-95",
                  isActive
                    ? "border-blue-200 bg-blue-50 text-blue-700"
                    : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-900",
                )}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        <label className="block">
          <span className="sr-only">{OVERSEAS_SEARCH_COPY.searchPlaceholder}</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={OVERSEAS_SEARCH_COPY.searchPlaceholder}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </label>

        {filteredUniversities.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {filteredUniversities.map((itemData, index) => {
              const isSelected = itemData.id === university

              return (
                <button
                  key={itemData.id}
                  type="button"
                  className="anim-fade-up text-left"
                  style={{ animationDelay: `${0.05 + index * 0.05}s` }}
                  onClick={() =>
                    onChange({
                      university: itemData.id,
                      jurusan: university === itemData.id ? jurusan : "",
                    })
                  }
                >
                  <div
                    className={cn(
                      "h-full rounded-2xl border p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.985]",
                      isSelected
                        ? "border-blue-600/52 bg-blue-600/[0.08]"
                        : "border-slate-300/90 bg-white/[0.92]",
                    )}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg" aria-hidden="true">
                            {itemData.flag}
                          </span>
                          <p className="font-pixel text-sm font-semibold text-slate-900">{itemData.name}</p>
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
                  </div>
                </button>
              )
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-5 text-sm text-slate-500">
            <p className="font-medium text-slate-900">{OVERSEAS_SEARCH_COPY.emptyTitle}</p>
            <p className="mt-2">{OVERSEAS_SEARCH_COPY.emptyDescription}</p>
          </div>
        )}

        {selectedUniversity ? (
          <div
            key={selectedUniversity.id}
            className="anim-expand rounded-2xl border border-blue-200 bg-blue-50/80 p-4"
          >
            <div className="space-y-2">
              <p className="text-sm font-semibold text-slate-900">{OVERSEAS_SEARCH_COPY.majorsTitle}</p>
              <p className="text-sm text-slate-500">{OVERSEAS_SEARCH_COPY.majorsDescription}</p>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {selectedUniversity.majors.map((major) => {
                const isSelected = major.label === jurusan

                return (
                  <ProgramChoiceCard
                    key={major.id}
                    selected={isSelected}
                    onSelect={() => onChange({ jurusan: major.label })}
                    title={major.label}
                    description={major.focus}
                  />
                )
              })}
            </div>
          </div>
        ) : null}

        {error ? (
          <p className="anim-expand rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
            {error}
          </p>
        ) : null}
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
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
        />
      </label>

      {sections.length > 0 ? (
        <div className="space-y-4">
          {sections.map((section, sectionIndex) => (
            <div
              key={section.id}
              className="anim-fade-up rounded-2xl border border-slate-200 bg-slate-50/70 p-4"
              style={{ animationDelay: `${0.05 + sectionIndex * 0.05}s` }}
            >
              <div className="mb-4 space-y-1">
                <p className="font-pixel text-sm font-semibold text-slate-900">{section.label}</p>
                <p className="text-sm text-slate-500">{section.description}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {section.items.map((itemData) => {
                  const isSelected = itemData.value === jurusan

                  return (
                    <ProgramChoiceCard
                      key={itemData.value}
                      selected={isSelected}
                      onSelect={() => onChange({ university: "", jurusan: itemData.value })}
                      title={itemData.label}
                      description={itemData.description}
                      hint={itemData.hint}
                    />
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-5 text-sm text-slate-500">
          <p className="font-medium text-slate-900">{fieldMeta.emptyTitle}</p>
          <p className="mt-2">{fieldMeta.emptyDescription}</p>
        </div>
      )}

      {error ? (
        <p className="anim-expand rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
          {error}
        </p>
      ) : null}
    </div>
  )
}
