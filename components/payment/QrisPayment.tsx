"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "motion/react"
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
    return <span className="text-[12px] text-sky-400">{text}</span>
  }

  const [before, after] = text.split(rule.match)

  return (
    <span className="text-[12px] text-sky-400">
      {before}
      <strong className="font-semibold text-sky-900">{rule.emphasis}</strong>
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

  const qrValue = useMemo(() => `TRYOUT-${payment.orderId}`, [payment.orderId])

  const qrSource = useMemo(
    () =>
      `https://api.qrserver.com/v1/create-qr-code/?size=${PAYMENT_QR_INNER_SIZE}x${PAYMENT_QR_INNER_SIZE}&data=${encodeURIComponent(
        qrValue
      )}&color=0c4a6e&bgcolor=f0f9ff`,
    [qrValue]
  )

  const handleTimerStateChange = (nextState: CountdownState) => {
    setTimerState(nextState)

    if (nextState.expired && status !== "paid" && status !== "cancelled") {
      setStatus("expired")
    }
  }

  const handleConfirmPayment = async () => {
    if (isExpired || isProcessing || status === "paid") {
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

  const closeSuccessModal = () => {
    setShowSuccess(false)
    router.push("/dashboard")
  }

  return (
    <motion.section
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.07,
            delayChildren: 0.05,
          },
        },
      }}
      className="rounded-xl border border-sky-200 bg-white p-5 md:p-6"
    >
      <motion.div variants={SECTION_VARIANTS}>
        <CountdownTimer initialSeconds={PAYMENT_COUNTDOWN_SECONDS} onStateChange={handleTimerStateChange} />
      </motion.div>

      <AnimatePresence>
        {isExpired ? (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2"
          >
            <p className="text-[12px] text-red-600">
              Pesanan kedaluwarsa. Silakan buat pesanan baru.
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.div variants={SECTION_VARIANTS} className="mt-5 text-center">
        <p className="text-[18px] font-bold uppercase tracking-[0.34em] text-sky-500">
          QRIS<span className="relative -top-2 ml-1 text-[10px] align-top">&reg;</span>
        </p>
      </motion.div>

      <motion.div variants={SECTION_VARIANTS} className="mt-3 flex justify-center">
        <motion.div
          whileHover={{ scale: 1.012 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative flex items-center justify-center rounded-xl border-[1.5px] border-sky-300 bg-sky-50"
          style={{ width: PAYMENT_QR_SIZE, height: PAYMENT_QR_SIZE }}
        >
          <img
            src={qrSource}
            alt={`QRIS pembayaran ${payment.orderId}`}
            width={PAYMENT_QR_INNER_SIZE}
            height={PAYMENT_QR_INNER_SIZE}
            className="h-[180px] w-[180px] rounded-lg object-contain"
          />

          <motion.span
            animate={{ opacity: [0.75, 1, 0.75] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-2 top-2 h-4 w-4 border-l-2 border-t-2 border-sky-500"
          />
          <motion.span
            animate={{ opacity: [0.75, 1, 0.75] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            className="absolute right-2 top-2 h-4 w-4 border-r-2 border-t-2 border-sky-500"
          />
          <motion.span
            animate={{ opacity: [0.75, 1, 0.75] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            className="absolute bottom-2 left-2 h-4 w-4 border-b-2 border-l-2 border-sky-500"
          />
          <motion.span
            animate={{ opacity: [0.75, 1, 0.75] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            className="absolute bottom-2 right-2 h-4 w-4 border-b-2 border-r-2 border-sky-500"
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-md border border-sky-200 bg-white text-[11px] font-bold text-sky-600">
              {PAYMENT_MERCHANT.initials}
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div variants={SECTION_VARIANTS} className="mt-5 flex justify-center">
        <motion.div
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          className="rounded-xl bg-sky-50 px-6 py-3 text-center"
        >
          <p className="text-[11px] text-sky-300">Jumlah yang harus dibayar</p>
          <p className="text-[20px] font-bold tracking-tight text-sky-600">{formatRupiah(payment.total)}</p>
        </motion.div>
      </motion.div>

      <motion.div variants={SECTION_VARIANTS} className="mt-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-sky-500">
          Cara Pembayaran
        </p>
        <ol className="mt-3 space-y-2.5">
          {PAYMENT_INSTRUCTIONS.map((step, index) => (
            <motion.li
              key={step.id}
              initial={{ opacity: 0, y: 7 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.24, delay: 0.03 * index }}
              className="flex items-start gap-2.5"
            >
              <motion.span
                whileHover={{ scale: 1.08 }}
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-100 text-[11px] font-semibold text-sky-600"
              >
                {index + 1}
              </motion.span>
              {renderInstruction(step.text)}
            </motion.li>
          ))}
        </ol>
      </motion.div>

      <motion.div variants={SECTION_VARIANTS} className="mt-6 space-y-2.5">
        <motion.button
          type="button"
          onClick={handleConfirmPayment}
          disabled={isExpired || isProcessing || status === "paid"}
          whileHover={{ scale: isExpired || isProcessing || status === "paid" ? 1 : 1.01 }}
          whileTap={{ scale: isExpired || isProcessing || status === "paid" ? 1 : 0.985 }}
          transition={{ duration: 0.15 }}
          className="flex w-full items-center justify-center rounded-xl bg-sky-500 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-600 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:opacity-40"
        >
          {isProcessing ? (
            <span className="inline-flex items-center gap-2">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="opacity-25"
                />
                <path
                  d="M22 12a10 10 0 0 1-10 10"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="opacity-90"
                />
              </svg>
              Memverifikasi pembayaran...
            </span>
          ) : status === "paid" ? (
            "Pembayaran terkonfirmasi"
          ) : (
            "Saya sudah membayar"
          )}
        </motion.button>

        <motion.button
          type="button"
          onClick={handleCancelOrder}
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.99 }}
          transition={{ duration: 0.15 }}
          className="w-full rounded-xl border border-sky-200 bg-transparent px-4 py-2.5 text-sm font-medium text-sky-600 transition-colors hover:bg-sky-50"
        >
          Batalkan pesanan
        </motion.button>
      </motion.div>

      <motion.div variants={SECTION_VARIANTS} className="mt-5 flex items-center justify-center gap-1.5">
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="text-sky-300"
          aria-hidden="true"
        >
          <path
            d="M7 10V7a5 5 0 0 1 10 0v3M6 10h12v10H6z"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="text-[11px] text-sky-300">Pembayaran aman &amp; terenkripsi</p>
      </motion.div>

      <AnimatePresence>
        {showSuccess ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-sky-900/20 px-4"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full max-w-sm rounded-xl border border-sky-200 bg-white p-5 text-center"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sky-50">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-sky-600">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
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
              <h3 className="mt-3 text-base font-semibold text-sky-900">Pembayaran berhasil diverifikasi</h3>
              <p className="mt-1 text-sm text-sky-400">Pesanan kamu sudah aktif. Selamat belajar bersama Raih Lulus.</p>
              <motion.button
                type="button"
                onClick={closeSuccessModal}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="mt-4 w-full rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sky-600"
              >
                Lanjut ke Dashboard
              </motion.button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.section>
  )
}
