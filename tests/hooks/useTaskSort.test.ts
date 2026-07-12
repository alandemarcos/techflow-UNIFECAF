import { describe, expect, it } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTaskSort } from '@/hooks/useTaskSort'
import { createMockTasks } from '../helpers/fixtures'

describe('useTaskSort', () => {
  const tasks = createMockTasks()

  it('inicializa com ordenação padrão', () => {
    const { result } = renderHook(() => useTaskSort())

    expect(result.current.sort.field).toBe('dueDate')
    expect(result.current.sort.direction).toBe('asc')
  })

  it('updateSortField altera campo de ordenação', () => {
    const { result } = renderHook(() => useTaskSort())

    act(() => {
      result.current.updateSortField('title')
    })

    expect(result.current.sort.field).toBe('title')
  })

  it('updateSortDirection altera direção', () => {
    const { result } = renderHook(() => useTaskSort())

    act(() => {
      result.current.updateSortDirection('desc')
    })

    expect(result.current.sort.direction).toBe('desc')
  })

  it('applySort ordena tarefas', () => {
    const { result } = renderHook(() => useTaskSort())

    act(() => {
      result.current.updateSortField('title')
      result.current.updateSortDirection('asc')
    })

    const sorted = result.current.applySort(tasks)
    const titles = sorted.map((task) => task.title)
    expect(titles).toEqual([...titles].sort((a, b) => a.localeCompare(b, 'pt-BR')))
  })

  it('resetSort restaura ordenação padrão', () => {
    const { result } = renderHook(() => useTaskSort())

    act(() => {
      result.current.updateSortField('priority')
      result.current.resetSort()
    })

    expect(result.current.sort.field).toBe('dueDate')
    expect(result.current.sort.direction).toBe('asc')
  })

  it('updateSortField e updateSortDirection definem ordenação completa', () => {
    const { result } = renderHook(() => useTaskSort())

    act(() => {
      result.current.updateSortField('status')
      result.current.updateSortDirection('desc')
    })

    expect(result.current.sort).toEqual({ field: 'status', direction: 'desc' })
  })
})
