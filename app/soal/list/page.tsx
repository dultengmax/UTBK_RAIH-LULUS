'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Edit, Eye, Plus, Search, Trash2 } from 'lucide-react'

import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'
import { MANAGED_QUESTIONS, QUESTION_PACKAGE_OPTIONS } from '@/data/question-management'
import { PROGRAM_CATALOG, PROGRAM_NAME_BY_ID, SUBTEST_BY_ID } from '@/lib/exam-package-catalog'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { ProgramId, SubtestCode } from '@/types/exam-package'

export default function QuestionListPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [programFilter, setProgramFilter] = useState<'all' | ProgramId>('all')
  const [packageFilter, setPackageFilter] = useState<'all' | string>('all')
  const [subtestFilter, setSubtestFilter] = useState<'all' | SubtestCode>('all')
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'Easy' | 'Medium' | 'Hard'>('all')

  const packageMap = useMemo(
    () => Object.fromEntries(QUESTION_PACKAGE_OPTIONS.map((pkg) => [pkg.id, pkg])),
    [],
  )

  const packageOptions = useMemo(() => {
    if (programFilter === 'all') return QUESTION_PACKAGE_OPTIONS
    return QUESTION_PACKAGE_OPTIONS.filter((pkg) => pkg.programId === programFilter)
  }, [programFilter])

  const subtestOptions = useMemo(() => {
    if (packageFilter !== 'all') {
      const selectedPackage = QUESTION_PACKAGE_OPTIONS.find((pkg) => pkg.id === packageFilter)
      return selectedPackage ? selectedPackage.subtestIds.map((subtestId) => SUBTEST_BY_ID[subtestId]) : []
    }

    if (programFilter === 'all') {
      return PROGRAM_CATALOG.flatMap((program) => program.subtests)
    }

    const selectedProgram = PROGRAM_CATALOG.find((program) => program.id === programFilter)
    return selectedProgram?.subtests ?? []
  }, [packageFilter, programFilter])

  const filteredQuestions = useMemo(
    () =>
      MANAGED_QUESTIONS.filter((question) => {
        const packageInfo = packageMap[question.packageId]
        const subtestInfo = SUBTEST_BY_ID[question.subtestId]
        const searchableText = [
          question.number,
          question.question,
          PROGRAM_NAME_BY_ID[question.programId],
          packageInfo?.title ?? '',
          subtestInfo.name,
        ]
          .join(' ')
          .toLowerCase()

        const matchSearch = searchableText.includes(searchTerm.toLowerCase())
        const matchProgram = programFilter === 'all' || question.programId === programFilter
        const matchPackage = packageFilter === 'all' || question.packageId === packageFilter
        const matchSubtest = subtestFilter === 'all' || question.subtestId === subtestFilter
        const matchDifficulty = difficultyFilter === 'all' || question.difficulty === difficultyFilter

        return matchSearch && matchProgram && matchPackage && matchSubtest && matchDifficulty
      }),
    [difficultyFilter, packageFilter, packageMap, programFilter, searchTerm, subtestFilter],
  )

  const handleProgramChange = (value: string) => {
    setProgramFilter(value as 'all' | ProgramId)
    setPackageFilter('all')
    setSubtestFilter('all')
  }

  const handlePackageChange = (value: string) => {
    setPackageFilter(value)
    setSubtestFilter('all')
  }

  const resetFilters = () => {
    setSearchTerm('')
    setProgramFilter('all')
    setPackageFilter('all')
    setSubtestFilter('all')
    setDifficultyFilter('all')
  }

  const getDifficultyColor = (difficulty: 'Easy' | 'Medium' | 'Hard') => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800'
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'Hard':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: 'Dipublikasikan' | 'Draft') =>
    status === 'Dipublikasikan' ? 'bg-primary/20 text-primary' : 'bg-secondary/20 text-secondary'

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Header />

      <main className="min-h-screen pt-20 md:ml-64 md:pt-16">
        <div className="mx-auto max-w-7xl p-6 md:p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-foreground">Daftar Soal</h1>
              <p className="text-muted-foreground">
                Kelola soal berbasis flow Program - Paket - Subtest agar struktur bank soal konsisten.
              </p>
            </div>
            <Link href="/soal/input">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="mr-2 h-4 w-4" />
                Soal Baru
              </Button>
            </Link>
          </div>

          <Card className="mb-6 border-border bg-card p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
              <div className="relative md:col-span-2">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari soal, program, paket, subtest..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-border bg-background pl-10 text-foreground"
                />
              </div>

              <Select value={programFilter} onValueChange={handleProgramChange}>
                <SelectTrigger className="border-border bg-background text-foreground">
                  <SelectValue placeholder="Program" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Program</SelectItem>
                  {PROGRAM_CATALOG.map((program) => (
                    <SelectItem key={program.id} value={program.id}>
                      {program.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={packageFilter} onValueChange={handlePackageChange}>
                <SelectTrigger className="border-border bg-background text-foreground">
                  <SelectValue placeholder="Paket" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Paket</SelectItem>
                  {packageOptions.map((pkg) => (
                    <SelectItem key={pkg.id} value={pkg.id}>
                      {pkg.code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={subtestFilter} onValueChange={(value) => setSubtestFilter(value as 'all' | SubtestCode)}>
                <SelectTrigger className="border-border bg-background text-foreground">
                  <SelectValue placeholder="Subtest" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Subtest</SelectItem>
                  {subtestOptions.map((subtest) => (
                    <SelectItem key={subtest.id} value={subtest.id}>
                      {subtest.code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={difficultyFilter} onValueChange={(value) => setDifficultyFilter(value as 'all' | 'Easy' | 'Medium' | 'Hard')}>
                <SelectTrigger className="border-border bg-background text-foreground">
                  <SelectValue placeholder="Tingkat" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Tingkat</SelectItem>
                  <SelectItem value="Easy">Mudah</SelectItem>
                  <SelectItem value="Medium">Sedang</SelectItem>
                  <SelectItem value="Hard">Sulit</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mt-4 flex justify-end">
              <Button variant="outline" className="border-border bg-transparent text-foreground hover:bg-secondary" onClick={resetFilters}>
                Reset Filter
              </Button>
            </div>
          </Card>

          <Card className="overflow-hidden border-border bg-card">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border bg-secondary/20">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Nomor</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Pertanyaan</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Program</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Paket</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Subtest</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Tingkat</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Tanggal</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredQuestions.map((question) => {
                    const packageInfo = packageMap[question.packageId]
                    const subtest = SUBTEST_BY_ID[question.subtestId]

                    return (
                      <tr key={question.id} className="border-b border-border transition-colors hover:bg-secondary/10">
                        <td className="px-6 py-4 text-sm font-medium text-foreground">{question.number}</td>
                        <td className="max-w-xs truncate px-6 py-4 text-sm text-foreground">{question.question}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{PROGRAM_NAME_BY_ID[question.programId]}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{packageInfo?.code ?? question.packageId}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {subtest.code} - {subtest.name}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getDifficultyColor(question.difficulty)}`}>
                            {question.difficulty}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(question.status)}`}>
                            {question.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{question.createdAt}</td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {filteredQuestions.length === 0 && (
              <div className="p-12 text-center">
                <p className="mb-2 text-muted-foreground">Tidak ada soal yang cocok dengan filter Anda.</p>
                <Link href="/soal/input">
                  <Button variant="outline" className="border-border bg-transparent text-foreground hover:bg-secondary">
                    Tambah Soal Baru
                  </Button>
                </Link>
              </div>
            )}
          </Card>

          {filteredQuestions.length > 0 && (
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Menampilkan {filteredQuestions.length} dari {MANAGED_QUESTIONS.length} soal
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
