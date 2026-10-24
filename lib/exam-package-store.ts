import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { z } from "zod"

import {
  PROGRAM_CATALOG,
  SUBTEST_BY_ID,
  SUBTEST_CATALOG,
  SUBTEST_CODE_BY_ID,
  SUBTEST_NAME_BY_ID,
} from "@/lib/exam-package-catalog"
import type {
  DifficultyProfile,
  ExamPackage,
  ExamPackageDatabase,
  PackageSection,
  PackageStatus,
  ProgramDefinition,
  ProgramId,
  SubtestCode,
} from "@/types/exam-package"
import { PROGRAM_IDS, SUBTEST_CODES } from "@/types/exam-package"

const DB_DIRECTORY = path.join(process.cwd(), "data")
const DB_FILE = path.join(DB_DIRECTORY, "exam-packages.json")

const packageStatusSchema = z.enum(["draft", "published", "archived"])
const difficultyProfileSchema = z.enum(["easy", "medium", "hard", "mixed"])
const programIdSchema = z.enum(PROGRAM_IDS)
const subtestCodeSchema = z.enum(SUBTEST_CODES)

const packageSectionInputSchema = z.object({
  subtestId: subtestCodeSchema,
  questionIds: z.array(z.string().trim().min(1)).default([]),
  questionCount: z.number().int().nonnegative().optional(),
})

const createExamPackageInputSchema = z.object({
  title: z.string().trim().min(3).max(160),
  description: z.string().trim().min(10).max(1200),
  programId: programIdSchema.default("utbk"),
  status: packageStatusSchema.default("draft"),
  difficultyProfile: difficultyProfileSchema.default("mixed"),
  durationMinutes: z.number().int().min(1).max(600),
  year: z.number().int().min(2020).max(2100).nullable().optional(),
  tags: z.array(z.string().trim().min(1).max(40)).max(12).default([]),
  sections: z.array(packageSectionInputSchema).min(1),
})

const updateExamPackageInputSchema = createExamPackageInputSchema.partial()

const normalizeStringList = (items: string[]) =>
  Array.from(
    new Set(
      items
        .map((item) => item.trim())
        .filter(Boolean),
    ),
  )

const isProgramId = (value: unknown): value is ProgramId =>
  typeof value === "string" && PROGRAM_IDS.includes(value as ProgramId)

const isSubtestCode = (value: unknown): value is SubtestCode =>
  typeof value === "string" && SUBTEST_CODES.includes(value as SubtestCode)

const isPackageStatus = (value: unknown): value is PackageStatus =>
  value === "draft" || value === "published" || value === "archived"

const isDifficultyProfile = (value: unknown): value is DifficultyProfile =>
  value === "easy" || value === "medium" || value === "hard" || value === "mixed"

const validateUniqueSections = (
  sections: Array<{ subtestId: SubtestCode }> | undefined,
  ctx: z.RefinementCtx,
) => {
  if (!sections) return

  const seen = new Set<string>()

  sections.forEach((section, index) => {
    if (seen.has(section.subtestId)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["sections", index, "subtestId"],
        message: `Subtes ${section.subtestId} tidak boleh duplikat dalam satu paket.`,
      })
      return
    }

    seen.add(section.subtestId)
  })
}

const validateSectionsBelongToProgram = (
  programId: ProgramId | undefined,
  sections: Array<{ subtestId: SubtestCode }> | undefined,
  ctx: z.RefinementCtx,
) => {
  if (!programId || !sections) {
    return
  }

  sections.forEach((section, index) => {
    const subtest = SUBTEST_BY_ID[section.subtestId]
    if (subtest.programId !== programId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["sections", index, "subtestId"],
        message: `Subtes ${subtest.code} tidak termasuk program ${programId.toUpperCase()}.`,
      })
    }
  })
}

export const createExamPackageSchema = createExamPackageInputSchema.superRefine((value, ctx) => {
  validateUniqueSections(value.sections, ctx)
  validateSectionsBelongToProgram(value.programId, value.sections, ctx)
})

export const updateExamPackageSchema = updateExamPackageInputSchema.superRefine((value, ctx) => {
  validateUniqueSections(value.sections, ctx)

  if (value.sections && !value.programId) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["programId"],
      message: "programId wajib diisi saat memperbarui daftar subtes.",
    })
    return
  }

  validateSectionsBelongToProgram(value.programId, value.sections, ctx)
})

type CreateExamPackageInput = z.infer<typeof createExamPackageSchema>
type UpdateExamPackageInput = z.infer<typeof updateExamPackageSchema>

const inferProgramId = (rawPackage: Record<string, unknown>): ProgramId => {
  if (isProgramId(rawPackage.programId)) {
    return rawPackage.programId
  }

  if (Array.isArray(rawPackage.sections)) {
    for (const section of rawPackage.sections) {
      if (section && typeof section === "object") {
        const subtestId = (section as Record<string, unknown>).subtestId
        if (isSubtestCode(subtestId)) {
          return SUBTEST_BY_ID[subtestId].programId
        }
      }
    }
  }

  const tags = Array.isArray(rawPackage.tags)
    ? rawPackage.tags
        .map((tag) => (typeof tag === "string" ? tag.toLowerCase() : ""))
        .filter(Boolean)
    : []

  if (tags.includes("cpns")) return "cpns"
  if (tags.includes("bumn")) return "bumn"
  if (tags.includes("stan") || tags.includes("kedinasan")) return "stan"
  return "utbk"
}

