"use client"

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react"

import { cn } from "@/lib/utils"

type EnterFrom = "up" | "down" | "left" | "right" | "none"

interface RevealProps {
  children: ReactNode
  /** Arah masuk saat pertama kali terlihat. */
  from?: EnterFrom
  /** Jeda sebelum animasi mulai (detik). */
  delay?: number
  /** Durasi animasi (detik). */
  duration?: number
  /** Terapkan animasi langsung tanpa menunggu masuk viewport. */
  immediate?: boolean
  className?: string
  style?: CSSProperties
  as?: "div" | "span" | "li" | "section"
}

const OFFSETS: Record<EnterFrom, string> = {
  up: "translate3d(0, 14px, 0)",
  down: "translate3d(0, -14px, 0)",
  left: "translate3d(-14px, 0, 0)",
  right: "translate3d(14px, 0, 0)",
  none: "translate3d(0, 0, 0)",
}

/**
 * Animasi masuk ringan berbasis CSS + IntersectionObserver.
 * Tidak memakai library animasi apa pun sehingga tidak menambah bundle JS.
 */
export function Reveal({
  children,
  from = "up",
  delay = 0,
  duration = 0.4,
  immediate = false,
  className,
  style,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(immediate)

  useEffect(() => {
    if (immediate) {
      return
    }

    const node = ref.current
    if (!node) {
      return
    }

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [immediate])

  const Tag = as

  return (
    <Tag
      ref={ref as never}
      className={cn("will-change-transform", className)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate3d(0, 0, 0)" : OFFSETS[from],
        transition: `opacity ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s, transform ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </Tag>
  )
}

export default Reveal
