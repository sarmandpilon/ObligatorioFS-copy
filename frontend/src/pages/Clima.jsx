import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { CloudSun, Search, Thermometer, Wind, Droplets, CheckCircle, XCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { getClima } from '../api/clima'
import { weatherIcon } from '../utils/format'
import Layout from '../components/Layout/Layout'
import Header from '../components/Layout/Header'
import LoadingSpinner from '../components/ui/LoadingSpinner'

const CITIES = ['Montevideo', 'Buenos Aires', 'Madrid', 'Barcelona', 'Lima', 'Santiago']

export default function Clima() {
  const [ciudad, setCiudad] = useState('Montevideo')
  const [input, setInput] = useState('Montevideo')

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['clima', ciudad],
    queryFn: () => getClima(ciudad),
    refetchInterval: 60_000,
    enabled: !!ciudad,
  })

  const clima = data?.clima ?? data

  const handleSearch = (e) => {
    e.preventDefault()
    if (input.trim()) setCiudad(input.trim())
  }

  return (
    <Layout>
      <Header title="Clima" subtitle="Condiciones para correr" />

      <div className="p-8 max-w-2xl space-y-6">
        {/* Search */}
        <form onSubmit={handleSearch} className="flex gap-3">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              className="input pl-9"
              placeholder="Buscar ciudad..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary">Buscar</button>
        </form>

        {/* Quick cities */}
        <div className="flex flex-wrap gap-2">
          {CITIES.map((c) => (
            <button
              key={c}
              onClick={() => { setCiudad(c); setInput(c) }}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                ciudad === c
                  ? 'bg-brand-600 text-white'
                  : 'bg-surface-700 text-slate-400 hover:text-white hover:bg-surface-600'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Weather card */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <div className="flex justify-center py-16">
              <LoadingSpinner size="lg" />
            </div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="card text-center text-red-400 py-10"
            >
              Ciudad no encontrada o error en el servicio
            </motion.div>
          ) : clima ? (
            <motion.div
              key={ciudad}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Main card */}
              <div className="card bg-gradient-to-br from-brand-900/30 to-surface-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">{clima.ciudad ?? ciudad}</p>
                    <h2 className="text-4xl font-bold text-white mt-1">
                      {clima.temperatura ?? clima.temp}°C
                    </h2>
                    <p className="text-slate-300 mt-1 capitalize flex items-center gap-2">
                      {weatherIcon(clima.descripcion ?? clima.description)}
                      {clima.descripcion ?? clima.description}
                    </p>
                  </div>
                  <div className="text-6xl">
                    {weatherIcon(clima.descripcion ?? clima.description)}
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3 mt-5">
                  <div className="bg-surface-700/50 rounded-xl p-3 text-center">
                    <Thermometer size={16} className="text-orange-400 mx-auto mb-1" />
                    <p className="text-xs text-slate-500">Sensación</p>
                    <p className="text-sm font-bold text-white">
                      {clima.sensacionTermica ?? clima.feelsLike ?? '—'}°C
                    </p>
                  </div>
                  <div className="bg-surface-700/50 rounded-xl p-3 text-center">
                    <Droplets size={16} className="text-blue-400 mx-auto mb-1" />
                    <p className="text-xs text-slate-500">Humedad</p>
                    <p className="text-sm font-bold text-white">
                      {clima.humedad ?? clima.humidity ?? '—'}%
                    </p>
                  </div>
                  <div className="bg-surface-700/50 rounded-xl p-3 text-center">
                    <Wind size={16} className="text-slate-400 mx-auto mb-1" />
                    <p className="text-xs text-slate-500">Viento</p>
                    <p className="text-sm font-bold text-white">
                      {clima.viento ?? clima.windSpeed ?? '—'} m/s
                    </p>
                  </div>
                </div>
              </div>

              {/* Running suitability */}
              {clima.aptaParaCorrer !== undefined && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15 }}
                  className={`card flex items-center gap-4 ${
                    clima.aptaParaCorrer
                      ? 'bg-emerald-500/10 border-emerald-500/30'
                      : 'bg-red-500/10 border-red-500/30'
                  }`}
                >
                  {clima.aptaParaCorrer ? (
                    <CheckCircle size={28} className="text-emerald-400 flex-shrink-0" />
                  ) : (
                    <XCircle size={28} className="text-red-400 flex-shrink-0" />
                  )}
                  <div>
                    <p className={`font-semibold ${clima.aptaParaCorrer ? 'text-emerald-400' : 'text-red-400'}`}>
                      {clima.aptaParaCorrer ? '¡Condiciones ideales para correr!' : 'No recomendado para correr'}
                    </p>
                    {clima.razon && (
                      <p className="text-sm text-slate-400 mt-0.5">{clima.razon}</p>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </Layout>
  )
}
