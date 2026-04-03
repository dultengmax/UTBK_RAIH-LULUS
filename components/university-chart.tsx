'use client'

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts'
import { Card } from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

const universityData = [
  { name: 'Universitas Indonesia', value: 245, percentage: 28 },
  { name: 'ITB', value: 189, percentage: 22 },
  { name: 'UGM', value: 156, percentage: 18 },
  { name: 'Universitas Diponegoro', value: 98, percentage: 11 },
  { name: 'Universitas Airlangga', value: 76, percentage: 9 },
  { name: 'Lainnya', value: 109, percentage: 12 },
]

export function UniversityChart() {
  // Colors from design tokens
  const colors = [
    'hsl(272.65 16% 42%)',   // primary
    'hsl(197.18 18% 60%)',   // accent
    'hsl(196.82 8% 88%)',    // secondary
    'hsl(195 12% 65%)',      // chart-4
    'hsl(270 15% 50%)',      // chart-5
    'hsl(286 1% 94%)',       // muted
  ]

  return (
    <Card className="p-6 bg-card border-border">
      <h2 className="text-xl font-bold text-foreground mb-6">Pilihan Universitas Rata-rata Peserta</h2>
      <ChartContainer
        config={{
          value: {
            label: 'Jumlah Peserta',
          },
        }}
        className="h-80"
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Pie
              data={universityData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percentage }) => `${name}: ${percentage}%`}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {universityData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => `${value} peserta`}
              contentStyle={{
                backgroundColor: 'hsl(285.75 0.1% 98%)',
                border: '1px solid hsl(286 1% 92%)',
                borderRadius: '0.5rem',
                color: 'hsl(286.66 1.5% 22%)',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>

      {/* Legend */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        {universityData.map((uni, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: colors[index % colors.length] }}
            />
            <span className="text-sm text-muted-foreground">
              {uni.name}: <span className="font-semibold text-foreground">{uni.value}</span>
            </span>
          </div>
        ))}
      </div>
    </Card>
  )
}
