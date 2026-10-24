import type { ProgramDefinition, ProgramId, SubtestDefinition, SubtestCode } from "@/types/exam-package"

export const PROGRAM_CATALOG: ProgramDefinition[] = [
  {
    id: "utbk",
    code: "UTBK",
    name: "UTBK / SNBT",
    description: "Paket latihan khusus TPS, literasi, dan penalaran matematika.",
    order: 1,
    subtests: [
      { id: "PK", code: "PK", name: "Pengetahuan Kuantitatif", order: 1, programId: "utbk" },
      { id: "PU", code: "PU", name: "Penalaran Umum", order: 2, programId: "utbk" },
      { id: "PPU", code: "PPU", name: "Pengetahuan dan Pemahaman Umum", order: 3, programId: "utbk" },
      { id: "PBM", code: "PBM", name: "Pemahaman Bacaan dan Menulis", order: 4, programId: "utbk" },
      { id: "LIT_IND", code: "LIT IND", name: "Literasi Bahasa Indonesia", order: 5, programId: "utbk" },
      { id: "LIT_ING", code: "LIT ING", name: "Literasi Bahasa Inggris", order: 6, programId: "utbk" },
      { id: "PM", code: "PM", name: "Penalaran Matematika", order: 7, programId: "utbk" },
    ],
  },
  {
    id: "cpns",
    code: "CPNS",
    name: "CPNS",
    description: "Paket simulasi SKD untuk TWK, TIU, dan TKP.",
    order: 2,
    subtests: [
      { id: "CPNS_TWK", code: "TWK", name: "Tes Wawasan Kebangsaan", order: 1, programId: "cpns" },
      { id: "CPNS_TIU", code: "TIU", name: "Tes Intelegensi Umum", order: 2, programId: "cpns" },
      { id: "CPNS_TKP", code: "TKP", name: "Tes Karakteristik Pribadi", order: 3, programId: "cpns" },
    ],
  },
  {
    id: "bumn",
    code: "BUMN",
    name: "BUMN",
    description: "Paket latihan TKD, AKHLAK, dan English Test rekrutmen BUMN.",
    order: 3,
    subtests: [
      { id: "BUMN_TKD", code: "TKD", name: "Tes Kemampuan Dasar", order: 1, programId: "bumn" },
      { id: "BUMN_AKHLAK", code: "AKHLAK", name: "Core Values BUMN", order: 2, programId: "bumn" },
      { id: "BUMN_ENG", code: "ENG", name: "English Test", order: 3, programId: "bumn" },
    ],
  },
  {
    id: "stan",
    code: "STAN",
    name: "STAN / Kedinasan",
    description: "Paket seleksi kedinasan STAN untuk TPA, TBI, dan TWK.",
    order: 4,
    subtests: [
      { id: "STAN_TPA", code: "TPA", name: "Tes Potensi Akademik", order: 1, programId: "stan" },
      { id: "STAN_TBI", code: "TBI", name: "Tes Bahasa Inggris", order: 2, programId: "stan" },
      { id: "STAN_TWK", code: "TWK", name: "Tes Wawasan Kebangsaan", order: 3, programId: "stan" },
    ],
  },
]

export const PROGRAM_NAME_BY_ID = Object.fromEntries(
  PROGRAM_CATALOG.map((program) => [program.id, program.name]),
) as Record<ProgramId, string>

export const SUBTEST_CATALOG: SubtestDefinition[] = PROGRAM_CATALOG.flatMap((program) => program.subtests)

export const SUBTEST_NAME_BY_ID = Object.fromEntries(
  SUBTEST_CATALOG.map((subtest) => [subtest.id, subtest.name]),
) as Record<SubtestCode, string>

export const SUBTEST_CODE_BY_ID = Object.fromEntries(
  SUBTEST_CATALOG.map((subtest) => [subtest.id, subtest.code]),
) as Record<SubtestCode, string>

export const SUBTEST_BY_ID = Object.fromEntries(
  SUBTEST_CATALOG.map((subtest) => [subtest.id, subtest]),
) as Record<SubtestCode, SubtestDefinition>

export const getProgramById = (programId: ProgramId) =>
  PROGRAM_CATALOG.find((program) => program.id === programId) ?? null
