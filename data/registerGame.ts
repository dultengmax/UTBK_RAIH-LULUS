"use client"

import type { RegisterData } from "@/types/register"

/**
 * Model progres bergaya game untuk alur pendaftaran.
 * XP bertambah saat pengguna menyelesaikan langkah/mengisi data penting.
 */
export const MILESTONE_XP = {
  program: 100,
  target: 140,
  weakness: 40,
  account: 40,
  review: 80,
} as const

export const MAX_XP = 600
export const XP_PER_LEVEL = 120
export const MAX_LEVEL = 5

export const RANK_TITLES = [
  "Pemula",
  "Penjelajah",
  "Pejuang PTN",
  "Kandidat Juara",
  "Sang Juara",
] as const

export interface AchievementMeta {
  id: string
  label: string
  description: string
}

export const ACHIEVEMENTS: AchievementMeta[] = [
  { id: "first-step", label: "Langkah Pertama", description: "Memilih program tryout" },
  { id: "aim", label: "Penentu Arah", description: "Menetapkan tujuan spesifik" },
  { id: "focus", label: "Fokus Tajam", description: "Menandai minimal 3 area fokus" },
  { id: "ready", label: "Siap Bertempur", description: "Melengkapi data akun" },
  { id: "finale", label: "Finalis", description: "Sampai ke tahap konfirmasi" },
]

export function computeXp(data: RegisterData, step: number): number {
  let xp = 0

  if (data.program) {
    xp += MILESTONE_XP.program
  }

  if (data.jurusan || data.university) {
    xp += MILESTONE_XP.target
  }

  xp += Math.min(data.weaknesses.length, 3) * MILESTONE_XP.weakness

  const accountFields = [data.name, data.email, data.username, data.password]
  xp += accountFields.filter((value) => value.trim().length > 0).length * MILESTONE_XP.account

  if (step >= 4) {
    xp += MILESTONE_XP.review
  }

  return Math.min(xp, MAX_XP)
}

export function getLevel(xp: number): number {
  return Math.min(Math.max(1, Math.floor(xp / XP_PER_LEVEL) + 1), MAX_LEVEL)
}

export function getRankTitle(level: number): string {
  const clamped = Math.min(Math.max(level, 1), MAX_LEVEL)
  return RANK_TITLES[clamped - 1]
}

export function getUnlockedAchievementIds(data: RegisterData, step: number): Set<string> {
  const unlocked = new Set<string>()
  const accountFields = [data.name, data.email, data.username, data.password]
  const filledAccountFields = accountFields.filter((value) => value.trim().length > 0).length

  if (data.program) {
    unlocked.add("first-step")
  }

  if (data.jurusan || data.university) {
    unlocked.add("aim")
  }

  if (data.weaknesses.length >= 3) {
    unlocked.add("focus")
  }

  if (filledAccountFields === accountFields.length) {
    unlocked.add("ready")
  }

  if (step >= 4) {
    unlocked.add("finale")
  }

  return unlocked
}
