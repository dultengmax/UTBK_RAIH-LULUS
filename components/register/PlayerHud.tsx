"use client"

import { motion } from "motion/react"
import {
  Award,
  Flame,
  Goal,
  ShieldCheck,
  Sparkles,
  Star,
  Swords,
  Target,
  Trophy,
} from "lucide-react"

import { REGISTER_STEP_META } from "@/data/registerData"
import {
  ACHIEVEMENTS,
  getLevel,
  getRankTitle,
  getUnlockedAchievementIds,
  MAX_LEVEL,
  MAX_XP,
  XP_PER_LEVEL,
} from "@/data/registerGame"
import { cn } from "@/lib/utils"
import type { RegisterData } from "@/types/register"

interface PlayerHudProps {
  data: RegisterData
  step: number
  xp: number
}

const ACHIEVEMENT_ICONS: Record<string, typeof Award> = {
  "first-step": Sparkles,
  aim: Target,
  focus: Flame,
  ready: ShieldCheck,
  finale: Trophy,
}

export function PlayerHud({ data, step, xp }: PlayerHudProps) {
  const level = getLevel(xp)
  const rankTitle = getRankTitle(level)
  const isMaxLevel = level >= MAX_LEVEL
  const xpIntoLevel = isMaxLevel ? XP_PER_LEVEL : xp % XP_PER_LEVEL
  const levelProgress = isMaxLevel ? 1 : xpIntoLevel / XP_PER_LEVEL
  const unlockedAchievements = getUnlockedAchievementIds(data, step)

  const playerName = data.name.trim() || "Pemain Baru"
  const initial = (data.name.trim()[0] ?? "P").toUpperCase()
  const completedQuests = Math.min(step, REGISTER_STEP_META.length)

  const stats = [
    { icon: Star, label: "Level", value: `${level}`, tint: "text-amber-300" },
    { icon: Sparkles, label: "Total XP", value: `${xp}`, tint: "text-cyan-300" },
    { icon: Swords, label: "Misi", value: `${completedQuests}/${REGISTER_STEP_META.length}`, tint: "text-violet-300" },
  ]

  return (
    <div className="flex h-full flex-col gap-6">
      {/* Kartu pemain */}
      <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl">
        <div className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-violet-500/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-8 size-32 rounded-full bg-cyan-400/25 blur-3xl" />

        <div className="relative flex items-center gap-4">
          <div className="relative">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-400 via-blue-500 to-violet-600 text-2xl font-black text-white shadow-lg shadow-violet-900/40">
              {initial}
            </div>
            <motion.span
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute -bottom-2 -right-2 flex size-7 items-center justify-center rounded-xl border border-white/40 bg-amber-400 font-pixel-display text-xs font-black text-amber-950 shadow-lg"
            >
              {level}
            </motion.span>
          </div>

          <div className="min-w-0">
            <p className="truncate font-pixel text-base font-bold text-white">{playerName}</p>
            <p className="mt-0.5 flex items-center gap-1.5 font-pixel text-sm text-cyan-200/90">
              <Award size={14} /> {rankTitle}
            </p>
          </div>
        </div>

        {/* XP bar */}
        <div className="relative mt-5">
          <div className="mb-2 flex items-center justify-between font-pixel text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">
            <span>Pengalaman</span>
            <span>
              {isMaxLevel ? "MAX" : `${xpIntoLevel}/${XP_PER_LEVEL} XP`}
            </span>
          </div>
          <div className="relative h-3 overflow-hidden rounded-full border border-white/10 bg-black/30">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-cyan-400 via-blue-500 to-violet-500"
              initial={false}
              animate={{ width: `${Math.round(levelProgress * 100)}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            />
            <motion.span
              className="absolute inset-0 rounded-full bg-linear-to-r from-transparent via-white/40 to-transparent"
              animate={{ x: ["-100%", "220%"] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <p className="mt-2 text-[11px] text-white/50">
            {isMaxLevel
              ? `Kamu mencapai level tertinggi. ${MAX_XP} XP terkumpul!`
              : `${XP_PER_LEVEL - xpIntoLevel} XP lagi menuju Level ${level + 1}`}
          </p>
        </div>
      </div>

      {/* Statistik */}
      <div className="grid grid-cols-3 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center backdrop-blur-md"
          >
            <stat.icon className={cn("mx-auto mb-1.5", stat.tint)} size={16} />
            <p className="font-pixel-display text-lg font-black leading-none text-white">{stat.value}</p>
            <p className="mt-1 font-pixel text-[10px] font-semibold uppercase tracking-wider text-white/50">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Misi / quest list */}
      <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
        <p className="mb-3 flex items-center gap-2 font-pixel text-xs font-bold uppercase tracking-[0.2em] text-white/60">
          <Goal size={14} /> Daftar Misi
        </p>
        <ul className="space-y-2">
          {REGISTER_STEP_META.map((mission, index) => {
            const isDone = index < step
            const isActive = index === step

            return (
              <li
                key={mission.id}
                className={cn(
                  "flex items-center gap-3 rounded-xl border px-3 py-2 transition-colors",
                  isActive
                    ? "border-cyan-300/50 bg-cyan-400/10"
                    : isDone
                      ? "border-emerald-400/30 bg-emerald-400/5"
                      : "border-white/10 bg-white/5",
                )}
              >
                <span
                  className={cn(
                    "flex size-6 shrink-0 items-center justify-center rounded-lg font-pixel-display text-[11px] font-black",
                    isActive
                      ? "bg-cyan-400 text-cyan-950"
                      : isDone
                        ? "bg-emerald-400 text-emerald-950"
                        : "bg-white/10 text-white/50",
                  )}
                >
                  {isDone ? (
                    <svg viewBox="0 0 20 20" className="size-3.5" fill="none" aria-hidden="true">
                      <path
                        d="M5 10.5 8.4 14 15 7.5"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </span>
                <span
                  className={cn(
                    "truncate font-pixel text-sm",
                    isActive ? "font-semibold text-white" : isDone ? "text-emerald-100/80" : "text-white/50",
                  )}
                >
                  {mission.label}
                </span>
                {isActive ? (
                  <span className="ml-auto font-pixel text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                    Aktif
                  </span>
                ) : null}
              </li>
            )
          })}
        </ul>
      </div>

      {/* Pencapaian */}
      <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
        <p className="mb-3 flex items-center gap-2 font-pixel text-xs font-bold uppercase tracking-[0.2em] text-white/60">
          <Trophy size={14} /> Pencapaian
        </p>
        <div className="grid grid-cols-5 gap-2">
          {ACHIEVEMENTS.map((achievement) => {
            const unlocked = unlockedAchievements.has(achievement.id)
            const Icon = ACHIEVEMENT_ICONS[achievement.id] ?? Award

            return (
              <motion.div
                key={achievement.id}
                title={`${achievement.label} — ${achievement.description}`}
                animate={{
                  borderColor: unlocked ? "rgba(250,204,21,0.6)" : "rgba(255,255,255,0.1)",
                  backgroundColor: unlocked ? "rgba(250,204,21,0.12)" : "rgba(255,255,255,0.04)",
                }}
                className="relative flex aspect-square items-center justify-center rounded-xl border"
              >
                <Icon
                  size={18}
                  className={unlocked ? "text-amber-300" : "text-white/25"}
                />
                {unlocked ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -right-1 -top-1 flex size-3.5 items-center justify-center rounded-full bg-amber-400"
                  >
                    <svg viewBox="0 0 20 20" className="size-2.5 text-amber-950" fill="none" aria-hidden="true">
                      <path
                        d="M5 10.5 8.4 14 15 7.5"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.span>
                ) : null}
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
