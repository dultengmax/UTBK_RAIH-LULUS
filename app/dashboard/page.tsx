import { Archive, BookOpen, Layers3, Package } from 'lucide-react'

import { ActivityChart } from '@/components/activity-chart'
import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'
import { UniversityChart } from '@/components/university-chart'
import { Card } from '@/components/ui/card'
import { listExamPackages } from '@/lib/exam-package-store'

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value))

export default async function DashboardPage() {
  const packages = await listExamPackages()

  const totalQuestions = packages.reduce((total, pkg) => total + pkg.totalQuestions, 0)
  const publishedPackages = packages.filter((pkg) => pkg.status === 'published').length
  const draftPackages = packages.filter((pkg) => pkg.status === 'draft').length
  const archivedPackages = packages.filter((pkg) => pkg.status === 'archived').length

  const stats = [
    {
      label: 'Total Soal',
      value: totalQuestions.toLocaleString('id-ID'),
      change: `${packages.length} paket dari data lokal`,
      icon: BookOpen,
      color: 'text-primary',
    },
    {
      label: 'Total Paket',
      value: packages.length.toLocaleString('id-ID'),
      change: `${publishedPackages} paket published`,
      icon: Package,
      color: 'text-accent',
    },
    {
      label: 'Paket Draft',
      value: draftPackages.toLocaleString('id-ID'),
      change: 'Siap untuk ditinjau',
      icon: Layers3,
      color: 'text-amber-600',
    },
    {
      label: 'Paket Arsip',
      value: archivedPackages.toLocaleString('id-ID'),
      change: 'Riwayat tersimpan',
      icon: Archive,
      color: 'text-secondary',
    },
  ]

  const subtestStats = Array.from(
    packages.reduce((map, pkg) => {
      pkg.sections.forEach((section) => {
        const current = map.get(section.subtestName) ?? 0
        map.set(section.subtestName, current + section.questionCount)
      })
      return map
    }, new Map<string, number>()),
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  const maxSubtestCount = subtestStats[0]?.[1] ?? 1

  const latestPackages = [...packages]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5)

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Header />

      <main className="min-h-screen pt-20 md:ml-64 md:pt-16">
        <div className="mx-auto max-w-6xl p-6 md:p-8">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">
              Statistik di halaman ini sekarang mengambil data paket asli dari penyimpanan lokal agar langsung terlihat saat localhost dijalankan.
            </p>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <Card key={stat.label} className="border-border bg-card p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="mb-1 text-sm text-muted-foreground">{stat.label}</p>
                      <p className="mb-2 text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.change}</p>
                    </div>
                    <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/20 ${stat.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>

          <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <ActivityChart />
            <UniversityChart />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2 border-border bg-card p-6">
              <h2 className="mb-6 text-xl font-bold text-foreground">Paket Terbaru</h2>
              <div className="space-y-4">
                {latestPackages.length > 0 ? (
                  latestPackages.map((pkg) => (
                    <div key={pkg.id} className="flex items-start gap-4 border-b border-border pb-4 last:border-b-0">
                      <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-foreground">{pkg.title}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {pkg.code} - {pkg.totalQuestions} soal - diperbarui {formatDate(pkg.updatedAt)}
                        </p>
                      </div>
                      <span className="shrink-0 rounded bg-secondary/30 px-2 py-1 text-xs font-medium text-foreground">
                        {pkg.status}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">Belum ada data paket untuk ditampilkan.</p>
                )}
              </div>
            </Card>

            <Card className="border-border bg-card p-6">
              <h2 className="mb-6 text-xl font-bold text-foreground">Distribusi Subtes</h2>
              <div className="space-y-4">
                {subtestStats.length > 0 ? (
                  subtestStats.map(([name, count]) => (
                    <div key={name}>
                      <div className="mb-2 flex items-center justify-between">
                        <p className="text-sm font-medium text-foreground">{name}</p>
                        <p className="text-sm text-muted-foreground">{count}</p>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-border">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${Math.max((count / maxSubtestCount) * 100, 8)}%` }}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">Distribusi subtes akan muncul setelah data paket tersedia.</p>
                )}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
