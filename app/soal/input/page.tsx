import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { QuestionForm } from '@/components/question-form'

export default function QuestionInputPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar and Main Layout */}
      <Sidebar />
      <Header />

      {/* Main Content */}
      <main className="pt-20 md:pt-16 md:ml-64 min-h-screen">
        <div className="p-6 md:p-8 max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Input Soal Baru</h1>
            <p className="text-muted-foreground">
              Tambahkan soal tryout UTBK baru dengan format lengkap termasuk pertanyaan, opsi jawaban, dan pembahasan.
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-card rounded-lg border border-border shadow-sm p-8">
            <QuestionForm />
          </div>

          {/* Footer Info */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-secondary/30 rounded-lg p-6 border border-border">
              <h3 className="font-semibold text-foreground mb-2">💡 Tips</h3>
              <p className="text-sm text-muted-foreground">
                Pastikan soal Anda jelas dan unggul dari segi kualitas. Gunakan pembahasan yang terperinci untuk membantu pembelajaran.
              </p>
            </div>

            <div className="bg-secondary/30 rounded-lg p-6 border border-border">
              <h3 className="font-semibold text-foreground mb-2">📋 Format</h3>
              <p className="text-sm text-muted-foreground">
                Setiap soal harus memiliki pertanyaan, lima opsi jawaban, dan satu kunci jawaban yang benar.
              </p>
            </div>

            <div className="bg-secondary/30 rounded-lg p-6 border border-border">
              <h3 className="font-semibold text-foreground mb-2">🎯 Kategori</h3>
              <p className="text-sm text-muted-foreground">
                Pilih kategori yang sesuai dengan jenis soal Anda untuk memudahkan pengorganisasian dan pencarian.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
