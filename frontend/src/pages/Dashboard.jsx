import { useQuery } from '@tanstack/react-query'
import { CalendarDays, Users, Tag, TrendingUp, Zap } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { getSesiones } from '../api/sesiones'
import { getTipos } from '../api/tipos'
import { useAuth } from '../context/AuthContext'
import Layout from '../components/Layout/Layout'
import Header from '../components/Layout/Header'
import StatsCard from '../components/Dashboard/StatsCard'
import TrainingChart from '../components/Dashboard/TrainingChart'
import ActivityChart from '../components/Dashboard/ActivityChart'
import RecentSessions from '../components/Dashboard/RecentSessions'

const POLL = 10_000

function buildChartData(sessions) {
  const counts = {}
  sessions?.forEach((s) => {
    counts[s.tipoEntrenamiento] = (counts[s.tipoEntrenamiento] ?? 0) + 1
  })
  return Object.entries(counts).map(([name, value]) => ({ name, value }))
}

function buildActivityData(sessions) {
  const counts = {}
  sessions?.forEach((s) => {
    const d = new Date(s.createdAt ?? s.fecha)
    const key = d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })
    counts[key] = (counts[key] ?? 0) + 1
  })
  const entries = Object.entries(counts).slice(-7)
  return entries.map(([name, value]) => ({ name, value }))
}

export default function Dashboard() {
  const { user, isProfesor } = useAuth()
  const navigate = useNavigate()

  const { data: sesData, isLoading: loadingSes } = useQuery({
    queryKey: ['sesiones', 'all'],
    queryFn: () => getSesiones({ limit: 100 }),
    refetchInterval: POLL,
  })

  const { data: tiposData, isLoading: loadingTipos } = useQuery({
    queryKey: ['tipos'],
    queryFn: getTipos,
    refetchInterval: POLL,
  })

  const sessions = sesData?.sesiones ?? sesData?.data ?? []
  const tipos = tiposData?.tipos ?? tiposData?.data ?? []
  const uniqueAlumnos = [...new Set(sessions.map((s) => s.alumnoEmail))].length
  const recent = [...sessions].sort((a, b) => new Date(b.createdAt ?? b.fecha) - new Date(a.createdAt ?? a.fecha)).slice(0, 6)
  const pieData = buildChartData(sessions)
  const barData = buildActivityData(sessions)

  return (
    <Layout>
      <Header title="Dashboard" subtitle="Resumen en tiempo real" />

      <div className="p-8 space-y-8 animate-fade-in">
        {/* Welcome banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand-800 to-brand-600 p-6">
          <div className="absolute right-0 top-0 w-64 h-full opacity-10">
            <svg viewBox="0 0 200 200" fill="currentColor" className="text-white w-full h-full">
              <circle cx="150" cy="50" r="80" />
              <circle cx="50" cy="150" r="60" />
            </svg>
          </div>
          <div className="relative">
            <p className="text-brand-200 text-sm font-medium">Bienvenido de vuelta</p>
            <h2 className="text-2xl font-bold text-white mt-0.5">{user?.nombre} 👋</h2>
            <p className="text-brand-200 text-sm mt-1">
              {isProfesor ? `Plan ${user?.plan} · ` : ''}
              {sessions.length} sesiones registradas
            </p>
            {isProfesor && (
              <button
                onClick={() => navigate('/sesiones')}
                className="mt-4 bg-white/20 hover:bg-white/30 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors flex items-center gap-2 w-fit"
              >
                <Zap size={14} />
                Nueva sesión
              </button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          <StatsCard
            icon={CalendarDays}
            label="Total sesiones"
            value={sessions.length}
            sub="Actualizando en vivo"
            color="brand"
            loading={loadingSes}
          />
          <StatsCard
            icon={Users}
            label="Alumnos activos"
            value={uniqueAlumnos}
            color="emerald"
            loading={loadingSes}
          />
          <StatsCard
            icon={Tag}
            label="Tipos de entren."
            value={tipos.length}
            color="amber"
            loading={loadingTipos}
          />
          <StatsCard
            icon={TrendingUp}
            label="Sesiones este mes"
            value={sessions.filter((s) => {
              const d = new Date(s.createdAt ?? s.fecha)
              const now = new Date()
              return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
            }).length}
            color="purple"
            loading={loadingSes}
          />
        </div>

        {/* Charts + Recent */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="card xl:col-span-2">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-white">Actividad reciente</h3>
              <span className="text-xs text-slate-500">Últimos 7 días</span>
            </div>
            <ActivityChart data={barData} />
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white">Por tipo</h3>
              <span className="text-xs text-slate-500">{sessions.length} total</span>
            </div>
            <TrainingChart data={pieData} />
          </div>
        </div>

        {/* Recent sessions */}
        <div className="card">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-white">Sesiones recientes</h3>
            <button
              onClick={() => navigate('/sesiones')}
              className="text-xs text-brand-400 hover:text-brand-300 font-medium transition-colors"
            >
              Ver todas →
            </button>
          </div>
          <RecentSessions sessions={recent} loading={loadingSes} />
        </div>
      </div>
    </Layout>
  )
}
