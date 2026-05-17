import api from './axios'

export const getSesiones = (params) =>
  api.get('/sesiones', { params }).then((r) => r.data)

export const getSesion = (id) =>
  api.get(`/sesiones/${id}`).then((r) => r.data)

export const crearSesion = (data) =>
  api.post('/sesiones', data).then((r) => r.data)

export const actualizarSesion = (id, data) =>
  api.put(`/sesiones/${id}`, data).then((r) => r.data)

export const eliminarSesion = (id) =>
  api.delete(`/sesiones/${id}`).then((r) => r.data)

export const generarSesionIA = (alumnoEmail) =>
  api.get(`/sesiones/generar/${alumnoEmail}`).then((r) => r.data)
