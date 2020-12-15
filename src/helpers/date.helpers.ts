export function date(initial: Date | string): string {
  return new Date(initial).toLocaleDateString()
}

export function time(initial: Date | string): string {
  return new Date(initial).toLocaleTimeString()
}

export function dateTime(initial: Date | string): string {
  return `${date(initial)} ${time(initial)}`
}