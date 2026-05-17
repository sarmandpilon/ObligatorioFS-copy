import { createContext, useContext, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { login as apiLogin } from '../api/auth'
import toast from 'react-hot-toast'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('user')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })
  const navigate = useNavigate()

  const login = useCallback(async (email, password) => {
    const data = await apiLogin({ email, password })
    const { token, usuario } = data
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(usuario))
    setUser(usuario)
    toast.success(`Bienvenido, ${usuario.nombre}`)
    navigate('/dashboard')
  }, [navigate])

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    navigate('/login')
    toast('Sesión cerrada')
  }, [navigate])

  return (
    <AuthContext.Provider value={{ user, login, logout, isProfesor: user?.rol === 'profesor' }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
