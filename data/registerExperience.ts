"use client"

import type { LearningCurvePoint, LearningCurveStat } from "@/types/register"

export const REGISTER_EXPERIENCE_COPY = {
  eyebrow: "Belajar lebih terarah",
  desktopTitle: "Progress belajar dibentuk sejak langkah pendaftaran.",
  mobileTitle: "Kurva belajar ikut naik sejak hari pertama.",
  description:
    "Pilihan program, target, dan area lemah akan membentuk rute belajar yang lebih fokus sehingga progres terasa lebih cepat dan terukur.",
  chartTitle: "Kurva peningkatan peserta aktif",
  chartDescription:
    "Rata-rata kenaikan ini muncul setelah peserta rutin mengikuti latihan terarah sesuai program yang dipilih.",
  chartFooter: "Simulasi progres 6 minggu pertama",
} as const

export const REGISTER_LEARNING_CURVE: LearningCurvePoint[] = [
  { label: "M1", score: 28, accent: "Mulai paham pola soal" },
  { label: "M2", score: 41, accent: "Akurasi mulai stabil" },
  { label: "M3", score: 55, accent: "Ritme belajar terbentuk" },
  { label: "M4", score: 68, accent: "Kecepatan mengerjakan naik" },
  { label: "M5", score: 82, accent: "Fokus materi makin tajam" },
  { label: "M6", score: 94, accent: "Siap masuk fase tryout intensif" },
]

export const REGISTER_LEARNING_STATS: LearningCurveStat[] = [
  {
    label: "Akurasi latihan",
    value: "+32%",
    description: "Naik setelah materi dan subtes dipetakan sejak awal.",
  },
  {
    label: "Waktu adaptasi",
    value: "2x lebih cepat",
    description: "Peserta tidak perlu menebak harus mulai dari topik mana.",
  },
  {
    label: "Konsistensi belajar",
    value: "6 minggu",
    description: "Rute belajar personal membantu ritme tetap terjaga.",
  },
]

export const REGISTER_TRUST_CHIPS = [
  "Responsive untuk mobile sampai desktop",
  "Progress map yang lebih personal",
  "Setup akun selesai dalam beberapa menit",
] as const
