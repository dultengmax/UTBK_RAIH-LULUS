// app/dashboard/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '@/components/profiles/sidebar';
import OverallSummary from '@/components/profiles/OverallSummary';
import MonthlyPerformance from '@/components/profiles/MonthlyPerformance';
import SubtestAnalysis from '@/components/profiles/SubtestAnalysis';
import TryoutHistory from '@/components/profiles/TryoutHistory';
import StreakAchievements from '@/components/profiles/StreakAchievement';
import { BRAND } from '@/lib/brand';
import { 
  User, 
  MonthlyStat, 
  Subtest, 
  Tryout, 
  Badge, 
  NextTryout 
} from '@/types/dashboard';

// Dummy Data
const DUMMY_DATA = {
  user: {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    targetUniversity: 'SBM ITB',
    targetMajor: 'Teknik Informatika',
    irtScore: 812.50,
    nationalRank: 1234,
    totalParticipants: 50000,
    acceptanceProbability: 75,
    streak: 8
  } as User,

  nextTryout: {
    id: 'to-001',
    name: 'Tryout Nasional SNBT 2024',
    date: '2024-04-15T08:00:00',
    timeRemaining: {
      days: 3,
      hours: 12,
      minutes: 30
    }
  } as NextTryout,

  monthlyStats: [
    { month: 'Oktober 2023', monthShort: 'Okt', irtScore: 650.25, rank: 3450, totalParticipants: 48000 },
    { month: 'November 2023', monthShort: 'Nov', irtScore: 680.50, rank: 2980, totalParticipants: 48500 },
    { month: 'Desember 2023', monthShort: 'Des', irtScore: 720.75, rank: 2450, totalParticipants: 49000 },
    { month: 'Januari 2024', monthShort: 'Jan', irtScore: 755.00, rank: 1890, totalParticipants: 49500 },
    { month: 'Februari 2024', monthShort: 'Feb', irtScore: 785.25, rank: 1560, totalParticipants: 49800 },
    { month: 'Maret 2024', monthShort: 'Mar', irtScore: 812.50, rank: 1234, totalParticipants: 50000 }
  ] as MonthlyStat[],

  subtests: [
    {
      id: 's1',
      name: 'Literasi Bahasa Indonesia',
      category: 'Literasi',
      score: 85,
      maxScore: 100,
      strength: 'strong',
      recommendations: ['Pertahankan konsistensi membaca', 'Perbanyak latihan soal cerita']
    },
    {
      id: 's2',
      name: 'Literasi Bahasa Inggris',
      category: 'Literasi',
      score: 72,
      maxScore: 100,
      strength: 'average',
      recommendations: ['Perbanyak vocabulary', 'Latihan reading comprehension']
    },
    {
      id: 's3',
      name: 'Penalaran Matematika',
      category: 'Penalaran',
      score: 58,
      maxScore: 100,
      strength: 'weak',
      recommendations: [
        'Fokus pada topik Aljabar',
        'Latihan soal cerita matematika',
        'Review konsep dasar statistika'
      ]
    },
    {
      id: 's4',
      name: 'Penalaran Umum',
      category: 'Penalaran',
      score: 78,
      maxScore: 100,
      strength: 'strong',
      recommendations: ['Tingkatkan kecepatan membaca', 'Latihan analogi verbal']
    },
    {
      id: 's5',
      name: 'Pengetahuan Kuantitatif',
      category: 'Kuantitatif',
      score: 62,
      maxScore: 100,
      strength: 'weak',
      recommendations: [
        'Perkuat dasar aritmetika',
        'Latihan soal geometri',
        'Pelajari pola bilangan'
      ]
    },
    {
      id: 's6',
      name: 'Pengetahuan Verbal',
      category: 'Verbal',
      score: 81,
      maxScore: 100,
      strength: 'strong',
      recommendations: ['Perbanyak membaca artikel', 'Latihan sinonim-antonim']
    }
  ] as Subtest[],

  tryouts: [
    {
      id: 'tryout-001',
      name: 'Tryout Nasional SNBT #1',
      date: '2024-03-15',
      irtScore: 812.50,
      nationalRank: 1234,
      totalParticipants: 50000,
      correctPercentage: 82,
      detailsUrl: '/dashboard/tryout/tryout-001'
    },
    {
      id: 'tryout-002',
      name: 'Tryout Sekolah Unggulan',
      date: '2024-03-10',
      irtScore: 785.25,
      nationalRank: 1560,
      totalParticipants: 45000,
      correctPercentage: 78,
      detailsUrl: '/dashboard/tryout/tryout-002'
    },
    {
      id: 'tryout-003',
      name: 'Simulasi SNBT 2024',
      date: '2024-03-01',
      irtScore: 755.00,
      nationalRank: 1890,
      totalParticipants: 42000,
      correctPercentage: 75,
      detailsUrl: '/dashboard/tryout/tryout-003'
    },
    {
      id: 'tryout-004',
      name: 'Tryout PTN Favorit',
      date: '2024-02-20',
      irtScore: 720.75,
      nationalRank: 2450,
      totalParticipants: 40000,
      correctPercentage: 71,
      detailsUrl: '/dashboard/tryout/tryout-004'
    },
    {
      id: 'tryout-005',
      name: 'Prediksi UTBK 2024',
      date: '2024-02-10',
      irtScore: 680.50,
      nationalRank: 2980,
      totalParticipants: 38000,
      correctPercentage: 68,
      detailsUrl: '/dashboard/tryout/tryout-005'
    },
    {
      id: 'tryout-006',
      name: 'Tryout Nasional #2',
      date: '2024-01-28',
      irtScore: 650.25,
      nationalRank: 3450,
      totalParticipants: 35000,
      correctPercentage: 64,
      detailsUrl: '/dashboard/tryout/tryout-006'
    }
  ] as Tryout[],

  badges: [
    {
      id: 'b1',
      name: 'Master Logika',
      icon: '🧠',
      description: 'Nilai sempurna Penalaran Umum',
      unlocked: true,
      unlockedDate: '2024-03-15'
    },
    {
      id: 'b2',
      name: 'Penjaga Waktu',
      icon: '⏰',
      description: 'Selesai tryout 30 menit lebih cepat',
      unlocked: true,
      unlockedDate: '2024-03-10'
    },
    {
      id: 'b3',
      name: 'Konsisten Elite',
      icon: '🔥',
      description: '7 hari streak tryout',
      unlocked: true,
      unlockedDate: '2024-03-12'
    },
    {
      id: 'b4',
      name: 'Literasi Master',
      icon: '📚',
      description: 'Skor literasi > 900',
      unlocked: false
    },
    {
      id: 'b5',
      name: 'Top 1%',
      icon: '🏆',
      description: 'Ranking nasional 100 besar',
      unlocked: false
    },
    {
      id: 'b6',
      name: 'Perfect Score',
      icon: '🎯',
      description: 'Semua jawaban benar',
      unlocked: false
    }
  ] as Badge[]
};

const DashboardPage: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [data, setData] = useState(DUMMY_DATA);

  // Load data from localStorage
  useEffect(() => {
    const loadData = () => {
      try {
        const savedData = localStorage.getItem('dashboardData');
        if (savedData) {
          setData(JSON.parse(savedData));
        } else {
          localStorage.setItem('dashboardData', JSON.stringify(DUMMY_DATA));
        }
      } catch (error) {
        console.error('Error loading data from localStorage:', error);
      }
    };

    loadData();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Background Gradient */}
      <div className="fixed inset-0 bg-linear-to-br from-[#355872] to-[#0f172a]" />
      
      {/* Grid Pattern Overlay */}
      <div 
        className="fixed inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(86, 123, 184, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Sidebar */}
      <Sidebar 
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Main Content */}
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`
          transition-all duration-300 relative
          ${isCollapsed ? 'lg:ml-20' : 'lg:ml-72'}
          p-6 lg:p-8
        `}
      >
        {/* Header */}
        <motion.div
          variants={itemVariants as any}
          className="mb-8"
        >
          <h1 className="text-2xl lg:text-3xl font-bold text-white">
            Welcome back, {data.user.name}! 👋
          </h1>
          <p className="text-white/70 mt-2">
            Ini adalah perkembangan belajarmu. Tetap semangat meraih PTN impian!
          </p>
        </motion.div>

        {/* Dashboard Content */}
        <div className="space-y-8">
          {/* Overall Summary */}
          <motion.div variants={itemVariants as any}>
            <OverallSummary 
              user={data.user} 
              nextTryout={data.nextTryout} 
            />
          </motion.div>

          {/* Monthly Performance */}
          <motion.div variants={itemVariants as any}>
            <MonthlyPerformance data={data.monthlyStats} />
          </motion.div>

          {/* Subtest Analysis */}
          <motion.div variants={itemVariants as any}>
            <SubtestAnalysis data={data.subtests} />
          </motion.div>

          {/* Tryout History */}
          <motion.div variants={itemVariants as any}>
            <TryoutHistory data={data.tryouts} />
          </motion.div>

          {/* Streak & Achievements */}
          <motion.div variants={itemVariants as any}>
            <StreakAchievements 
              streak={data.user.streak} 
              badges={data.badges} 
            />
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer 
          variants={itemVariants as any}
          className="mt-12 pt-8 border-t border-white/10 text-center text-white/50 text-sm"
        >
          <p>&copy; {new Date().getFullYear()} {BRAND.displayName}. Dashboard diperbarui {new Date().toLocaleDateString('id-ID')}.</p>
        </motion.footer>
      </motion.main>
    </div>
  );
};

export default DashboardPage;
