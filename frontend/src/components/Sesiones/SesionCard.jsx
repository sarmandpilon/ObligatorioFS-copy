import { Link } from 'react-router-dom'
import { Calendar, User, Pencil, Trash2, Timer, Flame } from 'lucide-react'
import { motion } from 'framer-motion'
import { formatDate } from '../../utils/format'

export default function SesionCard({ session, onEdit, onDelete, isProfesor, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="card hover:border-brand-700 transition-all duration-200 group"
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-white text-sm truncate">{session.tipoEntrenamiento}</p>
          <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Calendar size={11} />
              {formatDate(session.fecha)}
            </span>
            <span className="flex items-center gap-1">
              <User size={11} />
              {session.alumnoEmail}
            </span>
          </div>
        </div>
        {isProfesor && (
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit(session)}
              className="p-1.5 text-slate-400 hover:text-brand-400 hover:bg-brand-500/10 rounded-lg transition-colors"
            >
              <Pencil size={13} />
            </button>
            <button
              onClick={() => onDelete(session)}
              className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <Trash2 size={13} />
            </button>
          </div>
        )}
      </div>

      {session.descripcion && (
        <p className="text-xs text-slate-400 mb-4 line-clamp-2">{session.descripcion}</p>
      )}

      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-surface-700 rounded-xl p-2.5">
          <p className="text-[10px] text-slate-500 uppercase tracking-wide">Calent.</p>
          <p className="text-sm font-bold text-white mt-0.5 flex items-center justify-center gap-0.5">
            <Flame size={11} className="text-orange-400" />
            {session.calentamiento?.duracion}m
          </p>
        </div>
        <div className="bg-surface-700 rounded-xl p-2.5">
          <p className="text-[10px] text-slate-500 uppercase tracking-wide">Trabajo</p>
          <p className="text-sm font-bold text-white mt-0.5">
            {session.trabajoPrincipal?.cantidad}×{session.trabajoPrincipal?.distancia}{session.trabajoPrincipal?.unidad === 'metros' ? 'm' : session.trabajoPrincipal?.unidad}
          </p>
        </div>
        <div className="bg-surface-700 rounded-xl p-2.5">
          <p className="text-[10px] text-slate-500 uppercase tracking-wide">Calma</p>
          <p className="text-sm font-bold text-white mt-0.5 flex items-center justify-center gap-0.5">
            <Timer size={11} className="text-brand-400" />
            {session.vueltaCalma?.duracion}m
          </p>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-surface-600">
        <Link
          to={`/sesiones/${session._id}`}
          className="text-xs text-brand-400 hover:text-brand-300 transition-colors font-medium"
        >
          Ver detalle →
        </Link>
      </div>
    </motion.div>
  )
}
