'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Card } from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

const activityData = [
  { date: 'Sen', participants: 45, completed: 38 },
  { date: 'Sel', participants: 62, completed: 52 },
  { date: 'Rab', participants: 78, completed: 65 },
  { date: 'Kam', participants: 85, completed: 72 },
  { date: 'Jum', participants: 92, completed: 81 },
  { date: 'Sab', participants: 108, completed: 95 },
  { date: 'Min', participants: 125, completed: 110 },
]

export function ActivityChart() {
  // Calculate colors from design tokens
  const primaryColor = 'hsl(272.65 16% 42%)'
  const secondaryColor = 'hsl(197.18 18% 60%)'

  return (
    <Card className="p-6 bg-card border-border">
      <h2 className="text-xl font-bold text-foreground mb-6">Aktivitas Peserta Tryout</h2>
      <ChartContainer
        config={{
          participants: {
            label: 'Peserta Mengikuti',
            color: primaryColor,
          },
          completed: {
            label: 'Selesai Mengerjakan',
            color: secondaryColor,
          },
        }}
        className="h-80"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={activityData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(286 1% 92%)" />
            <XAxis dataKey="date" stroke="hsl(286.66 1.5% 52%)" />
            <YAxis stroke="hsl(286.66 1.5% 52%)" />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="participants"
              stroke={primaryColor}
              strokeWidth={2}
              dot={{ fill: primaryColor, r: 4 }}
              activeDot={{ r: 6 }}
              name="Peserta Mengikuti"
            />
            <Line
              type="monotone"
              dataKey="completed"
              stroke={secondaryColor}
              strokeWidth={2}
              dot={{ fill: secondaryColor, r: 4 }}
              activeDot={{ r: 6 }}
              name="Selesai Mengerjakan"
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Card>
  )
}
