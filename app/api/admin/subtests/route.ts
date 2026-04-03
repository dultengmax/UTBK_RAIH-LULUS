import { NextResponse } from "next/server";

import { listSubtests } from "@/lib/exam-package-store";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({
    data: listSubtests(),
  });
}
