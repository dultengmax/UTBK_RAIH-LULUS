import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";

import { SUBTEST_CATALOG, SUBTEST_NAME_BY_ID } from "@/lib/exam-package-catalog";
import type {
  DifficultyProfile,
  ExamPackage,
  ExamPackageDatabase,
  PackageSection,
  PackageStatus,
  SubtestCode,
} from "@/types/exam-package";
import { SUBTEST_CODES } from "@/types/exam-package";

const DB_DIRECTORY = path.join(process.cwd(), "data");
const DB_FILE = path.join(DB_DIRECTORY, "exam-packages.json");

const packageStatusSchema = z.enum(["draft", "published", "archived"]);
const difficultyProfileSchema = z.enum(["easy", "medium", "hard", "mixed"]);
const subtestCodeSchema = z.enum(SUBTEST_CODES);

const packageSectionInputSchema = z.object({
  subtestId: subtestCodeSchema,
  questionIds: z.array(z.string().trim().min(1)).default([]),
  questionCount: z.number().int().nonnegative().optional(),
});

const createExamPackageInputSchema = z.object({
  title: z.string().trim().min(3).max(160),
  description: z.string().trim().min(10).max(1200),
  status: packageStatusSchema.default("draft"),
  difficultyProfile: difficultyProfileSchema.default("mixed"),
  durationMinutes: z.number().int().min(1).max(600),
  year: z.number().int().min(2020).max(2100).nullable().optional(),
  tags: z.array(z.string().trim().min(1).max(40)).max(12).default([]),
  sections: z.array(packageSectionInputSchema).min(1),
});

const updateExamPackageInputSchema = createExamPackageInputSchema.partial();

const validateUniqueSections = (
  sections: Array<{ subtestId: SubtestCode }> | undefined,
  ctx: z.RefinementCtx,
) => {
  if (!sections) return;

  const seen = new Set<string>();

  sections.forEach((section, index) => {
    if (seen.has(section.subtestId)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["sections", index, "subtestId"],
        message: `Subtes ${section.subtestId} tidak boleh duplikat dalam satu paket.`,
      });
      return;
    }

    seen.add(section.subtestId);
  });
};

export const createExamPackageSchema = createExamPackageInputSchema.superRefine((value, ctx) => {
  validateUniqueSections(value.sections, ctx);
});

export const updateExamPackageSchema = updateExamPackageInputSchema.superRefine((value, ctx) => {
  validateUniqueSections(value.sections, ctx);
});

type CreateExamPackageInput = z.infer<typeof createExamPackageSchema>;
type UpdateExamPackageInput = z.infer<typeof updateExamPackageSchema>;

const createPackageCode = () => {
  const timestamp = new Date().toISOString().replace(/[-:TZ.]/g, "").slice(0, 14);
  const randomSuffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `PKT-${timestamp}-${randomSuffix}`;
};

const createSectionId = (subtestId: SubtestCode) => {
  const randomSuffix = Math.random().toString(36).slice(2, 8);
  return `section-${subtestId.toLowerCase()}-${randomSuffix}`;
};

const normalizeQuestionIds = (questionIds: string[]) => {
  return Array.from(
    new Set(
      questionIds
        .map((questionId) => questionId.trim())
        .filter(Boolean),
    ),
  );
};

const buildSections = (
  sections: CreateExamPackageInput["sections"] | UpdateExamPackageInput["sections"],
) => {
  return (sections ?? []).map<PackageSection>((section: z.infer<typeof packageSectionInputSchema>) => {
    const questionIds = normalizeQuestionIds(section.questionIds ?? []);

    return {
      id: createSectionId(section.subtestId),
      subtestId: section.subtestId,
      subtestName: SUBTEST_NAME_BY_ID[section.subtestId],
      questionIds,
      questionCount: section.questionCount ?? questionIds.length,
    };
  });
};

const computeTotalQuestions = (sections: PackageSection[]) => {
  return sections.reduce((total, section) => total + section.questionCount, 0);
};

async function ensureDbFile() {
  await mkdir(DB_DIRECTORY, { recursive: true });

  try {
    await readFile(DB_FILE, "utf-8");
  } catch {
    const initialData: ExamPackageDatabase = { packages: [] };
    await writeFile(DB_FILE, JSON.stringify(initialData, null, 2), "utf-8");
  }
}

async function readDb(): Promise<ExamPackageDatabase> {
  await ensureDbFile();
  const raw = await readFile(DB_FILE, "utf-8");
  return JSON.parse(raw) as ExamPackageDatabase;
}

async function writeDb(data: ExamPackageDatabase) {
  await ensureDbFile();
  await writeFile(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export async function listExamPackages(filters?: {
  status?: PackageStatus;
  subtestId?: SubtestCode;
}) {
  const db = await readDb();

  return db.packages.filter((examPackage) => {
    const matchesStatus = !filters?.status || examPackage.status === filters.status;
    const matchesSubtest =
      !filters?.subtestId ||
      examPackage.sections.some((section) => section.subtestId === filters.subtestId);

    return matchesStatus && matchesSubtest;
  });
}

export async function getExamPackageById(id: string) {
  const db = await readDb();
  return db.packages.find((examPackage) => examPackage.id === id) ?? null;
}

export async function createExamPackage(input: CreateExamPackageInput) {
  const db = await readDb();
  const sections = buildSections(input.sections);
  const now = new Date().toISOString();

  const newPackage: ExamPackage = {
    id: crypto.randomUUID(),
    code: createPackageCode(),
    title: input.title.trim(),
    description: input.description.trim(),
    status: input.status,
    difficultyProfile: input.difficultyProfile,
    durationMinutes: input.durationMinutes,
    year: input.year ?? null,
    tags: normalizeQuestionIds(input.tags),
    totalQuestions: computeTotalQuestions(sections),
    sections,
    createdAt: now,
    updatedAt: now,
  };

  db.packages.unshift(newPackage);
  await writeDb(db);

  return newPackage;
}

export async function updateExamPackage(id: string, input: UpdateExamPackageInput) {
  const db = await readDb();
  const index = db.packages.findIndex((examPackage) => examPackage.id === id);

  if (index === -1) {
    return null;
  }

  const existingPackage = db.packages[index];
  const nextSections = input.sections ? buildSections(input.sections) : existingPackage.sections;

  const updatedPackage: ExamPackage = {
    ...existingPackage,
    title: input.title?.trim() ?? existingPackage.title,
    description: input.description?.trim() ?? existingPackage.description,
    status: input.status ?? existingPackage.status,
    difficultyProfile: input.difficultyProfile ?? existingPackage.difficultyProfile,
    durationMinutes: input.durationMinutes ?? existingPackage.durationMinutes,
    year: input.year === undefined ? existingPackage.year : input.year,
    tags: input.tags ? normalizeQuestionIds(input.tags) : existingPackage.tags,
    sections: nextSections,
    totalQuestions: computeTotalQuestions(nextSections),
    updatedAt: new Date().toISOString(),
  };

  db.packages[index] = updatedPackage;
  await writeDb(db);

  return updatedPackage;
}

export async function deleteExamPackage(id: string) {
  const db = await readDb();
  const nextPackages = db.packages.filter((examPackage) => examPackage.id !== id);

  if (nextPackages.length === db.packages.length) {
    return false;
  }

  await writeDb({ packages: nextPackages });
  return true;
}

export function listSubtests() {
  return SUBTEST_CATALOG;
}
