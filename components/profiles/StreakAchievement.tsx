// app/dashboard/components/StreakAchievements.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Flame, 
  Award, 
  Clock, 
  Brain, 
  Target,
  Zap,
  Trophy,
  Lock
} from 'lucide-react';
import { Badge as BadgeType } from '@/types/dashboard';

interface StreakAchievementsProps {
  streak: number;
  badges: BadgeType[];
}

const StreakAchievements: React.FC<StreakAchievementsProps> = ({ streak, badges }) => {
  const streakMilestones = [3, 7, 14, 30, 60, 90];
  const currentStreakLevel = streakMilestones.findIndex(m => m > streak);
  const nextMilestone = streakMilestones[currentStreakLevel];
  const progressToNextMilestone = nextMilestone 
    ? (streak / nextMilestone) * 100 
    : 100;

  const unlockedBadges = badges.filter(b => b.unlocked);
  const lockedBadges = badges.filter(b => !b.unlocked);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card className="bg-white/5 backdrop-blur-xl border border-white/10 text-white">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Award className="h-5 w-5 text-yellow-400" />
            Streak & Achievements
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Streak Card */}
            <div className="relative overflow-hidden rounded-xl bg-linear-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 p-6">
              {/* Background Animation */}
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-orange-500/10 to-red-500/10"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-linear-to-r from-orange-500 to-red-500">
                      <Flame className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-white/70">Tryout Streak</p>
                      <p className="text-3xl font-bold text-white">{streak} Hari</p>
                    </div>
                  </div>
                  <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                    <Zap className="h-3 w-3 mr-1" />
                    {streak} beruntun!
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Progress ke {nextMilestone} hari</span>
                    <span className="font-medium text-orange-400">
                      {nextMilestone ? `${streak}/${nextMilestone}` : 'Maximal'}
                    </span>
                  </div>
                  <Progress 
                    value={progressToNextMilestone} 
                    className="h-2 bg-white/10"
                  />
                </div>

                {/* Milestones */}
                <div className="flex justify-between mt-4">
                  {streakMilestones.map((milestone, idx) => (
                    <div key={milestone} className="text-center">
                      <div 
                        className={`
                          w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-1
                          ${streak >= milestone 
                            ? 'bg-linear-to-r from-orange-500 to-red-500' 
                            : 'bg-white/10'
                          }
                        `}
                      >
                        <Trophy className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-xs text-white/70">{milestone}h</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Badges Grid */}
            <div>
              <h3 className="text-sm font-medium text-white/70 mb-3 flex items-center gap-2">
                <Award className="h-4 w-4" />
                Badge yang Diperoleh
              </h3>
              
              <div className="grid grid-cols-3 gap-3">
                {unlockedBadges.map((badge, index) => (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ y: -4, scale: 1.05 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-linear-to-r from-yellow-500/20 to-amber-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative p-4 rounded-xl bg-linear-to-br from-yellow-500/10 to-amber-500/10 border border-yellow-500/30 text-center">
                      <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-linear-to-r from-yellow-500 to-amber-500 flex items-center justify-center">
                        <Brain className="h-6 w-6 text-white" />
                      </div>
                      <p className="text-sm font-medium text-white">{badge.name}</p>
                      <p className="text-xs text-white/70 mt-1">{badge.description}</p>
                      {badge.unlockedDate && (
                        <p className="text-xs text-emerald-400 mt-1">
                          {new Date(badge.unlockedDate).toLocaleDateString('id-ID')}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}

                {lockedBadges.map((badge, index) => (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * (index + unlockedBadges.length) }}
                    className="relative group"
                  >
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center opacity-50">
                      <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-white/10 flex items-center justify-center">
                        <Lock className="h-6 w-6 text-white/50" />
                      </div>
                      <p className="text-sm font-medium text-white/70">{badge.name}</p>
                      <p className="text-xs text-white/50 mt-1">{badge.description}</p>
                      <p className="text-xs text-blue-400 mt-1">Terkunci</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Motivational Quote */}
          <div className="mt-6 p-4 rounded-lg bg-linear-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/30">
            <p className="text-sm text-white/90 text-center italic">
              "Konsistensi adalah kunci kesuksesan. Dengan {streak} hari tryout beruntun, 
              kamu sudah melangkah lebih jauh dari yang lain. Tetap semangat!"
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StreakAchievements;