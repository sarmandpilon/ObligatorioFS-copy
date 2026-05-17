import api from './axios'

export const getClima = (ciudad) =>
  api.get(`/clima/${encodeURIComponent(ciudad)}`).then((r) => r.data)