const createPackageCode = (programId: ProgramId) => {
  const timestamp = new Date().toISOString().replace(/[-:TZ.]/g, "").slice(0, 14)
  const randomSuffix = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `${programId.toUpperCase()}-${timestamp}-${randomSuffix}`
}

const createSectionId = (subtestId: SubtestCode) => {
  const randomSuffix = Math.random().toString(36).slice(2, 8)
  return `section-${subtestId.toLowerCase()}-${randomSuffix}`
}

const buildSections = (
  sections: CreateExamPackageInput["sections"] | UpdateExamPackageInput["sections"],
) =>
  (sections ?? []).map<PackageSection>((section: z.infer<typeof packageSectionInputSchema>) => {
    const questionIds = normalizeStringList(section.questionIds ?? [])

    return {
      id: createSectionId(section.subtestId),
      subtestId: section.subtestId,
      subtestCode: SUBTEST_CODE_BY_ID[section.subtestId],
      subtestName: SUBTEST_NAME_BY_ID[section.subtestId],
      questionIds,
      questionCount: section.questionCount ?? questionIds.length,
    }
  })

const computeTotalQuestions = (sections: PackageSection[]) =>
  sections.reduce((total, section) => total + section.questionCount, 0)

const normalizeSection = (
  rawSection: Record<string, unknown>,
  programId: ProgramId,
  index: number,
): PackageSection => {
  let subtestId: SubtestCode = SUBTEST_CATALOG.find((item) => item.programId === programId)?.id ?? "PK"

  if (isSubtestCode(rawSection.subtestId)) {
    const detectedSubtest = SUBTEST_BY_ID[rawSection.subtestId]
    if (detectedSubtest.programId === programId) {
      subtestId = rawSection.subtestId
    }
  }

  const questionIds = Array.isArray(rawSection.questionIds)
    ? normalizeStringList(rawSection.questionIds.filter((item): item is string => typeof item === "string"))
    : []

  const questionCount =
    typeof rawSection.questionCount === "number" && rawSection.questionCount >= 0
      ? Math.floor(rawSection.questionCount)
      : questionIds.length

  return {
    id: typeof rawSection.id === "string" && rawSection.id ? rawSection.id : `section-${subtestId.toLowerCase()}-${index + 1}`,
    subtestId,
    subtestCode: SUBTEST_CODE_BY_ID[subtestId],
    subtestName: SUBTEST_NAME_BY_ID[subtestId],
    questionIds,
    questionCount,
  }
}

const normalizePackage = (rawPackage: Record<string, unknown>, index: number): ExamPackage => {
  const programId = inferProgramId(rawPackage)
  const fallbackSubtest = SUBTEST_CATALOG.find((item) => item.programId === programId)?.id ?? "PK"

  const sections = Array.isArray(rawPackage.sections)
    ? rawPackage.sections
        .filter((section): section is Record<string, unknown> => !!section && typeof section === "object")
        .map((section, sectionIndex) => normalizeSection(section, programId, sectionIndex))
    : [
        {
          id: `section-${fallbackSubtest.toLowerCase()}-1`,
          subtestId: fallbackSubtest,
          subtestCode: SUBTEST_CODE_BY_ID[fallbackSubtest],
          subtestName: SUBTEST_NAME_BY_ID[fallbackSubtest],
          questionIds: [],
          questionCount: 0,
        },
      ]

  const totalQuestions = computeTotalQuestions(sections)
  const now = new Date().toISOString()

  return {
    id: typeof rawPackage.id === "string" && rawPackage.id ? rawPackage.id : crypto.randomUUID(),
    code: typeof rawPackage.code === "string" && rawPackage.code ? rawPackage.code : createPackageCode(programId),
    title: typeof rawPackage.title === "string" && rawPackage.title ? rawPackage.title : `Paket ${programId.toUpperCase()} ${index + 1}`,
    description:
      typeof rawPackage.description === "string" && rawPackage.description
        ? rawPackage.description
        : "Paket latihan untuk membantu persiapan ujian.",
    programId,
    status: isPackageStatus(rawPackage.status) ? rawPackage.status : "draft",
    difficultyProfile: isDifficultyProfile(rawPackage.difficultyProfile) ? rawPackage.difficultyProfile : "mixed",
    durationMinutes:
      typeof rawPackage.durationMinutes === "number" && rawPackage.durationMinutes > 0
        ? Math.floor(rawPackage.durationMinutes)
        : 60,
    year: typeof rawPackage.year === "number" ? Math.floor(rawPackage.year) : null,
    tags: Array.isArray(rawPackage.tags)
      ? normalizeStringList(rawPackage.tags.filter((item): item is string => typeof item === "string"))
      : [],
    totalQuestions,
    sections,
    createdAt: typeof rawPackage.createdAt === "string" ? rawPackage.createdAt : now,
    updatedAt: typeof rawPackage.updatedAt === "string" ? rawPackage.updatedAt : now,
  }
}

