import { describe, expect, it } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTaskList } from '@/hooks/useTaskList'
import { createMockTasks } from '../helpers/fixtures'

describe('useTaskList', () => {
  const tasks = createMockTasks()

  it('retorna todas as tarefas sem filtros ativos', () => {
    const { result } = renderHook(() => useTaskList(tasks))

    expect(result.current.filteredTasks).toHaveLength(tasks.length)
    expect(result.current.hasNoResults).toBe(false)
  })

  it('filtra tarefas por pesquisa', () => {
    const { result } = renderHook(() => useTaskList(tasks))

    act(() => {
      result.current.search.setQuery('primeira')
    })

    expect(result.current.filteredTasks).toHaveLength(1)
  })

  it('filtra tarefas por status', () => {
    const { result } = renderHook(() => useTaskList(tasks))

    act(() => {
      result.current.filters.updateFilter('status', 'Done')
    })

    expect(
      result.current.filteredTasks.every((task) => task.status === 'Done'),
    ).toBe(true)
  })

  it('indica quando não há resultados', () => {
    const { result } = renderHook(() => useTaskList(tasks))

    act(() => {
      result.current.search.setQuery('inexistente xyz')
    })

    expect(result.current.hasNoResults).toBe(true)
  })

  it('clearAllFilters restaura estado inicial', () => {
    const { result } = renderHook(() => useTaskList(tasks))

    act(() => {
      result.current.search.setQuery('primeira')
      result.current.filters.updateFilter('status', 'Done')
      result.current.clearAllFilters()
    })

    expect(result.current.search.query).toBe('')
    expect(result.current.filters.filters.status).toBe('all')
    expect(result.current.filteredTasks).toHaveLength(tasks.length)
  })

  it('pagina resultados filtrados', () => {
    const manyTasks = Array.from({ length: 15 }, (_, index) => ({
      ...tasks[0],
      id: `paginated-${index}`,
      title: `Tarefa paginada ${index + 1}`,
    }))

    const { result } = renderHook(() => useTaskList(manyTasks))

    expect(result.current.paginatedTasks).toHaveLength(10)
    expect(result.current.pagination.totalPages).toBe(2)
  })

  it('reseta página ao alterar filtros', () => {
    const manyTasks = Array.from({ length: 15 }, (_, index) => ({
      ...tasks[0],
      id: `reset-${index}`,
      title: `Tarefa reset ${index + 1}`,
    }))

    const { result } = renderHook(() => useTaskList(manyTasks))

    act(() => {
      result.current.pagination.setCurrentPage(2)
      result.current.search.setQuery('reset 15')
    })

    expect(result.current.pagination.currentPage).toBe(1)
  })

  it('calcula stats com base em todas as tarefas', () => {
    const { result } = renderHook(() => useTaskList(tasks))

    expect(result.current.stats.total).toBe(tasks.length)
  })
})
