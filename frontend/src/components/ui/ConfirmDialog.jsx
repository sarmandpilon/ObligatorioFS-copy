import Modal from './Modal'
import { AlertTriangle } from 'lucide-react'

export default function ConfirmDialog({ open, onClose, onConfirm, title, message, loading }) {
  return (
    <Modal open={open} onClose={onClose} title={title} size="sm">
      <div className="flex gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
          <AlertTriangle size={18} className="text-red-400" />
        </div>
        <p className="text-slate-300 text-sm leading-relaxed">{message}</p>
      </div>
      <div className="flex justify-end gap-3 mt-6">
        <button onClick={onClose} className="btn-secondary">Cancelar</button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className="bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2"
        >
          {loading ? 'Eliminando...' : 'Eliminar'}
        </button>
      </div>
    </Modal>
  )
}
