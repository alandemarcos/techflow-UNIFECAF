import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import {
  validateTaskForm,
  hasFormErrors,
} from '@/utils/validation'
import { createValidFormData } from '../helpers/fixtures'
import * as dateUtils from '@/utils/date'

describe('validateTaskForm', () => {
  beforeEach(() => {
    vi.spyOn(dateUtils, 'getTodayDateString').mockReturnValue('2026-07-11')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('retorna erro quando título está vazio', () => {
    const errors = validateTaskForm(
      createValidFormData({ title: '   ' }),
    )

    expect(errors.title).toBe('O título é obrigatório.')
  })

  it('retorna erro quando título é menor que o mínimo', () => {
    const errors = validateTaskForm(
      createValidFormData({ title: 'abc' }),
    )

    expect(errors.title).toBe('O título deve ter no mínimo 5 caracteres.')
  })

  it('retorna erro quando responsável está vazio', () => {
    const errors = validateTaskForm(
      createValidFormData({ responsible: '' }),
    )

    expect(errors.responsible).toBe('O responsável é obrigatório.')
  })

  it('retorna erro quando descrição excede o máximo', () => {
    const errors = validateTaskForm(
      createValidFormData({ description: 'a'.repeat(501) }),
    )

    expect(errors.description).toBe(
      'A descrição deve ter no máximo 500 caracteres.',
    )
  })

  it('retorna erro quando data está vazia', () => {
    const errors = validateTaskForm(
      createValidFormData({ dueDate: '' }),
    )

    expect(errors.dueDate).toBe('A data limite é obrigatória.')
  })

  it('retorna erro quando data é inválida', () => {
    const errors = validateTaskForm(
      createValidFormData({ dueDate: 'data-invalida' }),
    )

    expect(errors.dueDate).toBe('Informe uma data válida.')
  })

  it('retorna erro quando data é anterior ao dia atual', () => {
    const errors = validateTaskForm(
      createValidFormData({ dueDate: '2026-07-10' }),
    )

    expect(errors.dueDate).toBe('A data não pode ser anterior ao dia atual.')
  })

  it('permite data passada ao editar tarefa com mesma data original', () => {
    const errors = validateTaskForm(
      createValidFormData({ dueDate: '2026-07-10' }),
      { originalDueDate: '2026-07-10' },
    )

    expect(errors.dueDate).toBeUndefined()
  })

  it('não retorna erros para formulário válido', () => {
    const errors = validateTaskForm(createValidFormData())

    expect(errors).toEqual({})
  })
})

describe('hasFormErrors', () => {
  it('retorna true quando há erros', () => {
    expect(hasFormErrors({ title: 'Erro' })).toBe(true)
  })

  it('retorna false quando não há erros', () => {
    expect(hasFormErrors({})).toBe(false)
  })
})
