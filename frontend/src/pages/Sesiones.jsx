import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Search, Filter, Sparkles, CalendarDays } from 'lucide-react'
import toast from 'react-hot-toast'
import { getSesiones, crearSesion, actualizarSesion, eliminarSesion, generarSesionIA } from '../api/sesiones'
import { useAuth } from '../context/AuthContext'
import Layout from '../components/Layout/Layout'
import Header from '../components/Layout/Header'
import SesionCard from '../components/Sesiones/SesionCard'
import SesionForm from '../components/Sesiones/SesionForm'
import Modal from '../components/ui/Modal'
import ConfirmDialog from '../components/ui/ConfirmDialog'
import LoadingSpinner from '../components/ui/LoadingSpinner'

const POLL = 10_000

export default function Sesiones() {
  const { isProfesor } = useAuth()
  const qc = useQueryClient()

  const [search, setSearch] = useState('')
  const [filterTipo, setFilterTipo] = useState('')
  const [page, setPage] = useState(1)
  const [modalOpen, setModalOpen] = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [aiEmail, setAiEmail] = useState('')
  const [aiModalOpen, setAiModalOpen] = useState(false)

  const params = {
    page,
    limit: 12,
    ...(search && { alumnoEmail: search }),
    ...(filterTipo && { tipoEntrenamiento: filterTipo }),
  }

  const { data, isLoading } = useQuery({
    queryKey: ['sesiones', params],
    queryFn: () => getSesiones(params),
    refetchInterval: POLL,
    keepPreviousData: true,
  })

  const sessions = data?.sesiones ?? data?.data ?? []
  const total = data?.total ?? sessions.length
  const totalPages = Math.ceil(total / 12)

  const createMut = useMutation({
    mutationFn: crearSesion,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['sesiones'] })
      toast.success('Sesión creada')
      setModalOpen(false)
    },
    onError: (e) => toast.error(e.response?.data?.message ?? 'Error al crear'),
  })

  const updateMut = useMutation({
    mutationFn: ({ id, data }) => actualizarSesion(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['sesiones'] })
      toast.success('Sesión actualizada')
      setEditTarget(null)
    },
    onError: (e) => toast.error(e.response?.data?.message ?? 'Error al actualizar'),
  })

  const deleteMut = useMutation({
    mutationFn: eliminarSesion,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['sesiones'] })
      toast.success('Sesión eliminada')
      setDeleteTarget(null)
    },
    onError: (e) => toast.error(e.response?.data?.message ?? 'Error al eliminar'),
  })

  const aiMut = useMutation({
    mutationFn: generarSesionIA,
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ['sesiones'] })
      toast.success('Sesión generada con IA')
      setAiModalOpen(false)
      setAiEmail('')
    },
    onError: (e) => toast.error(e.response?.data?.message ?? 'Error al generar'),
  })

  return (
    <Layout>
      <Header title="Sesiones" subtitle={`${total} sesiones registradas`} />

      <div className="p-8 space-y-6">
        {/* Toolbar */}
        <div className="flex flex-wrap gap-3 items-center justify-between">
          <div className="flex gap-3 flex-1">
            <div className="relative flex-1 max-w-xs">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="email"
                className="input pl-9 text-sm"
                placeholder="Buscar por alumno..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              />
            </div>
            <div className="relative">
              <Filter size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                className="input pl-9 text-sm w-48"
                placeholder="Tipo de entren."
                value={filterTipo}
                onChange={(e) => { setFilterTipo(e.target.value); setPage(1) }}
              />
            </div>
          </div>

          {isProfesor && (
            <div className="flex gap-2">
              <button
                onClick={() => setAiModalOpen(true)}
                className="btn-secondary text-sm"
              >
                <Sparkles size={15} className="text-amber-400" />
                Generar con IA
              </button>
              <button
                onClick={() => setModalOpen(true)}
                className="btn-primary text-sm"
              >
                <Plus size={15} />
                Nueva sesión
              </button>
            </div>
          )}
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="flex justify-center py-16">
            <LoadingSpinner size="lg" />
          </div>
        ) : sessions.length === 0 ? (
          <div className="text-center py-16 text-slate-500">
            <CalendarDays size={40} className="mx-auto mb-3 opacity-30" />
            <p>No hay sesiones que coincidan</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {sessions.map((s, i) => (
              <SesionCard
                key={s._id}
                session={s}
                index={i}
                isProfesor={isProfesor}
                onEdit={setEditTarget}
                onDelete={setDeleteTarget}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 pt-4">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="btn-secondary text-sm disabled:opacity-40"
            >
              ← Anterior
            </button>
            <span className="flex items-center px-4 text-sm text-slate-400">
              {page} / {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="btn-secondary text-sm disabled:opacity-40"
            >
              Siguiente →
            </button>
          </div>
        )}
      </div>

      {/* Create modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Nueva sesión" size="lg">
        <SesionForm
          onSubmit={(d) => createMut.mutate(d)}
          loading={createMut.isPending}
        />
      </Modal>

      {/* Edit modal */}
      <Modal open={!!editTarget} onClose={() => setEditTarget(null)} title="Editar sesión" size="lg">
        <SesionForm
          initial={editTarget}
          onSubmit={(d) => updateMut.mutate({ id: editTarget._id, data: d })}
          loading={updateMut.isPending}
        />
      </Modal>

      {/* Delete confirm */}
      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteMut.mutate(deleteTarget._id)}
        loading={deleteMut.isPending}
        title="Eliminar sesión"
        message={`¿Estás seguro de eliminar la sesión de ${deleteTarget?.alumnoEmail}? Esta acción no se puede deshacer.`}
      />

      {/* AI Generate modal */}
      <Modal open={aiModalOpen} onClose={() => setAiModalOpen(false)} title="Generar sesión con IA" size="sm">
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
            <Sparkles size={18} className="text-amber-400 flex-shrink-0" />
            <p className="text-sm text-amber-200/80">
              La IA analizará el historial del alumno y generará una sesión personalizada.
            </p>
          </div>
          <div>
            <label className="label">Email del alumno</label>
            <input
              type="email"
              className="input"
              placeholder="alumno@email.com"
              value={aiEmail}
              onChange={(e) => setAiEmail(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-3">
            <button onClick={() => setAiModalOpen(false)} className="btn-secondary">Cancelar</button>
            <button
              onClick={() => aiMut.mutate(aiEmail)}
              disabled={!aiEmail || aiMut.isPending}
              className="btn-primary"
            >
              <Sparkles size={14} />
              {aiMut.isPending ? 'Generando...' : 'Generar'}
            </button>
          </div>
        </div>
      </Modal>
    </Layout>
  )
}
