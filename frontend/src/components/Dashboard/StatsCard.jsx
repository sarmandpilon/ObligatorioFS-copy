import { motion } from 'framer-motion'

export default function StatsCard({ icon: Icon, label, value, sub, color = 'brand', loading }) {
  const colors = {
    brand:   'bg-brand-500/20 text-brand-400',
    emerald: 'bg-emerald-500/20 text-emerald-400',
    amber:   'bg-amber-500/20 text-amber-400',
    purple:  'bg-purple-500/20 text-purple-400',
    rose:    'bg-rose-500/20 text-rose-400',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="stat-card"
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${colors[color]}`}>
        <Icon size={22} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">{label}</p>
        {loading ? (
          <div className="h-7 w-16 bg-surface-600 rounded animate-pulse mt-1" />
        ) : (
          <p className="text-2xl font-bold text-white mt-0.5">{value ?? '—'}</p>
        )}
        {sub && <p className="text-xs text-slate-500 mt-0.5 truncate">{sub}</p>}
      </div>
    </motion.div>
  )
}
