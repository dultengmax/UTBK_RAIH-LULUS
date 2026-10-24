import { NextRequest, NextResponse } from "next/server"

import { listPrograms, listSubtests } from "@/lib/exam-package-store"
import { PROGRAM_IDS } from "@/types/exam-package"

export const runtime = "nodejs"

export async function GET(request: NextRequest) {
  const programId = request.nextUrl.searchParams.get("programId")
  const selectedProgramId = PROGRAM_IDS.includes(programId as (typeof PROGRAM_IDS)[number])
    ? (programId as (typeof PROGRAM_IDS)[number])
    : undefined

  return NextResponse.json({
    data: {
      programs: listPrograms(),
      subtests: listSubtests(selectedProgramId),
    },
  })
}
