"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "motion/react"
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Lock,
  ScanLine,
} from "lucide-react"

import CountdownTimer from "@/components/payment/CountdownTimer"
import {
  PAYMENT_CONFIRM_DELAY_MS,
  formatRupiah,
  PAYMENT_COUNTDOWN_SECONDS,
  PAYMENT_INSTRUCTION_HIGHLIGHTS,
  PAYMENT_INSTRUCTIONS,
  PAYMENT_MERCHANT,
  PAYMENT_QR_INNER_SIZE,
  PAYMENT_QR_SIZE,
} from "@/constants/paymentDummy"
import { cn } from "@/lib/utils"
import { type CountdownState, type PaymentData, type PaymentStatus } from "@/types/payment"

type QrisPaymentProps = {
  payment: PaymentData
}

const INITIAL_TIMER_STATE: CountdownState = {
  seconds: PAYMENT_COUNTDOWN_SECONDS,
  display: "15:00",
  expired: false,
}

const SECTION_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

const wait = (milliseconds: number) =>
  new Promise<void>((resolve) => {
    window.setTimeout(() => resolve(), milliseconds)
  })

const renderInstruction = (text: string) => {
  const rule = PAYMENT_INSTRUCTION_HIGHLIGHTS.find((item) => text.includes(item.match))

  if (!rule) {
    return <span className="text-sm leading-relaxed text-slate-600">{text}</span>
  }

  const [before, after] = text.split(rule.match)

  return (
    <span className="text-sm leading-relaxed text-slate-600">
      {before}
      <strong className="font-semibold text-slate-900">{rule.emphasis}</strong>
      {after}
    </span>
  )
}