const normalizeDatabase = (rawData: unknown): ExamPackageDatabase => {
  if (!rawData || typeof rawData !== "object") {
    return { packages: [] }
  }

  const rawPackages = Array.isArray((rawData as Record<string, unknown>).packages)
    ? ((rawData as Record<string, unknown>).packages as unknown[])
    : []

  const packages = rawPackages
    .filter((item): item is Record<string, unknown> => !!item && typeof item === "object")
    .map((rawPackage, index) => normalizePackage(rawPackage, index))

  return { packages }
}

async function ensureDbFile() {
  await mkdir(DB_DIRECTORY, { recursive: true })

  try {
    await readFile(DB_FILE, "utf-8")
  } catch {
    const initialData: ExamPackageDatabase = { packages: [] }
    await writeFile(DB_FILE, JSON.stringify(initialData, null, 2), "utf-8")
  }
}

async function readDb(): Promise<ExamPackageDatabase> {
  await ensureDbFile()
  const raw = await readFile(DB_FILE, "utf-8")
  return normalizeDatabase(JSON.parse(raw) as unknown)
}

async function writeDb(data: ExamPackageDatabase) {
  await ensureDbFile()
  await writeFile(DB_FILE, JSON.stringify(data, null, 2), "utf-8")
}

export async function listExamPackages(filters?: {
  status?: PackageStatus
  programId?: ProgramId
  subtestId?: SubtestCode
}) {
  const db = await readDb()

  return db.packages.filter((examPackage) => {
    const matchesStatus = !filters?.status || examPackage.status === filters.status
    const matchesProgram = !filters?.programId || examPackage.programId === filters.programId
    const matchesSubtest =
      !filters?.subtestId || examPackage.sections.some((section) => section.subtestId === filters.subtestId)

    return matchesStatus && matchesProgram && matchesSubtest
  })
}

export async function getExamPackageById(id: string) {
  const db = await readDb()
  return db.packages.find((examPackage) => examPackage.id === id) ?? null
}

export async function createExamPackage(input: CreateExamPackageInput) {
  const db = await readDb()
  const sections = buildSections(input.sections)
  const now = new Date().toISOString()

  const newPackage: ExamPackage = {
    id: crypto.randomUUID(),
    code: createPackageCode(input.programId),
    title: input.title.trim(),
    description: input.description.trim(),
    programId: input.programId,
    status: input.status,
    difficultyProfile: input.difficultyProfile,
    durationMinutes: input.durationMinutes,
    year: input.year ?? null,
    tags: normalizeStringList(input.tags),
    totalQuestions: computeTotalQuestions(sections),
    sections,
    createdAt: now,
    updatedAt: now,
  }

  db.packages.unshift(newPackage)
  await writeDb(db)

  return newPackage
}

export async function updateExamPackage(id: string, input: UpdateExamPackageInput) {
  const db = await readDb()
  const index = db.packages.findIndex((examPackage) => examPackage.id === id)

  if (index === -1) {
    return null
  }

  const existingPackage = db.packages[index]
  const nextProgramId = input.programId ?? existingPackage.programId
  const nextSections = input.sections ? buildSections(input.sections) : existingPackage.sections

  if (nextSections.some((section) => SUBTEST_BY_ID[section.subtestId].programId !== nextProgramId)) {
    throw new Error("Ada subtes yang tidak sesuai dengan program paket.")
  }

  const updatedPackage: ExamPackage = {
    ...existingPackage,
    title: input.title?.trim() ?? existingPackage.title,
    description: input.description?.trim() ?? existingPackage.description,
    programId: nextProgramId,
    status: input.status ?? existingPackage.status,
    difficultyProfile: input.difficultyProfile ?? existingPackage.difficultyProfile,
    durationMinutes: input.durationMinutes ?? existingPackage.durationMinutes,
    year: input.year === undefined ? existingPackage.year : input.year,
    tags: input.tags ? normalizeStringList(input.tags) : existingPackage.tags,
    sections: nextSections,
    totalQuestions: computeTotalQuestions(nextSections),
    updatedAt: new Date().toISOString(),
  }

  db.packages[index] = updatedPackage
  await writeDb(db)

  return updatedPackage
}

export async function deleteExamPackage(id: string) {
  const db = await readDb()
  const nextPackages = db.packages.filter((examPackage) => examPackage.id !== id)

  if (nextPackages.length === db.packages.length) {
    return false
  }

  await writeDb({ packages: nextPackages })
  return true
}

export function listPrograms(): ProgramDefinition[] {
  return PROGRAM_CATALOG
}

export function listSubtests(programId?: ProgramId) {
  if (!programId) {
    return SUBTEST_CATALOG
  }

  return SUBTEST_CATALOG.filter((subtest) => subtest.programId === programId)
}
