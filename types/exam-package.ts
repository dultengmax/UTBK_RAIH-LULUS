export const PROGRAM_IDS = ["utbk", "cpns", "bumn", "stan"] as const

export type ProgramId = (typeof PROGRAM_IDS)[number]

export const SUBTEST_CODES = [
  "PK",
  "PU",
  "PPU",
  "PBM",
  "LIT_IND",
  "LIT_ING",
  "PM",
  "CPNS_TWK",
  "CPNS_TIU",
  "CPNS_TKP",
  "BUMN_TKD",
  "BUMN_AKHLAK",
  "BUMN_ENG",
  "STAN_TPA",
  "STAN_TBI",
  "STAN_TWK",
] as const

export type SubtestCode = (typeof SUBTEST_CODES)[number]

export type PackageStatus = "draft" | "published" | "archived"

export type DifficultyProfile = "easy" | "medium" | "hard" | "mixed"

export interface SubtestDefinition {
  id: SubtestCode
  code: string
  name: string
  order: number
  programId: ProgramId
}

export interface ProgramDefinition {
  id: ProgramId
  code: string
  name: string
  description: string
  order: number
  subtests: SubtestDefinition[]
}

export interface PackageSection {
  id: string
  subtestId: SubtestCode
  subtestCode: string
  subtestName: string
  questionIds: string[]
  questionCount: number
}

export interface ExamPackage {
  id: string
  code: string
  title: string
  description: string
  programId: ProgramId
  status: PackageStatus
  difficultyProfile: DifficultyProfile
  durationMinutes: number
  year: number | null
  tags: string[]
  totalQuestions: number
  sections: PackageSection[]
  createdAt: string
  updatedAt: string
}

export interface ExamPackageDatabase {
  packages: ExamPackage[]
}
