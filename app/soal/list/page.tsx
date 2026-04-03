'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Plus, Trash2, Edit, Eye } from 'lucide-react'
import Link from 'next/link'

export default function QuestionListPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [difficultyFilter, setDifficultyFilter] = useState('all')

  const questions = [
    {
      id: 1,
      number: 'UTBK-001',
      question: 'Jika x + 2y = 10 dan 3x - y = 5, maka nilai x adalah...',
      category: 'Matematika',
      difficulty: 'Medium',
      createdBy: 'Admin User',
      createdAt: '2024-01-15',
      status: 'Dipublikasikan',
    },
    {
      id: 2,
      number: 'UTBK-002',
      question: 'Berapa kecepatan cahaya dalam vakum?',
      category: 'Fisika',
      difficulty: 'Easy',
      createdBy: 'Editor User',
      createdAt: '2024-01-14',
      status: 'Draft',
    },
    {
      id: 3,
      number: 'UTBK-003',
      question: 'Senyawa apa yang terbentuk dari reaksi asam dan basa?',
      category: 'Kimia',
      difficulty: 'Medium',
      createdBy: 'Admin User',
      createdAt: '2024-01-13',
      status: 'Dipublikasikan',
    },
    {
      id: 4,
      number: 'UTBK-004',
      question: 'Proses fotosintesis terjadi di bagian mana dalam sel tumbuhan?',
      category: 'Biologi',
      difficulty: 'Easy',
      createdBy: 'Editor User',
      createdAt: '2024-01-12',
      status: 'Dipublikasikan',
    },
    {
      id: 5,
      number: 'UTBK-005',
      question: 'Integrasikan fungsi f(x) = 2x³ + 3x²',
      category: 'Matematika',
      difficulty: 'Hard',
      createdBy: 'Admin User',
      createdAt: '2024-01-11',
      status: 'Dipublikasikan',
    },
  ]

  const filteredQuestions = questions.filter((q) => {
    const matchSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase()) || q.number.includes(searchTerm)
    const matchCategory = categoryFilter === 'all' || q.category === categoryFilter
    const matchDifficulty = difficultyFilter === 'all' || q.difficulty === difficultyFilter
    return matchSearch && matchCategory && matchDifficulty
  })

  const getDifficultyColor = (difficulty: string) => {
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

  const getStatusColor = (status: string) => {
    return status === 'Dipublikasikan' ? 'bg-primary/20 text-primary' : 'bg-secondary/20 text-secondary'
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Header />

      {/* Main Content */}
      <main className="pt-20 md:pt-16 md:ml-64 min-h-screen">
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Daftar Soal</h1>
              <p className="text-muted-foreground">Kelola semua soal tryout UTBK Anda di sini.</p>
            </div>
            <Link href="/soal/input">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="w-4 h-4 mr-2" />
                Soal Baru
              </Button>
            </Link>
          </div>

          {/* Filters */}
          <Card className="p-6 bg-card border-border mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Cari soal atau nomor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background border-border text-foreground"
                />
              </div>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="bg-background border-border text-foreground">
                  <SelectValue placeholder="Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  <SelectItem value="Matematika">Matematika</SelectItem>
                  <SelectItem value="Fisika">Fisika</SelectItem>
                  <SelectItem value="Kimia">Kimia</SelectItem>
                  <SelectItem value="Biologi">Biologi</SelectItem>
                </SelectContent>
              </Select>

              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger className="bg-background border-border text-foreground">
                  <SelectValue placeholder="Tingkat Kesulitan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Tingkat</SelectItem>
                  <SelectItem value="Easy">Mudah</SelectItem>
                  <SelectItem value="Medium">Sedang</SelectItem>
                  <SelectItem value="Hard">Sulit</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="border-border text-foreground hover:bg-secondary bg-transparent">
                Reset Filter
              </Button>
            </div>
          </Card>

          {/* Questions Table */}
          <Card className="bg-card border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary/20 border-b border-border">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Nomor</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Pertanyaan</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Kategori</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Tingkat</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Tanggal</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredQuestions.map((question) => (
                    <tr key={question.id} className="border-b border-border hover:bg-secondary/10 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-foreground">{question.number}</td>
                      <td className="px-6 py-4 text-sm text-foreground max-w-xs truncate">{question.question}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{question.category}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getDifficultyColor(question.difficulty)}`}>
                          {question.difficulty}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(question.status)}`}>
                          {question.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{question.createdAt}</td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredQuestions.length === 0 && (
              <div className="p-12 text-center">
                <p className="text-muted-foreground mb-2">Tidak ada soal yang cocok dengan filter Anda.</p>
                <Link href="/soal/input">
                  <Button variant="outline" className="border-border text-foreground hover:bg-secondary bg-transparent">
                    Tambah Soal Baru
                  </Button>
                </Link>
              </div>
            )}
          </Card>

          {/* Pagination */}
          {filteredQuestions.length > 0 && (
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Menampilkan {filteredQuestions.length} dari {questions.length} soal
              </p>
              <div className="flex gap-2">
                <Button variant="outline" className="border-border text-foreground hover:bg-secondary bg-transparent">
                  Sebelumnya
                </Button>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">1</Button>
                <Button variant="outline" className="border-border text-foreground hover:bg-secondary bg-transparent">
                  2
                </Button>
                <Button variant="outline" className="border-border text-foreground hover:bg-secondary bg-transparent">
                  Berikutnya
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
