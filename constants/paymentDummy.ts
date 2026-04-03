import {
  type OrderItem,
  type PaymentData,
  type PaymentInstruction,
  type PaymentInstructionHighlight,
} from "@/types/payment"

type ProgramKey = "cpns" | "utbk" | "kedinasan" | "all"

export const PAYMENT_COUNTDOWN_SECONDS = 15 * 60
export const PAYMENT_CONFIRM_DELAY_MS = 2000
export const PAYMENT_QR_SIZE = 200
export const PAYMENT_QR_INNER_SIZE = 180
export const PAYMENT_FALLBACK_ORDER_ID = "TRY-2025-08471"

export const PAYMENT_MERCHANT = {
  name: "Raih Lulus",
  id: "qris@raihlulus.id",
  initials: "RL",
} as const

const PROGRAM_ITEMS: Record<ProgramKey, OrderItem[]> = {
  cpns: [
    {
      id: "cpns-premium",
      name: "Paket CPNS Premium",
      description: "Bank soal TWK, TIU, TKP + analisis skor",
      price: 149000,
    },
    {
      id: "simulasi-cat",
      name: "Simulasi CAT Intensif",
      description: "Latihan real-time dengan pembahasan rinci",
      price: 99000,
    },
    {
      id: "mentoring-cpns",
      name: "Mentoring Strategi Lolos",
      description: "Kelas live mingguan dengan mentor CPNS",
      price: 79000,
    },
  ],
  utbk: [
    {
      id: "utbk-saintek",
      name: "Paket UTBK Saintek",
      description: "Tryout adaptif TPS, TKA, dan ranking nasional",
      price: 79000,
    },
    {
      id: "utbk-bundle",
      name: "Drill Soal Harian",
      description: "Target latihan intensif 30 hari",
      price: 69000,
    },
    {
      id: "konsul-jurusan",
      name: "Konsultasi Jurusan",
      description: "Rekomendasi kampus & strategi passing grade",
      price: 49000,
    },
  ],
  kedinasan: [
    {
      id: "kedinasan-core",
      name: "Paket Kedinasan Core",
      description: "Materi TPA, bahasa, dan karakteristik sekolah",
      price: 89000,
    },
    {
      id: "simulasi-kedinasan",
      name: "Simulasi Seleksi Kedinasan",
      description: "Bank soal dan pembahasan berbasis pola terbaru",
      price: 74000,
    },
    {
      id: "konsultasi-berkas",
      name: "Konsultasi Berkas & Tahapan",
      description: "Pendampingan dokumen hingga final submit",
      price: 59000,
    },
  ],
  all: [
    {
      id: "cpns-premium",
      name: "Paket CPNS Premium",
      description: "Bank soal TWK, TIU, TKP + analisis skor",
      price: 149000,
    },
    {
      id: "utbk-saintek",
      name: "Paket UTBK Saintek",
      description: "Tryout adaptif TPS, TKA, dan ranking nasional",
      price: 79000,
    },
    {
      id: "kedinasan-core",
      name: "Paket Kedinasan Core",
      description: "Materi TPA, bahasa, dan karakteristik sekolah",
      price: 89000,
    },
  ],
}

const PROGRAM_ALIAS: Record<string, ProgramKey> = {
  cpns: "cpns",
  stan: "kedinasan",
  kedinasan: "kedinasan",
  snbt: "utbk",
  utbk: "utbk",
  all: "all",
  "all-access": "all",
}

export const PAYMENT_INSTRUCTIONS: PaymentInstruction[] = [
  {
    id: "1",
    text: "Buka aplikasi mobile banking atau dompet digital",
  },
  {
    id: "2",
    text: "Pilih menu Scan QR atau QRIS",
  },
  {
    id: "3",
    text: "Arahkan kamera ke kode QR di atas",
  },
  {
    id: "4",
    text: "Periksa nominal, lalu konfirmasi pembayaran",
  },
]

export const PAYMENT_INSTRUCTION_HIGHLIGHTS: PaymentInstructionHighlight[] = [
  {
    match: "mobile banking atau dompet digital",
    emphasis: "mobile banking atau dompet digital",
  },
  {
    match: "Scan QR atau QRIS",
    emphasis: "Scan QR atau QRIS",
  },
  {
    match: "kode QR",
    emphasis: "kode QR",
  },
  {
    match: "konfirmasi pembayaran",
    emphasis: "konfirmasi pembayaran",
  },
]

export const formatRupiah = (amount: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount)

export const resolveProgramKey = (program?: string): ProgramKey => {
  if (!program) {
    return "all"
  }

  return PROGRAM_ALIAS[program.toLowerCase()] ?? "all"
}

const computeSubtotal = (items: OrderItem[]) => items.reduce((sum, item) => sum + item.price, 0)

const buildDiscount = (subtotal: number) => Math.round(subtotal * 0.05)

const sanitizeOrderId = (rawOrderId: string) => {
  const fallback = PAYMENT_FALLBACK_ORDER_ID

  if (!rawOrderId || rawOrderId.trim().length < 3) {
    return fallback
  }

  const clean = rawOrderId.trim()
  return clean.toUpperCase().startsWith("TRY-") ? clean.toUpperCase() : `TRY-2025-${clean.toUpperCase()}`
}

export const createPaymentData = (rawOrderId: string, program?: string): PaymentData => {
  const orderId = sanitizeOrderId(rawOrderId)
  const resolvedProgram = resolveProgramKey(program)
  const items = PROGRAM_ITEMS[resolvedProgram]
  const subtotal = computeSubtotal(items)
  const discount = buildDiscount(subtotal)
  const serviceFee = 3000
  const total = subtotal - discount + serviceFee
  const expiresAt = new Date(Date.now() + PAYMENT_COUNTDOWN_SECONDS * 1000)

  return {
    orderId,
    items,
    subtotal,
    discount,
    serviceFee,
    total,
    merchantName: PAYMENT_MERCHANT.name,
    merchantId: PAYMENT_MERCHANT.id,
    expiresAt,
  }
}
