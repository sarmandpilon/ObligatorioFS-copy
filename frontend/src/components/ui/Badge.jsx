export default function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-slate-700 text-slate-300',
    brand:   'bg-brand-500/20 text-brand-400 border border-brand-500/30',
    success: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    warning: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
    danger:  'bg-red-500/20 text-red-400 border border-red-500/30',
    premium: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
    plus:    'bg-brand-500/20 text-brand-400 border border-brand-500/30',
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}
