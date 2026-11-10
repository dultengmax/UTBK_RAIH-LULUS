"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Clock3 } from "lucide-react"

import { cn } from "@/lib/utils"
import { type CountdownState } from "@/types/payment"

type CountdownTimerProps = {
  initialSeconds: number
  onStateChange?: (state: CountdownState) => void
}

const formatClock = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`
}

export default function CountdownTimer({ initialSeconds, onStateChange }: CountdownTimerProps) {
  const [seconds, setSeconds] = useState(initialSeconds)
  const expired = seconds <= 0
  const display = useMemo(() => formatClock(seconds), [seconds])

  // Simpan callback terbaru di ref agar efek di bawah tidak ikut berjalan
  // setiap kali parent melakukan re-render.
  const onStateChangeRef = useRef(onStateChange)

  useEffect(() => {
    onStateChangeRef.current = onStateChange
  }, [onStateChange])

  useEffect(() => {
    if (expired) {
      return
    }

    const timer = window.setInterval(() => {
      setSeconds((previous) => Math.max(previous - 1, 0))
    }, 1000)

    return () => window.clearInterval(timer)
  }, [expired])

  useEffect(() => {
    onStateChangeRef.current?.({ seconds, display, expired })
  }, [display, expired, seconds])

  const isUrgent = !expired && seconds <= 60

  return (
    <div
      role="timer"
      aria-live="polite"
      aria-label={expired ? "Waktu pembayaran habis" : `Sisa waktu pembayaran ${display}`}
      className={cn(
        "inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5",
        expired && "border-red-200 bg-red-50 text-red-600",
        isUrgent && "border-red-200 bg-red-50 text-red-600",
        !expired && !isUrgent && "border-amber-200 bg-amber-50 text-amber-700",
      )}
    >
      <Clock3 className={cn("h-3.5 w-3.5", !expired && "animate-pulse")} />
      <span className="hidden text-[11px] font-medium sm:inline">
        {expired ? "Waktu habis" : "Sisa waktu"}
      </span>
      <span className="font-mono text-[13px] font-semibold tabular-nums">
        {expired ? "00:00" : display}
      </span>
    </div>
  )
}
