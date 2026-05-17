import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'

const COLORS = ['#0ea8e6', '#10b981', '#f59e0b', '#8b5cf6', '#f43f5e', '#06b6d4']

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-surface-700 border border-surface-500 rounded-xl px-4 py-2.5 text-sm">
      <p className="font-semibold text-white">{payload[0].name}</p>
      <p className="text-slate-400">{payload[0].value} sesiones</p>
    </div>
  )
}

export default function TrainingChart({ data }) {
  if (!data?.length) {
    return (
      <div className="flex items-center justify-center h-48 text-slate-500 text-sm">
        Sin datos disponibles
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={85}
          paddingAngle={3}
          dataKey="value"
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} strokeWidth={0} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          iconType="circle"
          iconSize={8}
          formatter={(v) => <span className="text-slate-300 text-xs">{v}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
