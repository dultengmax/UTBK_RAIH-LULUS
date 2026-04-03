"use client"
import { motion } from "motion/react";
import { Trophy, Medal, ArrowUpRight, Crown, Flame } from "lucide-react";

const topRankers = [
  { id: 1, name: "Zuhal Rizky", school: "SMAN 8 Jakarta", score: 842.50, avatar: "https://i.pravatar.cc/150?u=1", rank: 1 },
  { id: 2, name: "Alysia Putri", school: "SMAN 3 Bandung", score: 815.20, avatar: "https://i.pravatar.cc/150?u=2", rank: 2 },
  { id: 3, name: "Dimas Anggara", school: "MAN 2 Malang", score: 798.10, avatar: "https://i.pravatar.cc/150?u=3", rank: 3 },
];

const otherRankers = [
  { id: 4, name: "Siti Aminah", school: "SMA Kristen 1 Solo", score: 765.40, rank: 4 },
  { id: 5, name: "Fadhil Muhammad", school: "SMAN 1 Yogyakarta", score: 752.00, rank: 5 },
  { id: 6, name: "Jessica Veranda", school: "SMAN 70 Jakarta", score: 748.80, rank: 6 },
  { id: 7, name: "Kevin Sanjaya", school: "SMA Petra Surabaya", score: 740.15, rank: 7 },
];

const LeaderboardSection = () => {
  return (
    <section className="py-24 bg-[#0a192f] relative overflow-hidden">
      {/* Glow Effect Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            className="flex justify-center mb-4"
          >
            <div className="bg-amber-500/10 border border-amber-500/20 px-4 py-1 rounded-full flex items-center space-x-2">
              <Flame size={16} className="text-amber-500" />
              <span className="text-amber-500 text-xs font-bold uppercase tracking-widest">Live Ranking 2026</span>
            </div>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Panggung Para <span className="text-blue-500 italic">Juara.</span>
          </h2>
          <p className="text-gray-400">
            Daftar siswa dengan skor tertinggi berdasarkan simulasi IRT terbaru. Apakah nama kamu selanjutnya yang ada di sini?
          </p>
        </div>

        {/* TOP 3 PODIUM */}
        <div className="flex flex-col lg:flex-row items-end justify-center gap-6 mb-12">
          {/* Rank 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.2 }}
            className="w-full lg:w-64 bg-white/5 border border-white/10 p-6 rounded-3xl text-center order-2 lg:order-1 lg:h-80 flex flex-col justify-center items-center"
          >
            <div className="relative mb-4">
              <img src={topRankers[1].avatar} className="w-20 h-20 rounded-full border-4 border-gray-400/50" alt="" />
              <div className="absolute -bottom-2 -right-2 bg-gray-400 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">2</div>
            </div>
            <h3 className="text-white font-bold truncate w-full">{topRankers[1].name}</h3>
            <p className="text-gray-500 text-xs mb-3">{topRankers[1].school}</p>
            <div className="text-2xl font-black text-gray-300">{topRankers[1].score}</div>
          </motion.div>

          {/* Rank 1 (The King) */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="w-full lg:w-72 bg-gradient-to-b from-blue-600/20 to-transparent border border-blue-500/30 p-8 rounded-t-[3rem] rounded-b-3xl text-center order-1 lg:order-2 lg:h-[24rem] flex flex-col justify-center items-center shadow-[0_0_40px_-15px_rgba(59,130,246,0.5)] relative"
          >
            <div className="absolute -top-6 text-amber-500 animate-bounce">
              <Crown size={48} fill="currentColor" />
            </div>
            <div className="relative mb-4">
              <img src={topRankers[0].avatar} className="w-28 h-28 rounded-full border-4 border-blue-500 shadow-lg shadow-blue-500/20" alt="" />
              <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl">1</div>
            </div>
            <h3 className="text-xl font-bold text-white truncate w-full">{topRankers[0].name}</h3>
            <p className="text-blue-300/60 text-sm mb-4">{topRankers[0].school}</p>
            <div className="text-4xl font-black text-white">{topRankers[0].score}</div>
            <div className="mt-2 text-blue-400 text-xs font-bold tracking-widest uppercase">Poin IRT</div>
          </motion.div>

          {/* Rank 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.3 }}
            className="w-full lg:w-64 bg-white/5 border border-white/10 p-6 rounded-3xl text-center order-3 lg:order-3 lg:h-72 flex flex-col justify-center items-center"
          >
            <div className="relative mb-4">
              <img src={topRankers[2].avatar} className="w-20 h-20 rounded-full border-4 border-amber-700/50" alt="" />
              <div className="absolute -bottom-2 -right-2 bg-amber-700 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">3</div>
            </div>
            <h3 className="text-white font-bold truncate w-full">{topRankers[2].name}</h3>
            <p className="text-gray-500 text-xs mb-3">{topRankers[2].school}</p>
            <div className="text-2xl font-black text-amber-600">{topRankers[2].score}</div>
          </motion.div>
        </div>

        {/* LIST RANK 4-7 */}
        <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
          {otherRankers.map((user, index) => (
            <motion.div 
              key={user.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-5 border-b border-white/5 hover:bg-white/5 transition-all group"
            >
              <div className="flex items-center space-x-6">
                <span className="text-gray-500 font-bold w-6">{user.rank}</span>
                <div>
                  <h4 className="text-white font-semibold group-hover:text-blue-400 transition-colors">{user.name}</h4>
                  <p className="text-gray-500 text-xs">{user.school}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-white font-mono font-bold">{user.score}</span>
                <ArrowUpRight size={18} className="text-gray-600 group-hover:text-green-500 transition-all" />
              </div>
            </motion.div>
          ))}
          <div className="p-4 bg-blue-600/5 text-center">
            <button className="text-blue-400 text-sm font-bold hover:text-blue-300 transition-colors">
              Lihat Seluruh Peringkat Nasional (50.000+)
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeaderboardSection;
