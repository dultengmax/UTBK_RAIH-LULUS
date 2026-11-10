import React from "react"
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Press_Start_2P, Silkscreen } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { BRAND } from '@/lib/brand'
import './globals.css'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

const silkscreen = Silkscreen({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-silkscreen',
})

const pressStart = Press_Start_2P({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-press-start',
})

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.siteUrl),
  title: {
    default: BRAND.displayName,
    template: `%s | ${BRAND.displayName}`,
  },
  description: BRAND.description,
  applicationName: BRAND.displayName,
  generator: 'Next.js',
  icons: {
    icon: [
      {
        url: BRAND.logoSrc,
        type: 'image/png',
      },
    ],
    apple: BRAND.logoSrc,
    shortcut: BRAND.logoSrc,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <body
        className={`${geist.variable} ${geistMono.variable} ${silkscreen.variable} ${pressStart.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
