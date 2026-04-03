import type { SubtestDefinition } from "@/types/exam-package";

export const SUBTEST_CATALOG: SubtestDefinition[] = [
  { id: "PU", code: "PU", name: "Penalaran Umum", order: 1 },
  { id: "PPU", code: "PPU", name: "Pengetahuan dan Pemahaman Umum", order: 2 },
  { id: "PBM", code: "PBM", name: "Pemahaman Bacaan dan Menulis", order: 3 },
  { id: "PK", code: "PK", name: "Pengetahuan Kuantitatif", order: 4 },
  { id: "LIT_IND", code: "LIT_IND", name: "Literasi Bahasa Indonesia", order: 5 },
  { id: "LIT_ING", code: "LIT_ING", name: "Literasi Bahasa Inggris", order: 6 },
  { id: "PM", code: "PM", name: "Penalaran Matematika", order: 7 },
];

export const SUBTEST_NAME_BY_ID = Object.fromEntries(
  SUBTEST_CATALOG.map((subtest) => [subtest.id, subtest.name]),
) as Record<SubtestDefinition["id"], string>;
