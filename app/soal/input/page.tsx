import { Header } from '@/components/header'
import { QuestionForm } from '@/components/question-form'
import { Sidebar } from '@/components/sidebar'

export default function QuestionInputPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Header />

      <main className="min-h-screen pt-20 md:ml-64 md:pt-16">
        <div className="mx-auto max-w-6xl p-6 md:p-8">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold text-foreground">Input Soal Baru</h1>
            <p className="text-muted-foreground">
              Tambahkan soal baru dengan alur Program - Paket - Subtest agar bank soal lebih terstruktur.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-8 shadow-sm">
            <QuestionForm />
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-border bg-secondary/30 p-6">
              <h3 className="mb-2 font-semibold text-foreground">Tips</h3>
              <p className="text-sm text-muted-foreground">
                Pastikan materi soal sesuai subtest yang dipilih, lalu berikan pembahasan yang mudah dipahami.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-secondary/30 p-6">
              <h3 className="mb-2 font-semibold text-foreground">Format</h3>
              <p className="text-sm text-muted-foreground">
                Setiap soal perlu pertanyaan, lima opsi jawaban, satu kunci jawaban, dan waktu pengerjaan.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-secondary/30 p-6">
              <h3 className="mb-2 font-semibold text-foreground">Kategori</h3>
              <p className="text-sm text-muted-foreground">
                Gunakan urutan Program, Paket, lalu Subtest supaya proses review dan pencarian soal makin cepat.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
