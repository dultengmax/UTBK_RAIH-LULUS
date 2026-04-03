export const SUBTEST_CODES = [
  "PU",
  "PPU",
  "PBM",
  "PK",
  "LIT_IND",
  "LIT_ING",
  "PM",
] as const;

export type SubtestCode = (typeof SUBTEST_CODES)[number];

export type PackageStatus = "draft" | "published" | "archived";

export type DifficultyProfile = "easy" | "medium" | "hard" | "mixed";

export interface SubtestDefinition {
  id: SubtestCode;
  code: SubtestCode;
  name: string;
  order: number;
}

export interface PackageSection {
  id: string;
  subtestId: SubtestCode;
  subtestName: string;
  questionIds: string[];
  questionCount: number;
}

export interface ExamPackage {
  id: string;
  code: string;
  title: string;
  description: string;
  status: PackageStatus;
  difficultyProfile: DifficultyProfile;
  durationMinutes: number;
  year: number | null;
  tags: string[];
  totalQuestions: number;
  sections: PackageSection[];
  createdAt: string;
  updatedAt: string;
}

export interface ExamPackageDatabase {
  packages: ExamPackage[];
}
