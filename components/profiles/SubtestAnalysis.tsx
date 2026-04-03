// app/dashboard/components/SubtestAnalysis.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  BookOpen, 
  Calculator, 
  Languages, 
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { Subtest } from '@/types/dashboard';

interface SubtestAnalysisProps {
  data: Subtest[];
}

const SubtestAnalysis: React.FC<SubtestAnalysisProps> = ({ data }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const chartData = data.map(item => {
    const scorePercent = (item.score / item.maxScore) * 100;
    return {
      ...item,
      subject: item.name,
      score: scorePercent,
      fullMark: 100,
    };
  });

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-deep-navy/95 backdrop-blur-xl border border-white/10 rounded-lg p-4 text-white shadow-xl">
          <p className="font-medium mb-2">{data.subject}</p>
          <div className="space-y-1 text-sm">
            <p className="text-white/70">
              Skor: <span className="font-semibold text-white">{data.score.toFixed(1)}%</span>
            </p>
            <p className="text-white/70">
              Kategori: <span className="font-semibold text-white">{data.category}</span>
            </p>
            <div className="mt-2 pt-2 border-t border-white/10">
              <p className="text-white/70 text-xs">Rekomendasi:</p>
              {data.recommendations.map((rec: string, idx: number) => (
                <p key={idx} className="text-xs text-blue-400 mt-1">• {rec}</p>
              ))}
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case 'strong':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'average':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'weak':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Literasi':
        return <BookOpen className="h-4 w-4" />;
      case 'Penalaran':
        return <Brain className="h-4 w-4" />;
      case 'Kuantitatif':
        return <Calculator className="h-4 w-4" />;
      case 'Verbal':
        return <Languages className="h-4 w-4" />;
      default:
        return <TrendingUp className="h-4 w-4" />;
    }
  };

  const weakAreas = data.filter(item => item.strength === 'weak');
  const strongAreas = data.filter(item => item.strength === 'strong');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="bg-white/5 backdrop-blur-xl border border-white/10 text-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-400" />
                Subtes Analysis
              </CardTitle>
              <p className="text-sm text-white/70 mt-1">
                Visualisasi kekuatan dan kelemahan di setiap subtes
              </p>
            </div>
            
            <Badge variant="outline" className="border-white/10 bg-white/5 text-white">
              {data.length} Subtes
            </Badge>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Radar Chart */}
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                  <PolarGrid 
                    stroke="rgba(255,255,255,0.1)" 
                    radialLines={false}
                  />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 11 }}
                  />
                  <PolarRadiusAxis 
                    angle={30} 
                    domain={[0, 100]} 
                    tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }}
                    stroke="rgba(255,255,255,0.1)"
                  />
                  
                  <Radar
                    name="Skor"
                    dataKey="score"
                    stroke="#8B5CF6"
                    fill="#8B5CF6"
                    fillOpacity={0.4}
                  />
                  
                  <Tooltip content={<CustomTooltip />} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Recommendations & Analysis */}
            <div className="space-y-6">
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {['Semua', 'Literasi', 'Penalaran', 'Kuantitatif', 'Verbal'].map((category) => (
                  <Button
                    key={category}
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedCategory(category === 'Semua' ? null : category)}
                    className={`
                      border-white/10 bg-white/5 hover:bg-white/10 text-white
                      ${(selectedCategory === category || (!selectedCategory && category === 'Semua')) 
                        ? 'bg-linear-to-r from-blue-500/20 to-indigo-500/20 border-blue-500/50' 
                        : ''
                      }
                    `}
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {/* Weak Areas */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="h-4 w-4 text-red-400" />
                  <h3 className="font-medium text-white">Area yang Perlu Ditingkatkan</h3>
                </div>
                <div className="space-y-3">
                  {weakAreas.map((area) => (
                    <motion.div
                      key={area.id}
                      whileHover={{ x: 4 }}
                      className="p-3 rounded-lg bg-white/5 border border-white/10"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(area.category)}
                          <span className="font-medium text-white">{area.name}</span>
                        </div>
                        <Badge className={getStrengthColor(area.strength)}>
                          {area.score}/{area.maxScore}
                        </Badge>
                      </div>
                      <Progress 
                        value={(area.score / area.maxScore) * 100} 
                        className="h-1.5 bg-white/10"
                        // indicatorClassName prop removed due to type error
                      />
                      <div className="mt-2 space-y-1">
                        {area.recommendations.map((rec, idx) => (
                          <p key={idx} className="text-xs text-white/70 flex items-start gap-1">
                            <ArrowRight className="h-3 w-3 text-blue-400 mt-0.5" />
                            {rec}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Strong Areas */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <h3 className="font-medium text-white">Area Kekuatan</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {strongAreas.map((area) => (
                    <Badge
                      key={area.id}
                      className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                    >
                      {area.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SubtestAnalysis;