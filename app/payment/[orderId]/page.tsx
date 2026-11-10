"use client"

import { useMemo } from "react"
import Link from "next/link"
import { useParams, useSearchParams } from "next/navigation"
import { motion } from "motion/react"
import { ArrowLeft, Check, ShieldCheck } from "lucide-react"

import { BrandLogo } from "@/components/brand-logo"
import PaymentLayout from "@/components/payment/PaymentLayout"
import { createPaymentData, PAYMENT_FALLBACK_ORDER_ID } from "@/constants/paymentDummy"
import { BRAND } from "@/lib/brand"
import { cn } from "@/lib/utils"

const PAYMENT_STEPS = ["Pilih paket", "Pembayaran", "Selesai"] as const
const ACTIVE_STEP = 1

function PaymentSteps() {
  return (
    <ol
      aria-label="Tahapan pembayaran"
      className="hidden items-center gap-1.5 text-[11px] font-medium sm:flex"
    >
      {PAYMENT_STEPS.map((label, index) => {
        const isDone = index < ACTIVE_STEP
        const isActive = index === ACTIVE_STEP

        return (
          <li key={label} className="flex items-center gap-1.5">
            <span
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold",
                isDone && "bg-emerald-100 text-emerald-700",
                isActive && "bg-sky-600 text-white shadow-sm shadow-sky-600/30",
                !isDone && !isActive && "bg-slate-100 text-slate-400",
              )}
            >
              {isDone ? <Check className="h-3 w-3" strokeWidth={3} /> : index + 1}
            </span>
            <span className={cn("whitespace-nowrap", isActive ? "text-slate-900" : "text-slate-400")}>
              {label}
            </span>
            {index < PAYMENT_STEPS.length - 1 ? (
              <span aria-hidden className="mx-1.5 h-px w-5 bg-slate-200" />
            ) : null}
          </li>
        )
      })}
    </ol>
  )
}

export default function PaymentPage() {
  const params = useParams<{ orderId: string }>()
  const searchParams = useSearchParams()

  const resolvedOrderId =
    typeof params.orderId === "string"
      ? params.orderId
      : Array.isArray(params.orderId)
        ? params.orderId[0]
        : undefined

  const orderId = resolvedOrderId ?? PAYMENT_FALLBACK_ORDER_ID
  const program = searchParams.get("program") ?? undefined

  const payment = useMemo(() => createPaymentData(orderId, program), [orderId, program])

  return (
    <div className="min-h-screen bg-[#f5f9ff]">
      <header className="sticky top-0 z-40 border-b border-sky-100/70 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <BrandLogo size={34} priority />

          <div className="flex items-center gap-2">
            <a
              href={`mailto:${BRAND.supportEmail}`}
              className="hidden text-xs font-medium text-slate-500 transition-colors hover:text-sky-600 sm:inline-flex"
            >
              Butuh bantuan?
            </a>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1.5 rounded-lg border border-sky-100 bg-white px-3 py-2 text-xs font-semibold text-sky-700 transition-colors hover:bg-sky-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Kembali ke paket</span>
              <span className="sm:hidden">Paket</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="relative overflow-x-clip">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(65%_100%_at_50%_0%,rgba(186,230,253,0.5),rgba(245,249,255,0))]"
        />

        <div className="relative mx-auto w-full max-w-6xl px-4 pb-12 pt-8 sm:px-6 sm:pt-10">
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32, ease: "easeOut" }}
            className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"
          >
            <div className="max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-500">
                Pembayaran
              </p>
              <h1 className="mt-2 text-[26px] font-semibold leading-tight tracking-tight text-slate-900 sm:text-3xl">
                Selesaikan pembayaranmu
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-500">
                Pindai kode QRIS di bawah menggunakan e-wallet atau m-banking. Akses tryout aktif
                otomatis setelah pembayaran terverifikasi.
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex min-w-0 items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[11px] font-medium text-slate-500 ring-1 ring-sky-100">
                  <span className="shrink-0 text-slate-400">No. pesanan</span>
                  <span className="truncate font-mono text-[12px] font-semibold text-slate-900">
                    {payment.orderId}
                  </span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1.5 text-[11px] font-medium text-sky-700 ring-1 ring-sky-100">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Pembayaran aman
                </span>
              </div>
            </div>

            <PaymentSteps />
          </motion.section>

          <div className="mt-7 sm:mt-8">
            <PaymentLayout payment={payment} />
          </div>

          <footer className="mt-10 border-t border-sky-100 pt-5">
            <div className="flex flex-col items-center justify-between gap-2 text-center text-[11px] text-slate-400 sm:flex-row sm:text-left">
              <p>
                © {new Date().getFullYear()} {BRAND.displayName} — Transaksi diproses secara aman.
              </p>
              <p>
                Butuh bantuan?{" "}
                <a
                  href={`mailto:${BRAND.supportEmail}`}
                  className="font-medium text-sky-600 hover:underline"
                >
                  {BRAND.supportEmail}
                </a>
              </p>
            </div>
          </footer>
        </div>
      </main>
    </div>
  )
}
