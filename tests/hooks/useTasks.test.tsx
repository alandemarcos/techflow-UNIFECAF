import { describe, expect, it } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { TasksProvider, useTasks } from '@/hooks/useTasks'
import { createValidFormData } from '../helpers/fixtures'
import type { ReactNode } from 'react'

function wrapper({ children }: { children: ReactNode }) {
  return <TasksProvider>{children}</TasksProvider>
}

describe('useTasks', () => {
  it('lança erro fora do provider', () => {
    expect(() => renderHook(() => useTasks())).toThrow(
      'useTasks deve ser usado dentro de TasksProvider',
    )
  })

  it('inicializa com tarefas padrão', () => {
    const { result } = renderHook(() => useTasks(), { wrapper })

    expect(result.current.tasks.length).toBeGreaterThan(0)
    expect(result.current.stats.total).toBe(result.current.tasks.length)
  })

  it('addTask adiciona nova tarefa', () => {
    const { result } = renderHook(() => useTasks(), { wrapper })
    const initialCount = result.current.tasks.length

    act(() => {
      result.current.addTask(createValidFormData({ title: 'Tarefa adicionada' }))
    })

    expect(result.current.tasks).toHaveLength(initialCount + 1)
    expect(result.current.tasks.at(-1)?.title).toBe('Tarefa adicionada')
  })

  it('updateTask atualiza tarefa existente', () => {
    const { result } = renderHook(() => useTasks(), { wrapper })
    const taskId = result.current.tasks[0].id

    act(() => {
      result.current.updateTask(
        taskId,
        createValidFormData({ title: 'Título atualizado via hook' }),
      )
    })

    const updated = result.current.getTaskById(taskId)
    expect(updated?.title).toBe('Título atualizado via hook')
  })

  it('updateTaskStatus altera status da tarefa', () => {
    const { result } = renderHook(() => useTasks(), { wrapper })
    const taskId = result.current.tasks[0].id

    act(() => {
      result.current.updateTaskStatus(taskId, 'Done')
    })

    expect(result.current.getTaskById(taskId)?.status).toBe('Done')
  })

  it('deleteTask remove tarefa', () => {
    const { result } = renderHook(() => useTasks(), { wrapper })
    const taskId = result.current.tasks[0].id
    const initialCount = result.current.tasks.length

    act(() => {
      result.current.deleteTask(taskId)
    })

    expect(result.current.tasks).toHaveLength(initialCount - 1)
    expect(result.current.getTaskById(taskId)).toBeUndefined()
  })

  it('getTaskById retorna tarefa pelo id', () => {
    const { result } = renderHook(() => useTasks(), { wrapper })
    const task = result.current.tasks[0]

    expect(result.current.getTaskById(task.id)).toEqual(task)
  })

  it('stats refletem estado atual das tarefas', () => {
    const { result } = renderHook(() => useTasks(), { wrapper })

    act(() => {
      result.current.addTask(
        createValidFormData({
          title: 'Alta prioridade',
          priority: 'High',
          status: 'To Do',
        }),
      )
    })

    expect(result.current.stats.highPriority).toBeGreaterThan(0)
    expect(result.current.stats.total).toBe(result.current.tasks.length)
  })
})
