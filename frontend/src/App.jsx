import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Sesiones from './pages/Sesiones'
import SesionDetalle from './pages/SesionDetalle'
import Tipos from './pages/Tipos'
import Clima from './pages/Clima'

function PrivateRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" replace />
}

function PublicRoute({ children }) {
  const { user } = useAuth()
  return !user ? children : <Navigate to="/dashboard" replace />
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/sesiones" element={<PrivateRoute><Sesiones /></PrivateRoute>} />
      <Route path="/sesiones/:id" element={<PrivateRoute><SesionDetalle /></PrivateRoute>} />
      <Route path="/tipos" element={<PrivateRoute><Tipos /></PrivateRoute>} />
      <Route path="/clima" element={<PrivateRoute><Clima /></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}
