import { describe, expect, it } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTaskFilters } from '@/hooks/useTaskFilters'
import { hasActiveFilters } from '@/utils/task-list'
import { createMockTasks } from '../helpers/fixtures'

describe('useTaskFilters', () => {
  const tasks = createMockTasks()

  it('inicializa com filtros padrão', () => {
    const { result } = renderHook(() => useTaskFilters(tasks))

    expect(result.current.filters.status).toBe('all')
    expect(result.current.filters.priority).toBe('all')
    expect(result.current.filters.responsible).toBe('all')
  })

  it('retorna opções de responsáveis únicos', () => {
    const { result } = renderHook(() => useTaskFilters(tasks))

    expect(result.current.responsibleOptions).toContain('Ana Silva')
    expect(result.current.responsibleOptions.length).toBe(4)
  })

  it('updateFilter atualiza filtro específico', () => {
    const { result } = renderHook(() => useTaskFilters(tasks))

    act(() => {
      result.current.updateFilter('status', 'Done')
    })

    expect(result.current.filters.status).toBe('Done')
    expect(hasActiveFilters(result.current.filters)).toBe(true)
  })

  it('applyFilters filtra tarefas corretamente', () => {
    const { result } = renderHook(() => useTaskFilters(tasks))

    act(() => {
      result.current.updateFilter('priority', 'High')
    })

    const filtered = result.current.applyFilters(tasks)
    expect(filtered.every((task) => task.priority === 'High')).toBe(true)
  })

  it('resetFilters restaura filtros padrão', () => {
    const { result } = renderHook(() => useTaskFilters(tasks))

    act(() => {
      result.current.updateFilter('status', 'Done')
      result.current.resetFilters()
    })

    expect(result.current.filters.status).toBe('all')
    expect(hasActiveFilters(result.current.filters)).toBe(false)
  })

  it('updateFilter permite definir múltiplos filtros', () => {
    const { result } = renderHook(() => useTaskFilters(tasks))

    act(() => {
      result.current.updateFilter('status', 'In Progress')
      result.current.updateFilter('priority', 'Low')
      result.current.updateFilter('responsible', 'Ana Silva')
    })

    expect(result.current.filters).toEqual({
      status: 'In Progress',
      priority: 'Low',
      responsible: 'Ana Silva',
    })
  })
})
