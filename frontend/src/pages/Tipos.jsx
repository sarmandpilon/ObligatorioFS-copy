import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Tag, Pencil, Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { getTipos, crearTipo, actualizarTipo, eliminarTipo } from '../api/tipos'
import { useAuth } from '../context/AuthContext'
import Layout from '../components/Layout/Layout'
import Header from '../components/Layout/Header'
import Modal from '../components/ui/Modal'
import ConfirmDialog from '../components/ui/ConfirmDialog'
import LoadingSpinner from '../components/ui/LoadingSpinner'

function TipoForm({ initial, onSubmit, loading }) {
  const [form, setForm] = useState({ nombre: initial?.nombre ?? '', descripcion: initial?.descripcion ?? '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="label">Nombre</label>
        <input
          type="text"
          className="input"
          placeholder="ej. Intervalos, Fondo, etc."
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          required
          autoFocus
        />
      </div>
      <div>
        <label className="label">Descripción (opcional)</label>
        <textarea
          className="input min-h-[80px] resize-none"
          placeholder="Descripción del tipo de entrenamiento..."
          value={form.descripcion}
          onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
        />
      </div>
      <div className="flex justify-end gap-3">
        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
      </div>
    </form>
  )
}

const COLORS = [
  'from-brand-600/20 to-brand-800/10 border-brand-700/30',
  'from-emerald-600/20 to-emerald-800/10 border-emerald-700/30',
  'from-amber-600/20 to-amber-800/10 border-amber-700/30',
  'from-purple-600/20 to-purple-800/10 border-purple-700/30',
  'from-rose-600/20 to-rose-800/10 border-rose-700/30',
  'from-cyan-600/20 to-cyan-800/10 border-cyan-700/30',
]

export default function Tipos() {
  const { isProfesor } = useAuth()
  const qc = useQueryClient()
  const [modalOpen, setModalOpen] = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const { data, isLoading } = useQuery({
    queryKey: ['tipos'],
    queryFn: getTipos,
    refetchInterval: 15_000,
  })
  const tipos = data?.tipos ?? data?.data ?? []

  const createMut = useMutation({
    mutationFn: crearTipo,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['tipos'] }); toast.success('Tipo creado'); setModalOpen(false) },
    onError: (e) => toast.error(e.response?.data?.message ?? 'Error'),
  })

  const updateMut = useMutation({
    mutationFn: ({ id, data }) => actualizarTipo(id, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['tipos'] }); toast.success('Tipo actualizado'); setEditTarget(null) },
    onError: (e) => toast.error(e.response?.data?.message ?? 'Error'),
  })

  const deleteMut = useMutation({
    mutationFn: eliminarTipo,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['tipos'] }); toast.success('Tipo eliminado'); setDeleteTarget(null) },
    onError: (e) => toast.error(e.response?.data?.message ?? 'Error'),
  })

  return (
    <Layout>
      <Header title="Tipos de entrenamiento" subtitle={`${tipos.length} tipos configurados`} />

      <div className="p-8 space-y-6">
        {isProfesor && (
          <div className="flex justify-end">
            <button onClick={() => setModalOpen(true)} className="btn-primary">
              <Plus size={15} />
              Nuevo tipo
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center py-16">
            <LoadingSpinner size="lg" />
          </div>
        ) : tipos.length === 0 ? (
          <div className="text-center py-16 text-slate-500">
            <Tag size={40} className="mx-auto mb-3 opacity-30" />
            <p>No hay tipos de entrenamiento</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {tipos.map((t, i) => (
              <motion.div
                key={t._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`card bg-gradient-to-br ${COLORS[i % COLORS.length]} group hover:scale-[1.01] transition-transform`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                        <Tag size={13} className="text-white" />
                      </div>
                      <h3 className="font-semibold text-white truncate">{t.nombre}</h3>
                    </div>
                    {t.descripcion ? (
                      <p className="text-sm text-slate-400 line-clamp-2">{t.descripcion}</p>
                    ) : (
                      <p className="text-sm text-slate-600 italic">Sin descripción</p>
                    )}
                  </div>
                  {isProfesor && (
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                      <button
                        onClick={() => setEditTarget(t)}
                        className="p-1.5 text-slate-400 hover:text-brand-400 hover:bg-brand-500/10 rounded-lg transition-colors"
                      >
                        <Pencil size={13} />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(t)}
                        className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Nuevo tipo de entrenamiento">
        <TipoForm onSubmit={(d) => createMut.mutate(d)} loading={createMut.isPending} />
      </Modal>

      <Modal open={!!editTarget} onClose={() => setEditTarget(null)} title="Editar tipo">
        <TipoForm
          initial={editTarget}
          onSubmit={(d) => updateMut.mutate({ id: editTarget._id, data: d })}
          loading={updateMut.isPending}
        />
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteMut.mutate(deleteTarget._id)}
        loading={deleteMut.isPending}
        title="Eliminar tipo"
        message={`¿Eliminar el tipo "${deleteTarget?.nombre}"? Esta acción no se puede deshacer.`}
      />
    </Layout>
  )
}
