import { describe, expect, it } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTaskFilters } from '@/hooks/useTaskFilters'
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
    expect(result.current.isFiltered).toBe(true)
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
    expect(result.current.isFiltered).toBe(false)
  })

  it('setFilters permite definir todos os filtros', () => {
    const { result } = renderHook(() => useTaskFilters(tasks))

    act(() => {
      result.current.setFilters({
        status: 'In Progress',
        priority: 'Low',
        responsible: 'Ana Silva',
      })
    })

    expect(result.current.filters).toEqual({
      status: 'In Progress',
      priority: 'Low',
      responsible: 'Ana Silva',
    })
  })
})
