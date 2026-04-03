import Link from 'next/link'
import { CalendarDays, Clock3, Eye, Layers3, Plus, Tag } from 'lucide-react'

import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { listExamPackages } from '@/lib/exam-package-store'
import type { DifficultyProfile, ExamPackage, PackageStatus } from '@/types/exam-package'

const statusMap: Record<PackageStatus, { label: string; className: string }> = {
  draft: {
    label: 'Draft',
    className: 'bg-amber-100 text-amber-800',
  },
  published: {
    label: 'Published',
    className: 'bg-emerald-100 text-emerald-800',
  },
  archived: {
    label: 'Archived',
    className: 'bg-slate-200 text-slate-700',
  },
}

const difficultyMap: Record<DifficultyProfile, string> = {
  easy: 'Mudah',
  medium: 'Sedang',
  hard: 'Sulit',
  mixed: 'Campuran',
}

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value))

const formatSectionSummary = (pkg: ExamPackage) => {
  if (pkg.sections.length <= 2) {
    return pkg.sections.map((section) => section.subtestName).join(', ')
  }

  return `${pkg.sections.slice(0, 2).map((section) => section.subtestName).join(', ')} +${pkg.sections.length - 2} subtes`
}

export default async function PackagesPage() {
  const packages = await listExamPackages()

  const publishedPackages = packages.filter((pkg) => pkg.status === 'published').length
  const draftPackages = packages.filter((pkg) => pkg.status === 'draft').length
  const totalQuestions = packages.reduce((total, pkg) => total + pkg.totalQuestions, 0)

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Header />

      <main className="min-h-screen pt-20 md:ml-64 md:pt-16">
        <div className="mx-auto max-w-6xl p-6 md:p-8">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-foreground">Manajemen Paket</h1>
              <p className="text-muted-foreground">
                Halaman ini sekarang menampilkan data paket asli dari penyimpanan lokal agar langsung terlihat saat localhost dijalankan.
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
                Paket Baru
              </Button>
            </div>
          </div>

          {packages.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {packages.map((pkg) => (
                  <Card key={pkg.id} className="overflow-hidden border-border bg-card transition-shadow hover:shadow-lg">
                    <div className="border-b border-border bg-secondary/10 p-6">
                      <div className="mb-3 flex items-start justify-between gap-3">
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

                      <p className="line-clamp-3 text-sm text-muted-foreground">{pkg.description}</p>
                    </div>

                    <div className="space-y-5 p-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="mb-1 text-xs text-muted-foreground">Total Soal</p>
                          <p className="text-2xl font-bold text-foreground">{pkg.totalQuestions}</p>
                        </div>
                        <div>
                          <p className="mb-1 text-xs text-muted-foreground">Durasi</p>
                          <p className="text-lg font-bold text-primary">{pkg.durationMinutes} menit</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 border-t border-border pt-4 sm:grid-cols-2">
                        <div className="flex items-start gap-3">
                          <Layers3 className="mt-0.5 h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="mb-1 text-xs text-muted-foreground">Cakupan Subtes</p>
                            <p className="text-sm font-medium text-foreground">{formatSectionSummary(pkg)}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Clock3 className="mt-0.5 h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="mb-1 text-xs text-muted-foreground">Tingkat</p>
                            <p className="text-sm font-medium text-foreground">{difficultyMap[pkg.difficultyProfile]}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <CalendarDays className="mt-0.5 h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="mb-1 text-xs text-muted-foreground">Diperbarui</p>
                            <p className="text-sm font-medium text-foreground">{formatDate(pkg.updatedAt)}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Tag className="mt-0.5 h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="mb-1 text-xs text-muted-foreground">Tahun</p>
                            <p className="text-sm font-medium text-foreground">{pkg.year ?? 'Tidak ditentukan'}</p>
                          </div>
                        </div>
                      </div>

                      {pkg.tags.length > 0 ? (
                        <div className="flex flex-wrap gap-2 border-t border-border pt-4">
                          {pkg.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      ) : null}
                    </div>

                    <div className="flex gap-2 border-t border-border bg-secondary/10 p-6">
                      <Button asChild variant="outline" size="sm" className="w-full bg-transparent">
                        <Link href={`/api/admin/packages/${pkg.id}`} className="flex-1">
                          <Eye className="mr-2 h-4 w-4" />
                          Lihat Data
                        </Link>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>

              <Card className="mt-8 border-border bg-secondary/10 p-6">
                <h3 className="mb-4 font-bold text-foreground">Ringkasan Paket</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                  <div>
                    <p className="mb-1 text-sm text-muted-foreground">Total Paket</p>
                    <p className="text-2xl font-bold text-foreground">{packages.length}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-sm text-muted-foreground">Published</p>
                    <p className="text-2xl font-bold text-primary">{publishedPackages}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-sm text-muted-foreground">Draft</p>
                    <p className="text-2xl font-bold text-amber-600">{draftPackages}</p>
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
              <p className="mb-4 text-muted-foreground">Belum ada paket di penyimpanan lokal.</p>
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
