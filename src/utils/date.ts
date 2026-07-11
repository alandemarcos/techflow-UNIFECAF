export function formatDate(dateString: string) {
  const date = new Date(`${dateString}T00:00:00`)

  if (Number.isNaN(date.getTime())) return dateString

  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export function isValidDateString(value: string) {
  if (!value) return false

  const date = new Date(`${value}T00:00:00`)
  return !Number.isNaN(date.getTime())
}

export function getTodayDateString() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export function isTodayOrFutureDate(value: string) {
  if (!isValidDateString(value)) return false

  return value >= getTodayDateString()
}
