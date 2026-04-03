// app/dashboard/components/MonthlyPerformance.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Bar
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Calendar, Activity } from 'lucide-react';
import { MonthlyStat } from '@/types/dashboard';

interface MonthlyPerformanceProps {
  data: MonthlyStat[];
}

const MonthlyPerformance: React.FC<MonthlyPerformanceProps> = ({ data }) => {
  const [chartType, setChartType] = useState<'score' | 'rank'>('score');
  const [viewMode, setViewMode] = useState<'line' | 'area'>('area');

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-deep-navy/95 backdrop-blur-xl border border-white/10 rounded-lg p-4 text-white shadow-xl">
          <p className="font-medium mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-white/70">{entry.name}:</span>
              <span className="font-semibold">
                {entry.name === 'IRT Score' 
                  ? entry.value.toFixed(2) 
                  : `#${entry.value.toLocaleString()}`
                }
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const getMinMaxScore = () => {
    const scores = data.map(d => d.irtScore);
    const min = Math.min(...scores);
    const max = Math.max(...scores);
    const padding = (max - min) * 0.1;
    return [Math.floor(min - padding), Math.ceil(max + padding)];
  };

  const getMinMaxRank = () => {
    const ranks = data.map(d => d.rank);
    const min = Math.min(...ranks);
    const max = Math.max(...ranks);
    const padding = (max - min) * 0.1;
    return [Math.floor(min - padding), Math.ceil(max + padding)];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="bg-white/5 backdrop-blur-xl border border-white/10 text-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-400" />
              Monthly Performance Trend
            </CardTitle>
            <p className="text-sm text-white/70 mt-1">
              Perkembangan skor IRT dan peringkat nasional
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Tabs defaultValue="score" className="w-[200px]">
              <TabsList className="bg-white/5 border border-white/10">
                <TabsTrigger 
                  value="score"
                  onClick={() => setChartType('score')}
                  className="data-[state=active]:bg-linear-to-r data-[state=active]:from-blue-500/20 data-[state=active]:to-indigo-500/20"
                >
                  IRT Score
                </TabsTrigger>
                <TabsTrigger 
                  value="rank"
                  onClick={() => setChartType('rank')}
                  className="data-[state=active]:bg-linear-to-r data-[state=active]:from-emerald-500/20 data-[state=active]:to-teal-500/20"
                >
                  Ranking
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode(viewMode === 'line' ? 'area' : 'line')}
              className="border-white/10 bg-white/5 hover:bg-white/10 text-white"
            >
              {viewMode === 'line' ? (
                <AreaChart className="h-4 w-4" />
              ) : (
                <LineChart className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              {viewMode === 'line' ? (
                <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="monthShort" 
                    stroke="rgba(255,255,255,0.5)"
                    tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                  />
                  <YAxis 
                    yAxisId="left"
                    domain={chartType === 'score' ? getMinMaxScore() : getMinMaxRank()}
                    stroke="rgba(255,255,255,0.5)"
                    tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                    tickFormatter={(value) => 
                      chartType === 'score' 
                        ? value.toFixed(0) 
                        : `#${value.toLocaleString()}`
                    }
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    wrapperStyle={{ color: 'white' }}
                    formatter={(value) => (
                      <span style={{ color: 'rgba(255,255,255,0.9)' }}>{value}</span>
                    )}
                  />
                  
                  {chartType === 'score' ? (
                    <>
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="irtScore"
                        name="IRT Score"
                        stroke="#3B82F6"
                        strokeWidth={3}
                        dot={{ fill: '#3B82F6', r: 6, strokeWidth: 2, stroke: '#0A192F' }}
                        activeDot={{ r: 8, fill: '#3B82F6' }}
                      />
                      <Bar
                        yAxisId="left"
                        dataKey="irtScore"
                        name="Score Bar"
                        fill="rgba(59, 130, 246, 0.2)"
                        barSize={20}
                      />
                    </>
                  ) : (
                    <>
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="rank"
                        name="National Rank"
                        stroke="#10B981"
                        strokeWidth={3}
                        dot={{ fill: '#10B981', r: 6, strokeWidth: 2, stroke: '#0A192F' }}
                        activeDot={{ r: 8, fill: '#10B981' }}
                      />
                      <Bar
                        yAxisId="left"
                        dataKey="rank"
                        name="Rank Bar"
                        fill="rgba(16, 185, 129, 0.2)"
                        barSize={20}
                      />
                    </>
                  )}
                </ComposedChart>
              ) : (
                <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="monthShort" 
                    stroke="rgba(255,255,255,0.5)"
                    tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                  />
                  <YAxis 
                    yAxisId="left"
                    domain={chartType === 'score' ? getMinMaxScore() : getMinMaxRank()}
                    stroke="rgba(255,255,255,0.5)"
                    tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                    tickFormatter={(value) => 
                      chartType === 'score' 
                        ? value.toFixed(0) 
                        : `#${value.toLocaleString()}`
                    }
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    wrapperStyle={{ color: 'white' }}
                    formatter={(value) => (
                      <span style={{ color: 'rgba(255,255,255,0.9)' }}>{value}</span>
                    )}
                  />
                  
                  {chartType === 'score' ? (
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="irtScore"
                      name="IRT Score"
                      stroke="#3B82F6"
                      fill="url(#colorScore)"
                      strokeWidth={2}
                    />
                  ) : (
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="rank"
                      name="National Rank"
                      stroke="#10B981"
                      fill="url(#colorRank)"
                      strokeWidth={2}
                    />
                  )}
                  
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorRank" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                </ComposedChart>
              )}
            </ResponsiveContainer>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <p className="text-sm text-white/70 mb-1">Rata-rata Skor</p>
              <p className="text-xl font-bold text-white">
                {(data.reduce((acc, curr) => acc + curr.irtScore, 0) / data.length).toFixed(2)}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <p className="text-sm text-white/70 mb-1">Trend</p>
              <div className="flex items-center gap-1">
                {data[data.length - 1].irtScore > data[data.length - 2].irtScore ? (
                  <>
                    <TrendingUp className="h-4 w-4 text-emerald-400" />
                    <p className="text-sm font-medium text-emerald-400">Meningkat</p>
                  </>
                ) : (
                  <>
                    <TrendingDown className="h-4 w-4 text-red-400" />
                    <p className="text-sm font-medium text-red-400">Menurun</p>
                  </>
                )}
              </div>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <p className="text-sm text-white/70 mb-1">Peringkat Terbaik</p>
              <p className="text-xl font-bold text-white">
                #{Math.min(...data.map(d => d.rank)).toLocaleString()}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <p className="text-sm text-white/70 mb-1">Total Peserta</p>
              <p className="text-xl font-bold text-white">
                {data[0].totalParticipants.toLocaleString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MonthlyPerformance;