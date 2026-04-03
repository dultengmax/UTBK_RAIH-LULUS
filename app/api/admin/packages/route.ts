import { NextRequest, NextResponse } from "next/server";

import {
  createExamPackage,
  createExamPackageSchema,
  listExamPackages,
} from "@/lib/exam-package-store";
import { SUBTEST_CODES } from "@/types/exam-package";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const status = request.nextUrl.searchParams.get("status");
  const subtestId = request.nextUrl.searchParams.get("subtestId");

  const packages = await listExamPackages({
    status: status === "draft" || status === "published" || status === "archived" ? status : undefined,
    subtestId: SUBTEST_CODES.includes(subtestId as (typeof SUBTEST_CODES)[number])
      ? (subtestId as (typeof SUBTEST_CODES)[number])
      : undefined,
  });

  return NextResponse.json({
    data: packages,
    meta: {
      total: packages.length,
    },
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = createExamPackageSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Payload paket soal tidak valid.",
        errors: parsed.error.flatten(),
      },
      { status: 400 },
    );
  }

  const createdPackage = await createExamPackage(parsed.data);

  return NextResponse.json(
    {
      message: "Paket soal berhasil dibuat.",
      data: createdPackage,
    },
    { status: 201 },
  );
}
