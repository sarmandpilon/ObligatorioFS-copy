import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Zap, Eye, EyeOff } from 'lucide-react'
import { registro } from '../api/auth'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ nombre: '', email: '', password: '', rol: 'profesor' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await registro(form.rol, { nombre: form.nombre, email: form.email, password: form.password })
      toast.success('Cuenta creada. ¡Iniciá sesión!')
      navigate('/login')
    } catch (err) {
      toast.error(err.response?.data?.message ?? 'Error al registrarse')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-900 p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-900/20 via-transparent to-purple-900/10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-600 mb-4">
            <Zap size={26} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Crear cuenta</h1>
          <p className="text-slate-400 mt-1 text-sm">Únete a RunCoach</p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Nombre</label>
              <input
                type="text"
                className="input"
                placeholder="Tu nombre"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                required
                autoFocus
              />
            </div>
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                className="input"
                placeholder="tu@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="label">Contraseña</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  className="input pr-11"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div>
              <label className="label">Rol</label>
              <div className="grid grid-cols-2 gap-3">
                {['profesor', 'alumno'].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setForm({ ...form, rol: r })}
                    className={`py-3 rounded-xl text-sm font-semibold border transition-all ${
                      form.rol === r
                        ? 'bg-brand-600/20 border-brand-500 text-brand-300'
                        : 'bg-surface-700 border-surface-500 text-slate-400 hover:border-surface-400'
                    }`}
                  >
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center mt-2">
              {loading ? 'Creando cuenta...' : 'Crear cuenta'}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-5">
            ¿Ya tenés cuenta?{' '}
            <Link to="/login" className="text-brand-400 hover:text-brand-300 font-medium transition-colors">
              Iniciar sesión
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
