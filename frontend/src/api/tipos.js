import api from './axios'

export const getTipos = () =>
  api.get('/tipos-entrenamiento').then((r) => r.data)

export const getTipo = (id) =>
  api.get(`/tipos-entrenamiento/${id}`).then((r) => r.data)

export const crearTipo = (data) =>
  api.post('/tipos-entrenamiento', data).then((r) => r.data)

export const actualizarTipo = (id, data) =>
  api.put(`/tipos-entrenamiento/${id}`, data).then((r) => r.data)

export const eliminarTipo = (id) =>
  api.delete(`/tipos-entrenamiento/${id}`).then((r) => r.data)
