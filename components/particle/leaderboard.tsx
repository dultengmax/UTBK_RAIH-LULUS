"use client"

import { motion } from "motion/react"
import { ArrowUpRight, Crown, Flame } from "lucide-react"

const topRankers = [
  {
    id: 1,
    name: "Zuhal Rizky",
    school: "SMAN 8 Jakarta",
    score: 842.5,
    avatar: "https://i.pravatar.cc/150?u=1",
    rank: 1,
  },
  {
    id: 2,
    name: "Alysia Putri",
    school: "SMAN 3 Bandung",
    score: 815.2,
    avatar: "https://i.pravatar.cc/150?u=2",
    rank: 2,
  },
  {
    id: 3,
    name: "Dimas Anggara",
    school: "MAN 2 Malang",
    score: 798.1,
    avatar: "https://i.pravatar.cc/150?u=3",
    rank: 3,
  },
]

const otherRankers = [
  { id: 4, name: "Siti Aminah", school: "SMA Kristen 1 Solo", score: 765.4, rank: 4 },
  { id: 5, name: "Fadhil Muhammad", school: "SMAN 1 Yogyakarta", score: 752.0, rank: 5 },
  { id: 6, name: "Jessica Veranda", school: "SMAN 70 Jakarta", score: 748.8, rank: 6 },
  { id: 7, name: "Kevin Sanjaya", school: "SMA Petra Surabaya", score: 740.15, rank: 7 },
]

const LeaderboardSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#0a192f] py-24">
      <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[120px]" />
      <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[120px]" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            className="mb-4 flex justify-center"
          >
            <div className="flex items-center space-x-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1">
              <Flame size={16} className="text-amber-500" />
              <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
                Live Ranking 2026
              </span>
            </div>
          </motion.div>
          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
            Panggung Para <span className="italic text-blue-500">Juara.</span>
          </h2>
          <p className="text-gray-400">
            Daftar siswa dengan skor tertinggi berdasarkan simulasi IRT terbaru. Apakah nama kamu
            selanjutnya yang ada di sini?
          </p>
        </div>

        <div className="mb-12 flex flex-col items-end justify-center gap-6 lg:flex-row">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.2 }}
            className="order-2 flex w-full flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-6 text-center lg:order-1 lg:h-80 lg:w-64"
          >
            <div className="relative mb-4">
              <img
                src={topRankers[1].avatar}
                className="h-20 w-20 rounded-full border-4 border-gray-400/50"
                alt=""
              />
              <div className="absolute -right-2 -bottom-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-400 font-bold text-white">
                2
              </div>
            </div>
            <h3 className="w-full truncate font-bold text-white">{topRankers[1].name}</h3>
            <p className="mb-3 text-xs text-gray-500">{topRankers[1].school}</p>
            <div className="text-2xl font-black text-gray-300">{topRankers[1].score}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="order-1 relative flex w-full flex-col items-center justify-center rounded-t-[3rem] rounded-b-3xl border border-blue-500/30 bg-gradient-to-b from-blue-600/20 to-transparent p-8 text-center shadow-[0_0_40px_-15px_rgba(59,130,246,0.5)] lg:order-2 lg:h-[24rem] lg:w-72"
          >
            <div className="absolute -top-6 text-amber-500 animate-bounce">
              <Crown size={48} fill="currentColor" />
            </div>
            <div className="relative mb-4">
              <img
                src={topRankers[0].avatar}
                className="h-28 w-28 rounded-full border-4 border-blue-500 shadow-lg shadow-blue-500/20"
                alt=""
              />
              <div className="absolute -right-2 -bottom-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-xl font-bold text-white">
                1
              </div>
            </div>
            <h3 className="w-full truncate text-xl font-bold text-white">{topRankers[0].name}</h3>
            <p className="mb-4 text-sm text-blue-300/60">{topRankers[0].school}</p>
            <div className="text-4xl font-black text-white">{topRankers[0].score}</div>
            <div className="mt-2 text-xs font-bold uppercase tracking-widest text-blue-400">
              Poin IRT
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.3 }}
            className="order-3 flex w-full flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-6 text-center lg:h-72 lg:w-64"
          >
            <div className="relative mb-4">
              <img
                src={topRankers[2].avatar}
                className="h-20 w-20 rounded-full border-4 border-amber-700/50"
                alt=""
              />
              <div className="absolute -right-2 -bottom-2 flex h-8 w-8 items-center justify-center rounded-full bg-amber-700 font-bold text-white">
                3
              </div>
            </div>
            <h3 className="w-full truncate font-bold text-white">{topRankers[2].name}</h3>
            <p className="mb-3 text-xs text-gray-500">{topRankers[2].school}</p>
            <div className="text-2xl font-black text-amber-600">{topRankers[2].score}</div>
          </motion.div>
        </div>

        <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-white/5">
          {otherRankers.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: index * 0.1 }}
              className="group flex items-center justify-between border-b border-white/5 p-5 transition-all hover:bg-white/5"
            >
              <div className="flex items-center space-x-6">
                <span className="w-6 font-bold text-gray-500">{user.rank}</span>
                <div>
                  <h4 className="font-semibold text-white transition-colors group-hover:text-blue-400">
                    {user.name}
                  </h4>
                  <p className="text-xs text-gray-500">{user.school}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="font-mono font-bold text-white">{user.score}</span>
                <ArrowUpRight
                  size={18}
                  className="text-gray-600 transition-all group-hover:text-green-500"
                />
              </div>
            </motion.div>
          ))}
          <div className="bg-blue-600/5 p-4 text-center">
            <button className="text-sm font-bold text-blue-400 transition-colors hover:text-blue-300">
              Lihat Seluruh Peringkat Nasional (50.000+)
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LeaderboardSection
