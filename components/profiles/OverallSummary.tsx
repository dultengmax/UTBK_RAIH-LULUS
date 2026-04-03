// app/dashboard/components/OverallSummary.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Calendar,
  Users,
  Award,
  Clock
} from 'lucide-react';
import { User, NextTryout } from '@/types/dashboard';

interface OverallSummaryProps {
  user: User;
  nextTryout: NextTryout;
}

const OverallSummary: React.FC<OverallSummaryProps> = ({ user, nextTryout }) => {
  const formatNumber = (num: number): string => {
    return num.toLocaleString('id-ID');
  };

  const cards = [
    {
      title: 'IRT Score',
      value: user.irtScore.toFixed(2),
      icon: TrendingUp,
      change: '+12.5',
      trend: 'up',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      title: 'National Rank',
      value: `#${formatNumber(user.nationalRank)}`,
      subtitle: `dari ${formatNumber(user.totalParticipants)} peserta`,
      icon: Users,
      change: '-123',
      trend: 'down',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      title: 'Target',
      value: user.targetMajor,
      subtitle: user.targetUniversity,
      icon: Target,
      progress: user.acceptanceProbability,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Next Tryout',
      value: nextTryout.name,
      subtitle: new Date(nextTryout.date).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      icon: Calendar,
      countdown: `${nextTryout.timeRemaining.days}h ${nextTryout.timeRemaining.hours}j`,
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="grid grid-cols-2  md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -4 }}
        >
          <Card className="relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 text-white h-full">
            {/* Gradient Background */}
            <div className={`absolute inset-0 bg-linear-to-br ${card.color} opacity-10`} />
            
            {/* Glassmorphism Effect */}
            <div className="absolute inset-0 backdrop-blur-xl bg-white/5" />
            
            <CardContent className="relative p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-white/70">{card.title}</span>
                <div className={`p-2 rounded-lg bg-linear-to-r ${card.color} bg-opacity-20`}>
                  <card.icon className="h-5 w-5 text-white" />
                </div>
              </div>

              {/* Main Content */}
              <div className="space-y-2">
                <div className="text-2xl font-bold">{card.value}</div>
                
                {card.subtitle && (
                  <div className="text-sm text-white/70">{card.subtitle}</div>
                )}

                {card.progress !== undefined && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Peluang</span>
                      <span className="font-semibold text-emerald-400">{card.progress}%</span>
                    </div>
                    <Progress 
                      value={card.progress}
                      className="h-2 bg-white/10"
                      // indicatorClassName is not a valid prop; instead, extend the Progress component if custom styling needed,
                      // or provide a valid styling mechanism as per the Progress component API.
                    />
                  </div>
                )}

                {card.countdown && (
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-white/70" />
                    <span className="text-white/70">{card.countdown} lagi</span>
                  </div>
                )}

                {card.change && (
                  <div className={`flex items-center gap-1 text-sm ${
                    card.trend === 'up' ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {card.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    <span>{card.change}</span>
                    <span className="text-white/50 ml-1">dari bulan lalu</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default OverallSummary;