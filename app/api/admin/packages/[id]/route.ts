import { NextRequest, NextResponse } from "next/server"

import {
  deleteExamPackage,
  getExamPackageById,
  updateExamPackage,
  updateExamPackageSchema,
} from "@/lib/exam-package-store"

export const runtime = "nodejs"

type RouteContext = {
  params: Promise<{
    id: string
  }>
}

export async function GET(_: NextRequest, context: RouteContext) {
  const { id } = await context.params
  const examPackage = await getExamPackageById(id)

  if (!examPackage) {
    return NextResponse.json({ message: "Paket soal tidak ditemukan." }, { status: 404 })
  }

  return NextResponse.json({ data: examPackage })
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const { id } = await context.params
  const body = await request.json()
  const parsed = updateExamPackageSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Payload update paket soal tidak valid.",
        errors: parsed.error.flatten(),
      },
      { status: 400 },
    )
  }

  try {
    const updatedPackage = await updateExamPackage(id, parsed.data)

    if (!updatedPackage) {
      return NextResponse.json({ message: "Paket soal tidak ditemukan." }, { status: 404 })
    }

    return NextResponse.json({
      message: "Paket soal berhasil diperbarui.",
      data: updatedPackage,
    })
  } catch (error) {
    return NextResponse.json(
      {
        message: "Gagal memperbarui paket soal.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 400 },
    )
  }
}

export async function DELETE(_: NextRequest, context: RouteContext) {
  const { id } = await context.params
  const deleted = await deleteExamPackage(id)

  if (!deleted) {
    return NextResponse.json({ message: "Paket soal tidak ditemukan." }, { status: 404 })
  }

  return NextResponse.json({
    message: "Paket soal berhasil dihapus.",
  })
}
