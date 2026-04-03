"use client"

import { motion } from "motion/react"

const statCards = [
  { width: "58%" },
  { width: "52%" },
  { width: "46%" },
  { width: "50%" },
]

const activityRows = [0, 1, 2, 3, 4]
const distributionRows = [0, 1, 2, 3, 4]

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-border/70 bg-card/70 backdrop-blur md:block" />
      <header className="fixed left-0 right-0 top-0 z-10 h-16 border-b border-border/70 bg-background/80 backdrop-blur md:left-64" />

      <main className="min-h-screen pt-20 md:ml-64 md:pt-16">
        <div className="mx-auto max-w-6xl p-6 md:p-8">
          <div className="mb-8 space-y-3">
            <motion.div
              animate={{ width: ["26%", "34%", "26%"] }}
              transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="h-8 rounded-full bg-foreground/12"
            />
            <motion.div
              animate={{ width: ["46%", "58%", "46%"] }}
              transition={{ duration: 2.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="h-4 rounded-full bg-muted"
            />
          </div>

          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {statCards.map((card, index) => (
              <motion.div
                key={`stat-card-${index}`}
                animate={{
                  y: [0, -3, 0],
                  borderColor: [
                    "rgba(0,0,0,0.06)",
                    "rgba(34,211,238,0.18)",
                    "rgba(0,0,0,0.06)",
                  ],
                }}
                transition={{
                  duration: 2.4,
                  delay: index * 0.1,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="rounded-xl border border-border bg-card p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="h-3 w-20 rounded-full bg-muted" />
                    <motion.div
                      animate={{ width: [card.width, "72%", card.width] }}
                      transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                      className="h-7 rounded-full bg-foreground/12"
                    />
                    <div className="h-3 w-28 rounded-full bg-muted" />
                  </div>
                  <div className="flex size-12 items-center justify-center rounded-lg bg-secondary/30">
                    <motion.div
                      animate={{ scale: [0.9, 1.05, 0.9], opacity: [0.45, 0.9, 0.45] }}
                      transition={{
                        duration: 1.8,
                        delay: index * 0.15,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                      className="size-5 rounded-full bg-primary/60"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {[0, 1].map((panel) => (
              <div
                key={`chart-panel-${panel}`}
                className="rounded-xl border border-border bg-card p-6 shadow-sm"
              >
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="h-5 w-36 rounded-full bg-foreground/12" />
                    <div className="h-3 w-24 rounded-full bg-muted" />
                  </div>
                  <div className="h-8 w-20 rounded-full bg-muted" />
                </div>

                <div className="flex h-64 items-end gap-3 rounded-2xl bg-muted/30 p-4">
                  {[44, 72, 58, 84, 62, 90, 68].map((height, index) => (
                    <motion.div
                      key={`bar-${panel}-${index}`}
                      animate={{ scaleY: [0.45, 1, 0.45] }}
                      transition={{
                        duration: 2.2,
                        delay: index * 0.08,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                      style={{ height: `${height}%`, transformOrigin: "bottom center" }}
                      className="flex-1 rounded-t-xl bg-gradient-to-t from-primary/70 to-cyan-300/50"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm lg:col-span-2">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div className="h-5 w-40 rounded-full bg-foreground/12" />
                <div className="h-8 w-24 rounded-full bg-muted" />
              </div>

              <div className="space-y-4">
                {activityRows.map((row) => (
                  <div
                    key={`activity-row-${row}`}
                    className="flex items-start gap-4 border-b border-border pb-4 last:border-b-0"
                  >
                    <motion.div
                      animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.15, 0.9] }}
                      transition={{
                        duration: 1.6,
                        delay: row * 0.08,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                      className="mt-1.5 size-2 rounded-full bg-primary"
                    />

                    <div className="flex-1 space-y-3">
                      <motion.div
                        animate={{ width: ["42%", "70%", "42%"] }}
                        transition={{
                          duration: 2.1,
                          delay: row * 0.06,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                        className="h-4 rounded-full bg-foreground/12"
                      />
                      <motion.div
                        animate={{ width: ["58%", "82%", "58%"] }}
                        transition={{
                          duration: 2.3,
                          delay: row * 0.08,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                        className="h-3 rounded-full bg-muted"
                      />
                    </div>

                    <div className="h-6 w-16 rounded-full bg-secondary/40" />
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div className="h-5 w-36 rounded-full bg-foreground/12" />
                <div className="h-8 w-16 rounded-full bg-muted" />
              </div>

              <div className="space-y-4">
                {distributionRows.map((row) => (
                  <div key={`distribution-row-${row}`} className="space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <motion.div
                        animate={{ width: ["32%", "56%", "32%"] }}
                        transition={{
                          duration: 2.2,
                          delay: row * 0.08,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                        className="h-4 rounded-full bg-foreground/12"
                      />
                      <div className="h-4 w-10 rounded-full bg-muted" />
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted/70">
                      <motion.div
                        animate={{ scaleX: [0.2, 0.82, 0.2] }}
                        transition={{
                          duration: 2,
                          delay: row * 0.1,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                        style={{ transformOrigin: "left center" }}
                        className="h-full rounded-full bg-gradient-to-r from-primary to-cyan-300"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
