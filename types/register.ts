"use client"

export type ProgramId =
  | "cpns"
  | "utbk_snbt"
  | "kedinasan"
  | "bumn"
  | "pppk"
  | "tni_polri"
  | "luar_negeri"

export type OverseasRegionId =
  | "amerika"
  | "uk_eropa"
  | "asia_australia"
  | "beasiswa_populer"

export type AccountFieldId =
  | "name"
  | "email"
  | "username"
  | "password"
  | "confirmPassword"

export interface RegisterData {
  program: ProgramId | ""
  university: string
  jurusan: string
  weaknesses: string[]
  name: string
  email: string
  username: string
  password: string
}

export interface RegisterStepMeta {
  id: number
  label: string
  title: string
  description: string
}

export interface ProgramOption {
  id: ProgramId
  label: string
  description: string
  badge?: string
}

export interface ProgramFieldMeta {
  label: string
  title: string
  description: string
  searchPlaceholder: string
  emptyTitle: string
  emptyDescription: string
}

export interface GroupedOptionItem {
  value: string
  label: string
  description: string
  hint: string
}

export interface GroupedOptionSection {
  id: string
  label: string
  description: string
  items: GroupedOptionItem[]
}

export interface OverseasRegionTab {
  id: OverseasRegionId
  label: string
  description: string
}

export interface UniversityMajor {
  id: string
  label: string
  focus: string
}

export interface UniversityOption {
  id: string
  name: string
  flag: string
  country: string
  qsRank: number
  region: OverseasRegionId
  previewMajors: string[]
  majors: UniversityMajor[]
  tags: string[]
}

export interface WeaknessOption {
  value: string
  label: string
  description: string
}

export interface AccountFieldMeta {
  id: AccountFieldId
  label: string
  placeholder: string
  type: "text" | "email" | "password"
  helper: string
  autoComplete: string
}

export interface SummaryFieldMeta {
  id: "program" | "university" | "jurusan" | "name" | "email" | "username"
  label: string
}

export interface HighlightStat {
  label: string
  value: string
  description: string
}

export interface PasswordRule {
  id: string
  label: string
}

export interface SuccessParticle {
  x: number
  y: number
  size: number
  delay: number
  duration: number
  colorClass: string
}

export interface SubmitResultSuccess {
  ok: true
}

export interface SubmitResultError {
  ok: false
  message: string
}

export type SubmitResult = SubmitResultSuccess | SubmitResultError
