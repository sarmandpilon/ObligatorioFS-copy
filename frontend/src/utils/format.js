export const formatDate = (dateStr) => {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export const formatDateTime = (dateStr) => {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const planLabel = (plan) => (plan === 'premium' ? 'Premium' : 'Plus')

export const planColor = (plan) =>
  plan === 'premium'
    ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
    : 'bg-brand-500/20 text-brand-400 border-brand-500/30'

export const weatherIcon = (description) => {
  const d = description?.toLowerCase() ?? ''
  if (d.includes('rain') || d.includes('drizzle')) return '🌧️'
  if (d.includes('storm') || d.includes('thunder')) return '⛈️'
  if (d.includes('snow')) return '❄️'
  if (d.includes('cloud')) return '☁️'
  if (d.includes('clear') || d.includes('sunny')) return '☀️'
  if (d.includes('mist') || d.includes('fog')) return '🌫️'
  return '🌤️'
}
