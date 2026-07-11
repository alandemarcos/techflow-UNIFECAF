import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import {
  formatDate,
  isValidDateString,
  getTodayDateString,
  isTodayOrFutureDate,
} from '@/utils/date'

describe('formatDate', () => {
  it('formata data válida em pt-BR', () => {
    const formatted = formatDate('2026-07-15')
    expect(formatted).toMatch(/15/)
    expect(formatted).toMatch(/2026/)
  })

  it('retorna string original para data inválida', () => {
    expect(formatDate('invalida')).toBe('invalida')
  })
})

describe('isValidDateString', () => {
  it('retorna true para data válida', () => {
    expect(isValidDateString('2026-07-15')).toBe(true)
  })

  it('retorna false para string vazia', () => {
    expect(isValidDateString('')).toBe(false)
  })

  it('retorna false para data inválida', () => {
    expect(isValidDateString('abc')).toBe(false)
  })
})

describe('getTodayDateString', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-07-11T12:00:00'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('retorna data atual no formato YYYY-MM-DD', () => {
    expect(getTodayDateString()).toBe('2026-07-11')
  })
})

describe('isTodayOrFutureDate', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-07-11T12:00:00'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('retorna true para data futura', () => {
    expect(isTodayOrFutureDate('2026-12-31')).toBe(true)
  })

  it('retorna true para data de hoje', () => {
    expect(isTodayOrFutureDate('2026-07-11')).toBe(true)
  })

  it('retorna false para data passada', () => {
    expect(isTodayOrFutureDate('2026-01-01')).toBe(false)
  })
})
