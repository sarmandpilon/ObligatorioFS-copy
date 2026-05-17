import axios from 'axios'

const base = axios.create({ baseURL: '/v1', timeout: 15000 })

export const login = (data) => base.post('/auth/login', data).then((r) => r.data)

export const registro = (rol, data) =>
  base.post(`/auth/registro/${rol}`, data).then((r) => r.data)