export default function QrisPayment({ payment }: QrisPaymentProps) {
  const router = useRouter()
  const [timerState, setTimerState] = useState<CountdownState>(INITIAL_TIMER_STATE)
  const [status, setStatus] = useState<PaymentStatus>("pending")
  const [showSuccess, setShowSuccess] = useState(false)

  const isExpired = timerState.expired || status === "expired"
  const isProcessing = status === "processing"
  const isLocked = isExpired || isProcessing || status === "paid"

  const qrValue = useMemo(() => `TRYOUT-${payment.orderId}`, [payment.orderId])

  const qrSource = useMemo(
    () =>
      `https://api.qrserver.com/v1/create-qr-code/?size=${PAYMENT_QR_INNER_SIZE}x${PAYMENT_QR_INNER_SIZE}&data=${encodeURIComponent(
        qrValue
      )}&color=082f49&bgcolor=ffffff`,
    [qrValue]
  )

  const handleTimerStateChange = useCallback((nextState: CountdownState) => {
    setTimerState((previous) =>
      previous.seconds === nextState.seconds && previous.expired === nextState.expired
        ? previous
        : nextState
    )

    if (nextState.expired) {
      setStatus((previous) =>
        previous === "paid" || previous === "cancelled" ? previous : "expired"
      )
    }
  }, [])

  const handleConfirmPayment = async () => {
    if (isLocked) {
      return
    }

    setStatus("processing")
    await wait(PAYMENT_CONFIRM_DELAY_MS)
    setStatus("paid")
    setShowSuccess(true)
  }

  const handleCancelOrder = () => {
    setStatus("cancelled")
    router.push("/pricing")
  }

  const closeSuccessModal = useCallback(() => {
    setShowSuccess(false)
    router.push("/dashboard")
  }, [router])

  useEffect(() => {
    if (!showSuccess) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeSuccessModal()
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [closeSuccessModal, showSuccess])

  return (
    <motion.section
      aria-labelledby="qris-title"
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.07, delayChildren: 0.06 } },
      }}
      className="rounded-2xl border border-sky-100 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_18px_40px_-28px_rgba(2,64,110,0.45)]"
    >
      <motion.div
        variants={SECTION_VARIANTS}
        className="flex flex-wrap items-center justify-between gap-3 border-b border-sky-100/80 px-5 py-4 sm:px-6"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600 ring-1 ring-sky-100">
            <ScanLine size={19} />
          </span>
          <div>
            <h2 id="qris-title" className="text-sm font-semibold text-slate-900">
              Pembayaran QRIS
            </h2>
            <p className="text-[11px] text-slate-400">
              Satu kode untuk semua e-wallet &amp; m-banking
            </p>
          </div>
        </div>

        <CountdownTimer
          initialSeconds={PAYMENT_COUNTDOWN_SECONDS}
          onStateChange={handleTimerStateChange}
        />
      </motion.div>

      <div className="px-5 py-5 sm:px-6 sm:py-6">
        <AnimatePresence initial={false}>
          {isExpired ? (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="mb-5 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-3.5 py-3"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
              <p className="text-[13px] leading-relaxed text-red-700">
                Waktu pembayaran habis. Silakan buat pesanan baru untuk melanjutkan.
              </p>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="grid gap-6 md:grid-cols-[minmax(0,240px)_minmax(0,1fr)] md:gap-7">
          <div className="mx-auto w-full" style={{ maxWidth: PAYMENT_QR_SIZE }}>
            <motion.div
              variants={SECTION_VARIANTS}
              className="relative aspect-square rounded-2xl border border-sky-200 bg-white p-3"
            >
              <img
                src={qrSource}
                alt={`Kode QRIS untuk pesanan ${payment.orderId}`}
                width={PAYMENT_QR_INNER_SIZE}
                height={PAYMENT_QR_INNER_SIZE}
                className="h-full w-full rounded-lg object-contain"
              />

              <span
                aria-hidden
                className="pointer-events-none absolute left-1.5 top-1.5 h-4 w-4 rounded-tl-md border-l-2 border-t-2 border-sky-300"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute right-1.5 top-1.5 h-4 w-4 rounded-tr-md border-r-2 border-t-2 border-sky-300"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-1.5 left-1.5 h-4 w-4 rounded-bl-md border-b-2 border-l-2 border-sky-300"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-1.5 right-1.5 h-4 w-4 rounded-br-md border-b-2 border-r-2 border-sky-300"
              />

              <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-sky-100 bg-white text-[11px] font-bold text-sky-700 shadow-sm">
                  {PAYMENT_MERCHANT.initials}
                </span>
              </span>
            </motion.div>

            <motion.div
              variants={SECTION_VARIANTS}
              className="mt-3 rounded-xl bg-slate-50 px-3.5 py-3 text-center ring-1 ring-slate-100"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                Nominal
              </p>
              <p className="mt-1 text-lg font-semibold tabular-nums text-slate-900">
                {formatRupiah(payment.total)}
              </p>
            </motion.div>

            <p className="mt-3 text-center text-[10px] leading-relaxed text-slate-400">
              GoPay · OVO · DANA · ShopeePay · m-banking
            </p>
          </div>

          <motion.div
            variants={SECTION_VARIANTS}
            className="rounded-xl border border-sky-100 bg-sky-50/40 p-4 sm:p-5"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-600">
              Cara pembayaran
            </p>

            <ol className="mt-3 space-y-3">
              {PAYMENT_INSTRUCTIONS.map((step, index) => (
                <li key={step.id} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-[11px] font-semibold text-sky-700 ring-1 ring-sky-200">
                    {index + 1}
                  </span>
                  {renderInstruction(step.text)}
                </li>
              ))}
            </ol>

            <p className="mt-4 flex items-start gap-2 border-t border-sky-100 pt-3 text-[11px] leading-relaxed text-slate-400">
              <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              Jangan tutup halaman ini sebelum pembayaran selesai diverifikasi.
            </p>
          </motion.div>
        </div>

        <motion.div variants={SECTION_VARIANTS} className="sticky bottom-3 z-20 mt-6 lg:static">
          <div className="rounded-xl border border-sky-100 bg-white/95 p-2 shadow-lg shadow-sky-900/10 backdrop-blur lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none lg:backdrop-blur-none">
            <div className="flex items-center gap-2">
              <motion.button
                type="button"
                onClick={handleConfirmPayment}
                disabled={isLocked}
                aria-busy={isProcessing}
                whileTap={{ scale: isLocked ? 1 : 0.99 }}
                className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-sky-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Memverifikasi…
                  </>
                ) : status === "paid" ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Terkonfirmasi
                  </>
                ) : isExpired ? (
                  "Waktu habis"
                ) : (
                  <>
                    Saya sudah membayar
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </motion.button>

              <motion.button
                type="button"
                onClick={handleCancelOrder}
                whileTap={{ scale: 0.99 }}
                className="inline-flex h-11 shrink-0 items-center justify-center rounded-lg border border-slate-200 px-3 text-xs font-semibold text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 lg:hidden"
              >
                Batalkan
              </motion.button>
            </div>

            <motion.button
              type="button"
              onClick={handleCancelOrder}
              whileHover={{ y: -1 }}
              className="mt-2 hidden h-10 w-full items-center justify-center rounded-lg text-xs font-medium text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-600 lg:flex"
            >
              Batalkan pesanan
            </motion.button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showSuccess ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSuccessModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="payment-success-title"
            className="fixed inset-0 z-50 flex items-end justify-center bg-sky-950/40 p-4 backdrop-blur-sm sm:items-center"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 16 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
              className="w-full max-w-sm rounded-2xl border border-sky-100 bg-white p-6 text-center shadow-2xl"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-emerald-600"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6" />
                  <motion.path
                    d="M7 12.5l3.2 3.2L17 9.4"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                  />
                </svg>
              </div>

              <h3
                id="payment-success-title"
                className="mt-4 text-base font-semibold text-slate-900"
              >
                Pembayaran berhasil
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-500">
                Akses tryout kamu sudah aktif. Selamat belajar bersama Raih Lulus.
              </p>

              <dl className="mt-4 space-y-1.5 rounded-xl bg-slate-50 px-3.5 py-3 text-left text-xs ring-1 ring-slate-100">
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-slate-400">No. pesanan</dt>
                  <dd className="font-mono text-[11px] font-medium text-slate-700">
                    {payment.orderId}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-slate-400">Total dibayar</dt>
                  <dd className="font-semibold tabular-nums text-slate-800">
                    {formatRupiah(payment.total)}
                  </dd>
                </div>
              </dl>

              <motion.button
                type="button"
                onClick={closeSuccessModal}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={cn(
                  "mt-4 h-11 w-full rounded-lg bg-sky-600 px-4 text-sm font-semibold text-white",
                  "transition-colors hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2",
                  "focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                )}
              >
                Lanjut ke dashboard
              </motion.button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.section>
  )
}
