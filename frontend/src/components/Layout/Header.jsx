import { Bell, RefreshCw } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import LiveIndicator from '../ui/LiveIndicator'

export default function Header({ title, subtitle }) {
  const qc = useQueryClient()

  const refresh = () => qc.invalidateQueries()

  return (
    <header className="h-16 flex items-center justify-between px-8 border-b border-surface-600 bg-surface-800/50 backdrop-blur-sm sticky top-0 z-30">
      <div>
        <h1 className="text-lg font-bold text-white leading-none">{title}</h1>
        {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-4">
        <LiveIndicator />
        <button
          onClick={refresh}
          className="p-2 text-slate-400 hover:text-white hover:bg-surface-700 rounded-lg transition-colors"
          title="Refrescar datos"
        >
          <RefreshCw size={16} />
        </button>
      </div>
    </header>
  )
}
