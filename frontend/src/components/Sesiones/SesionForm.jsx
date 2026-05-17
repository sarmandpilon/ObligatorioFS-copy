import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getTipos } from '../../api/tipos'

const defaultForm = {
  fecha: '',
  alumnoEmail: '',
  tipoEntrenamiento: '',
  descripcion: '',
  calentamiento: { duracion: '' },
  trabajoPrincipal: {
    descripcion: '',
    distancia: '',
    unidad: 'km',
    cantidad: '',
  },
  vueltaCalma: { duracion: '' },
}

export default function SesionForm({ initial, onSubmit, loading }) {
  const [form, setForm] = useState(defaultForm)

  const { data: tiposData } = useQuery({
    queryKey: ['tipos'],
    queryFn: getTipos,
  })
  const tipos = tiposData?.tipos ?? tiposData?.data ?? []

  useEffect(() => {
    if (initial) {
      setForm({
        fecha: initial.fecha ?? '',
        alumnoEmail: initial.alumnoEmail ?? '',
        tipoEntrenamiento: initial.tipoEntrenamiento ?? '',
        descripcion: initial.descripcion ?? '',
        calentamiento: { duracion: initial.calentamiento?.duracion ?? '' },
        trabajoPrincipal: {
          descripcion: initial.trabajoPrincipal?.descripcion ?? '',
          distancia: initial.trabajoPrincipal?.distancia ?? '',
          unidad: initial.trabajoPrincipal?.unidad ?? 'km',
          cantidad: initial.trabajoPrincipal?.cantidad ?? '',
        },
        vueltaCalma: { duracion: initial.vueltaCalma?.duracion ?? '' },
      })
    }
  }, [initial])

  const set = (path, value) => {
    setForm((prev) => {
      const parts = path.split('.')
      if (parts.length === 1) return { ...prev, [path]: value }
      if (parts.length === 2) {
        return {
          ...prev,
          [parts[0]]: { ...prev[parts[0]], [parts[1]]: value },
        }
      }
      return prev
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = {
      ...form,
      calentamiento: { duracion: Number(form.calentamiento.duracion) },
      trabajoPrincipal: {
        ...form.trabajoPrincipal,
        distancia: Number(form.trabajoPrincipal.distancia),
        cantidad: Number(form.trabajoPrincipal.cantidad),
      },
      vueltaCalma: { duracion: Number(form.vueltaCalma.duracion) },
    }
    onSubmit(payload)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">Fecha</label>
          <input type="date" className="input" value={form.fecha} onChange={(e) => set('fecha', e.target.value)} required />
        </div>
        <div>
          <label className="label">Email alumno</label>
          <input type="email" className="input" placeholder="alumno@email.com" value={form.alumnoEmail} onChange={(e) => set('alumnoEmail', e.target.value)} required />
        </div>
      </div>

      <div>
        <label className="label">Tipo de entrenamiento</label>
        <select className="input" value={form.tipoEntrenamiento} onChange={(e) => set('tipoEntrenamiento', e.target.value)} required>
          <option value="">Seleccionar tipo...</option>
          {tipos.map((t) => (
            <option key={t._id} value={t.nombre}>{t.nombre}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="label">Descripción (opcional)</label>
        <textarea className="input min-h-[72px] resize-none" placeholder="Notas sobre la sesión..." value={form.descripcion} onChange={(e) => set('descripcion', e.target.value)} />
      </div>

      <div className="grid grid-cols-2 gap-4 p-4 bg-surface-700 rounded-xl border border-surface-600">
        <div>
          <label className="label">Calentamiento (min)</label>
          <input type="number" min="0" className="input" placeholder="10" value={form.calentamiento.duracion} onChange={(e) => set('calentamiento.duracion', e.target.value)} required />
        </div>
        <div>
          <label className="label">Vuelta a la calma (min)</label>
          <input type="number" min="0" className="input" placeholder="10" value={form.vueltaCalma.duracion} onChange={(e) => set('vueltaCalma.duracion', e.target.value)} required />
        </div>
      </div>

      <div className="p-4 bg-surface-700 rounded-xl border border-surface-600 space-y-3">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Trabajo principal</p>
        <div>
          <label className="label">Descripción</label>
          <input type="text" className="input" placeholder="3x1000m a ritmo 5:00/km" value={form.trabajoPrincipal.descripcion} onChange={(e) => set('trabajoPrincipal.descripcion', e.target.value)} required />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="label">Distancia</label>
            <input type="number" min="0" step="0.01" className="input" placeholder="1000" value={form.trabajoPrincipal.distancia} onChange={(e) => set('trabajoPrincipal.distancia', e.target.value)} required />
          </div>
          <div>
            <label className="label">Unidad</label>
            <select className="input" value={form.trabajoPrincipal.unidad} onChange={(e) => set('trabajoPrincipal.unidad', e.target.value)}>
              <option value="metros">metros</option>
              <option value="km">km</option>
              <option value="minutos">minutos</option>
            </select>
          </div>
          <div>
            <label className="label">Cantidad</label>
            <input type="number" min="1" className="input" placeholder="3" value={form.trabajoPrincipal.cantidad} onChange={(e) => set('trabajoPrincipal.cantidad', e.target.value)} required />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? 'Guardando...' : 'Guardar sesión'}
        </button>
      </div>
    </form>
  )
}
