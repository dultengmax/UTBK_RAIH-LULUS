"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export type PixelColor = [number, number, number]

/** Preset warna siap pakai untuk tema arena game. */
export const PIXEL_PRESETS = {
  arena: {
    from: [8, 15, 40] as PixelColor,
    mid: [56, 110, 220] as PixelColor,
    to: [139, 92, 246] as PixelColor,
  },
  card: {
    from: [2, 6, 23] as PixelColor,
    mid: [37, 99, 235] as PixelColor,
    to: [124, 58, 237] as PixelColor,
  },
  hero: {
    from: [34, 211, 238] as PixelColor,
    mid: [59, 130, 246] as PixelColor,
    to: [139, 92, 246] as PixelColor,
  },
  light: {
    from: [125, 211, 252] as PixelColor,
    mid: [165, 180, 252] as PixelColor,
    to: [196, 181, 253] as PixelColor,
  },
} as const

interface PixelGradientProps {
  className?: string
  cols?: number
  rows?: number
  from?: PixelColor
  mid?: PixelColor
  to?: PixelColor
  /** Opasitas keseluruhan mosaic (0..1). */
  opacity?: number
  /** Memberi pola dither checker agar transisi terasa seperti pixel art. */
  dither?: boolean
}

function clamp(value: number) {
  return Math.max(0, Math.min(255, Math.round(value)))
}

function mix(a: PixelColor, b: PixelColor, t: number): PixelColor {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]
}

/**
 * Gradasi pixel: menyusun grid kotak berwarna yang bertransisi dari `from`
 * ke `mid` ke `to`, sehingga membentuk efek gradasi yang terpixelasi.
 */
export function PixelGradient({
  className,
  cols = 40,
  rows = 24,
  from = PIXEL_PRESETS.arena.from,
  mid = PIXEL_PRESETS.arena.mid,
  to = PIXEL_PRESETS.arena.to,
  opacity = 1,
  dither = true,
}: PixelGradientProps) {
  const key = `${cols}-${rows}-${from.join()}-${mid.join()}-${to.join()}-${dither}`

  const cells = React.useMemo(() => {
    const list: React.ReactNode[] = []
    const maxX = Math.max(cols - 1, 1)
    const maxY = Math.max(rows - 1, 1)

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const t = (x / maxX + y / maxY) / 2
        const color = t < 0.5 ? mix(from, mid, t / 0.5) : mix(mid, to, (t - 0.5) / 0.5)
        const factor = dither ? ((x + y) % 2 === 0 ? 1.14 : 0.86) : 1

        list.push(
          <rect
            key={`${x}-${y}`}
            x={x}
            y={y}
            width={1.05}
            height={1.05}
            fill={`rgb(${clamp(color[0] * factor)},${clamp(color[1] * factor)},${clamp(color[2] * factor)})`}
          />,
        )
      }
    }

    return list
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${cols} ${rows}`}
      preserveAspectRatio="none"
      shapeRendering="crispEdges"
      className={cn("h-full w-full", className)}
      style={{ opacity }}
    >
      {cells}
    </svg>
  )
}
