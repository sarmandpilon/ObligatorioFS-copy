import { Link } from 'react-router-dom'
import { ArrowRight, Calendar } from 'lucide-react'
import { formatDate } from '../../utils/format'
import LoadingSpinner from '../ui/LoadingSpinner'

export default function RecentSessions({ sessions, loading }) {
  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <LoadingSpinner />
      </div>
    )
  }

  if (!sessions?.length) {
    return (
      <div className="text-center py-8 text-slate-500 text-sm">
        No hay sesiones recientes
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {sessions.map((s) => (
        <Link
          key={s._id}
          to={`/sesiones/${s._id}`}
          className="flex items-center gap-4 p-3 rounded-xl hover:bg-surface-700 transition-colors group"
        >
          <div className="w-9 h-9 rounded-xl bg-brand-500/20 flex items-center justify-center flex-shrink-0">
            <Calendar size={15} className="text-brand-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{s.alumnoEmail}</p>
            <p className="text-xs text-slate-500 truncate">
              {s.tipoEntrenamiento} · {formatDate(s.fecha)}
            </p>
          </div>
          <ArrowRight size={14} className="text-slate-600 group-hover:text-brand-400 transition-colors flex-shrink-0" />
        </Link>
      ))}
    </div>
  )
}
