import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, CalendarDays, Tag, CloudSun,
  UserCircle, LogOut, Zap,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import Badge from '../ui/Badge'

const nav = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/sesiones',  icon: CalendarDays,    label: 'Sesiones' },
  { to: '/tipos',     icon: Tag,             label: 'Tipos' },
  { to: '/clima',     icon: CloudSun,        label: 'Clima' },
]

export default function Sidebar() {
  const { user, logout, isProfesor } = useAuth()

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-surface-800 border-r border-surface-600 flex flex-col z-40">
      {/* Logo */}
      <div className="p-6 border-b border-surface-600">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center">
            <Zap size={18} className="text-white" />
          </div>
          <div>
            <p className="font-bold text-white text-base leading-none">RunCoach</p>
            <p className="text-xs text-slate-500 mt-0.5">Training Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {nav.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User profile */}
      <div className="p-4 border-t border-surface-600 space-y-3">
        <div className="flex items-center gap-3 px-2">
          {user?.fotoPerfil ? (
            <img src={user.fotoPerfil} alt="avatar" className="w-9 h-9 rounded-full object-cover ring-2 ring-surface-600" />
          ) : (
            <div className="w-9 h-9 rounded-full bg-brand-700 flex items-center justify-center text-sm font-bold text-white">
              {user?.nombre?.[0]?.toUpperCase() ?? '?'}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">{user?.nombre}</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Badge variant={user?.rol === 'profesor' ? 'brand' : 'success'} className="text-[10px]">
                {user?.rol}
              </Badge>
              {isProfesor && (
                <Badge variant={user?.plan === 'premium' ? 'premium' : 'plus'} className="text-[10px]">
                  {user?.plan}
                </Badge>
              )}
            </div>
          </div>
        </div>
        <button onClick={logout} className="nav-link w-full text-red-400 hover:text-red-300 hover:bg-red-500/10">
          <LogOut size={16} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}
