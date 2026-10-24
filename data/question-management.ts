import type { ProgramId, SubtestCode } from "@/types/exam-package"

export type QuestionManagementPackageOption = {
  id: string
  code: string
  title: string
  description: string
  programId: ProgramId
  subtestIds: SubtestCode[]
}

export type ManagedQuestion = {
  id: number
  number: string
  question: string
  programId: ProgramId
  packageId: string
  subtestId: SubtestCode
  difficulty: "Easy" | "Medium" | "Hard"
  createdBy: string
  createdAt: string
  status: "Dipublikasikan" | "Draft"
}

export const QUESTION_PACKAGE_OPTIONS: QuestionManagementPackageOption[] = [
  {
    id: "pkg-utbk-001",
    code: "UTBK-INT-1",
    title: "UTBK Intensif TPS 1",
    description: "Paket dasar untuk latihan PK, PU, PPU, dan PBM.",
    programId: "utbk",
    subtestIds: ["PK", "PU", "PPU", "PBM"],
  },
  {
    id: "pkg-utbk-002",
    code: "UTBK-LIT-PM",
    title: "UTBK Literasi & PM",
    description: "Paket lanjutan untuk literasi dan penalaran matematika.",
    programId: "utbk",
    subtestIds: ["LIT_IND", "LIT_ING", "PM"],
  },
  {
    id: "pkg-cpns-001",
    code: "CPNS-SKD-PRM",
    title: "CPNS SKD Premium",
    description: "Paket simulasi SKD lengkap (TWK, TIU, TKP).",
    programId: "cpns",
    subtestIds: ["CPNS_TWK", "CPNS_TIU", "CPNS_TKP"],
  },
  {
    id: "pkg-bumn-001",
    code: "BUMN-BASIC-1",
    title: "BUMN Rekrutmen Dasar",
    description: "Paket persiapan TKD, AKHLAK, dan English Test.",
    programId: "bumn",
    subtestIds: ["BUMN_TKD", "BUMN_AKHLAK", "BUMN_ENG"],
  },
  {
    id: "pkg-stan-001",
    code: "STAN-CORE-1",
    title: "STAN Core Test",
    description: "Paket kedinasan untuk TPA, TBI, dan TWK.",
    programId: "stan",
    subtestIds: ["STAN_TPA", "STAN_TBI", "STAN_TWK"],
  },
]

export const MANAGED_QUESTIONS: ManagedQuestion[] = [
  {
    id: 1,
    number: "UTBK-PK-001",
    question: "Nilai x dari persamaan 2x + 5 = 19 adalah...",
    programId: "utbk",
    packageId: "pkg-utbk-001",
    subtestId: "PK",
    difficulty: "Easy",
    createdBy: "Admin UTBK",
    createdAt: "2026-03-20",
    status: "Dipublikasikan",
  },
  {
    id: 2,
    number: "UTBK-PU-003",
    question: "Simpulan paling tepat dari paragraf argumentasi berikut adalah...",
    programId: "utbk",
    packageId: "pkg-utbk-001",
    subtestId: "PU",
    difficulty: "Medium",
    createdBy: "Editor UTBK",
    createdAt: "2026-03-21",
    status: "Draft",
  },
  {
    id: 3,
    number: "UTBK-LITIND-004",
    question: "Makna kata bercetak tebal pada teks editorial di atas adalah...",
    programId: "utbk",
    packageId: "pkg-utbk-002",
    subtestId: "LIT_IND",
    difficulty: "Medium",
    createdBy: "Admin UTBK",
    createdAt: "2026-03-22",
    status: "Dipublikasikan",
  },
  {
    id: 4,
    number: "CPNS-TWK-011",
    question: "Sila ke-3 Pancasila menekankan nilai...",
    programId: "cpns",
    packageId: "pkg-cpns-001",
    subtestId: "CPNS_TWK",
    difficulty: "Easy",
    createdBy: "Admin CPNS",
    createdAt: "2026-03-22",
    status: "Dipublikasikan",
  },
  {
    id: 5,
    number: "CPNS-TIU-009",
    question: "Jika semua A adalah B dan sebagian B adalah C, maka...",
    programId: "cpns",
    packageId: "pkg-cpns-001",
    subtestId: "CPNS_TIU",
    difficulty: "Hard",
    createdBy: "Admin CPNS",
    createdAt: "2026-03-23",
    status: "Draft",
  },
  {
    id: 6,
    number: "BUMN-AKHLAK-006",
    question: "Perilaku yang paling mencerminkan nilai Kolaboratif adalah...",
    programId: "bumn",
    packageId: "pkg-bumn-001",
    subtestId: "BUMN_AKHLAK",
    difficulty: "Medium",
    createdBy: "Admin BUMN",
    createdAt: "2026-03-24",
    status: "Dipublikasikan",
  },
  {
    id: 7,
    number: "STAN-TPA-012",
    question: "Deret angka: 2, 6, 12, 20, ... angka selanjutnya adalah...",
    programId: "stan",
    packageId: "pkg-stan-001",
    subtestId: "STAN_TPA",
    difficulty: "Medium",
    createdBy: "Admin STAN",
    createdAt: "2026-03-24",
    status: "Dipublikasikan",
  },
  {
    id: 8,
    number: "STAN-TBI-002",
    question: "Choose the correct synonym for the word \"rapid\"...",
    programId: "stan",
    packageId: "pkg-stan-001",
    subtestId: "STAN_TBI",
    difficulty: "Easy",
    createdBy: "Editor STAN",
    createdAt: "2026-03-25",
    status: "Draft",
  },
]
