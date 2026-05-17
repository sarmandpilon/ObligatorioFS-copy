import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, Calendar, User, Flame, Timer, Dumbbell } from 'lucide-react'
import { getSesion } from '../api/sesiones'
import Layout from '../components/Layout/Layout'
import Header from '../components/Layout/Header'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { formatDate, formatDateTime } from '../utils/format'

function InfoRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-surface-700 last:border-0">
      <span className="text-sm text-slate-500 font-medium flex-shrink-0">{label}</span>
      <span className="text-sm text-slate-200 text-right">{value ?? '—'}</span>
    </div>
  )
}

export default function SesionDetalle() {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data, isLoading, error } = useQuery({
    queryKey: ['sesion', id],
    queryFn: () => getSesion(id),
    refetchInterval: 15_000,
  })

  const s = data?.sesion ?? data

  return (
    <Layout>
      <Header title="Detalle de sesión" />

      <div className="p-8 max-w-2xl">
        <button
          onClick={() => navigate(-1)}
          className="btn-secondary text-sm mb-6"
        >
          <ArrowLeft size={15} />
          Volver
        </button>

        {isLoading ? (
          <div className="flex justify-center py-16">
            <LoadingSpinner size="lg" />
          </div>
        ) : error ? (
          <div className="card text-center text-red-400 py-10">
            Error al cargar la sesión
          </div>
        ) : s ? (
          <div className="space-y-5">
            {/* Header card */}
            <div className="card bg-gradient-to-br from-brand-900/40 to-surface-800 border-brand-700/30">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">{s.tipoEntrenamiento}</h2>
                  <div className="flex items-center gap-4 mt-2 text-sm text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} />
                      {formatDate(s.fecha)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <User size={13} />
                      {s.alumnoEmail}
                    </span>
                  </div>
                </div>
              </div>
              {s.descripcion && (
                <p className="mt-4 text-slate-300 text-sm leading-relaxed">{s.descripcion}</p>
              )}
            </div>

            {/* Structure */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Flame, label: 'Calentamiento', value: `${s.calentamiento?.duracion} min`, color: 'text-orange-400 bg-orange-500/10' },
                { icon: Dumbbell, label: 'Trabajo principal', value: `${s.trabajoPrincipal?.cantidad}×${s.trabajoPrincipal?.distancia} ${s.trabajoPrincipal?.unidad}`, color: 'text-brand-400 bg-brand-500/10' },
                { icon: Timer, label: 'Vuelta a la calma', value: `${s.vueltaCalma?.duracion} min`, color: 'text-emerald-400 bg-emerald-500/10' },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="card text-center">
                  <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mx-auto mb-3`}>
                    <Icon size={18} />
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{label}</p>
                  <p className="text-base font-bold text-white mt-1">{value}</p>
                </div>
              ))}
            </div>

            {/* Details */}
            <div className="card">
              <h3 className="font-semibold text-white mb-2">Trabajo principal</h3>
              <div className="divide-y divide-surface-700">
                <InfoRow label="Descripción" value={s.trabajoPrincipal?.descripcion} />
                <InfoRow label="Distancia" value={`${s.trabajoPrincipal?.distancia} ${s.trabajoPrincipal?.unidad}`} />
                <InfoRow label="Cantidad" value={s.trabajoPrincipal?.cantidad} />
              </div>
            </div>

            <div className="card">
              <h3 className="font-semibold text-white mb-2">Metadatos</h3>
              <div className="divide-y divide-surface-700">
                <InfoRow label="Profesor" value={s.profesorEmail} />
                <InfoRow label="Creado" value={formatDateTime(s.createdAt)} />
                <InfoRow label="Actualizado" value={formatDateTime(s.updatedAt)} />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </Layout>
  )
}
