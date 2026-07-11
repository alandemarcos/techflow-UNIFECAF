import { describe, expect, it } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTaskSearch } from '@/hooks/useTaskSearch'
import { createMockTasks } from '../helpers/fixtures'

describe('useTaskSearch', () => {
  const tasks = createMockTasks()

  it('inicializa com query vazia', () => {
    const { result } = renderHook(() => useTaskSearch())

    expect(result.current.query).toBe('')
  })

  it('setQuery atualiza a query', () => {
    const { result } = renderHook(() => useTaskSearch())

    act(() => {
      result.current.setQuery('primeira')
    })

    expect(result.current.query).toBe('primeira')
  })

  it('applySearch filtra tarefas pela query', () => {
    const { result } = renderHook(() => useTaskSearch())

    act(() => {
      result.current.setQuery('primeira')
    })

    const filtered = result.current.applySearch(tasks)
    expect(filtered).toHaveLength(1)
    expect(filtered[0].title).toBe('Primeira tarefa')
  })

  it('clearSearch limpa a query', () => {
    const { result } = renderHook(() => useTaskSearch())

    act(() => {
      result.current.setQuery('teste')
      result.current.clearSearch()
    })

    expect(result.current.query).toBe('')
  })
})
