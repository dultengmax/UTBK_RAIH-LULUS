import Link from "next/link"
import { CalendarDays, Clock3, Eye, Layers3, Plus, Tag } from "lucide-react"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { listExamPackages, listPrograms } from "@/lib/exam-package-store"
import type { DifficultyProfile, ExamPackage, PackageStatus } from "@/types/exam-package"

const statusMap: Record<PackageStatus, { label: string; className: string }> = {
  draft: {
    label: "Draft",
    className: "bg-amber-100 text-amber-800",
  },
  published: {
    label: "Published",
    className: "bg-emerald-100 text-emerald-800",
  },
  archived: {
    label: "Archived",
    className: "bg-slate-200 text-slate-700",
  },
}

const difficultyMap: Record<DifficultyProfile, string> = {
  easy: "Mudah",
  medium: "Sedang",
  hard: "Sulit",
  mixed: "Campuran",
}

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value))

const countQuestionsByProgram = (packages: ExamPackage[]) =>
  packages.reduce((total, pkg) => total + pkg.totalQuestions, 0)

export default async function PackagesPage() {
  const [packages, programs] = await Promise.all([listExamPackages(), listPrograms()])

  const publishedPackages = packages.filter((pkg) => pkg.status === "published").length
  const draftPackages = packages.filter((pkg) => pkg.status === "draft").length
  const totalQuestions = packages.reduce((total, pkg) => total + pkg.totalQuestions, 0)

  const groupedPrograms = programs
    .map((program) => ({
      program,
      packages: packages
        .filter((item) => item.programId === program.id)
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()),
    }))
    .filter((entry) => entry.packages.length > 0)

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Header />

      <main className="min-h-screen pt-20 md:ml-64 md:pt-16">
        <div className="mx-auto max-w-6xl p-6 md:p-8">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-foreground">Manajemen Soal Berbasis Program</h1>
              <p className="text-muted-foreground">
                Flow sekarang: <span className="font-medium text-foreground">Program - Paket - Subtest - Soal</span>. Setiap program memiliki paket sendiri, lalu setiap paket berisi subtest beserta jumlah soal.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button asChild variant="outline" className="bg-transparent">
                <Link href="/api/admin/packages">
                  <Eye className="mr-2 h-4 w-4" />
                  Lihat API
                </Link>
              </Button>
              <Button disabled className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="mr-2 h-4 w-4" />
                Buat Paket
              </Button>
            </div>
          </div>

          {groupedPrograms.length > 0 ? (
            <>
              <div className="space-y-8">
                {groupedPrograms.map(({ program, packages: programPackages }) => (
                  <Card key={program.id} className="border-border bg-card p-5 md:p-6">
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{program.code}</p>
                        <h2 className="text-xl font-bold text-foreground">{program.name}</h2>
                        <p className="mt-1 text-sm text-muted-foreground">{program.description}</p>
                      </div>
                      <div className="rounded-lg border border-border bg-secondary/20 px-3 py-2 text-right">
                        <p className="text-xs text-muted-foreground">Total Paket / Soal</p>
                        <p className="text-sm font-semibold text-foreground">
                          {programPackages.length} paket - {countQuestionsByProgram(programPackages)} soal
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                      {programPackages.map((pkg) => (
                        <Card key={pkg.id} className="overflow-hidden border-border bg-background">
                          <div className="border-b border-border bg-secondary/10 p-5">
                            <div className="mb-2 flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                                  {pkg.code}
                                </p>
                                <h3 className="line-clamp-2 text-lg font-bold text-foreground">{pkg.title}</h3>
                              </div>
                              <span className={`shrink-0 rounded-full px-2 py-1 text-xs font-semibold ${statusMap[pkg.status].className}`}>
                                {statusMap[pkg.status].label}
                              </span>
                            </div>
                            <p className="line-clamp-2 text-sm text-muted-foreground">{pkg.description}</p>
                          </div>

                          <div className="space-y-4 p-5">
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <p className="text-xs text-muted-foreground">Total Soal</p>
                                <p className="text-xl font-bold text-foreground">{pkg.totalQuestions}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">Durasi</p>
                                <p className="text-base font-semibold text-primary">{pkg.durationMinutes} menit</p>
                              </div>
                            </div>

                            <div className="rounded-lg border border-border bg-card p-3">
                              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                                Subtest Dalam Paket
                              </p>
                              <div className="space-y-2">
                                {pkg.sections.map((section) => (
                                  <div key={section.id} className="flex items-center justify-between text-sm">
                                    <div className="min-w-0">
                                      <p className="font-medium text-foreground">{section.subtestCode}</p>
                                      <p className="truncate text-xs text-muted-foreground">{section.subtestName}</p>
                                    </div>
                                    <Badge variant="secondary">{section.questionCount} soal</Badge>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 gap-3 border-t border-border pt-3 sm:grid-cols-2">
                              <div className="flex items-start gap-2.5">
                                <Clock3 className="mt-0.5 h-4 w-4 text-muted-foreground" />
                                <div>
                                  <p className="text-xs text-muted-foreground">Tingkat</p>
                                  <p className="text-sm font-medium text-foreground">{difficultyMap[pkg.difficultyProfile]}</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-2.5">
                                <CalendarDays className="mt-0.5 h-4 w-4 text-muted-foreground" />
                                <div>
                                  <p className="text-xs text-muted-foreground">Diperbarui</p>
                                  <p className="text-sm font-medium text-foreground">{formatDate(pkg.updatedAt)}</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-2.5">
                                <Layers3 className="mt-0.5 h-4 w-4 text-muted-foreground" />
                                <div>
                                  <p className="text-xs text-muted-foreground">Jumlah Subtest</p>
                                  <p className="text-sm font-medium text-foreground">{pkg.sections.length} subtest</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-2.5">
                                <Tag className="mt-0.5 h-4 w-4 text-muted-foreground" />
                                <div>
                                  <p className="text-xs text-muted-foreground">Tahun</p>
                                  <p className="text-sm font-medium text-foreground">{pkg.year ?? "Tidak ditentukan"}</p>
                                </div>
                              </div>
                            </div>

                            {pkg.tags.length > 0 ? (
                              <div className="flex flex-wrap gap-2 border-t border-border pt-3">
                                {pkg.tags.map((tag) => (
                                  <Badge key={tag} variant="secondary">
                                    #{tag}
                                  </Badge>
                                ))}
                              </div>
                            ) : null}

                            <div className="border-t border-border pt-3">
                              <Button asChild variant="outline" size="sm" className="w-full bg-transparent">
                                <Link href={`/api/admin/packages/${pkg.id}`}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  Lihat Detail Paket
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>

              <Card className="mt-8 border-border bg-secondary/10 p-6">
                <h3 className="mb-4 font-bold text-foreground">Ringkasan Manajemen</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                  <div>
                    <p className="mb-1 text-sm text-muted-foreground">Total Program Aktif</p>
                    <p className="text-2xl font-bold text-foreground">{groupedPrograms.length}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-sm text-muted-foreground">Total Paket</p>
                    <p className="text-2xl font-bold text-primary">{packages.length}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-sm text-muted-foreground">Published / Draft</p>
                    <p className="text-2xl font-bold text-foreground">
                      {publishedPackages} / <span className="text-amber-600">{draftPackages}</span>
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 text-sm text-muted-foreground">Total Soal</p>
                    <p className="text-2xl font-bold text-foreground">{totalQuestions}</p>
                  </div>
                </div>
              </Card>
            </>
          ) : (
            <Card className="border-border bg-card p-12 text-center">
              <p className="mb-4 text-muted-foreground">Belum ada paket pada manajemen soal.</p>
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/api/admin/packages">
                  <Eye className="mr-2 h-4 w-4" />
                  Cek Endpoint Data
                </Link>
              </Button>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
