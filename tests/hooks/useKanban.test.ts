import { describe, expect, it, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useKanban, KANBAN_COLUMNS } from '@/hooks/useKanban'
import { createMockTasks } from '../helpers/fixtures'
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'

describe('useKanban', () => {
  const tasks = createMockTasks()

  it('exporta configuração das colunas', () => {
    expect(KANBAN_COLUMNS).toHaveLength(3)
    expect(KANBAN_COLUMNS.map((column) => column.status)).toEqual([
      'To Do',
      'In Progress',
      'Done',
    ])
  })

  it('agrupa tarefas por status nas colunas', () => {
    const { result } = renderHook(() =>
      useKanban({ tasks, onStatusChange: vi.fn() }),
    )

    expect(result.current.columns['To Do']).toHaveLength(2)
    expect(result.current.columns['In Progress']).toHaveLength(2)
    expect(result.current.columns.Done).toHaveLength(1)
  })

  it('handleDragStart define tarefa ativa', () => {
    const { result } = renderHook(() =>
      useKanban({ tasks, onStatusChange: vi.fn() }),
    )

    act(() => {
      result.current.handleDragStart({
        active: { id: 'task-1' },
      } as DragStartEvent)
    })

    expect(result.current.activeTask?.id).toBe('task-1')
  })

  it('handleDragCancel limpa tarefa ativa', () => {
    const { result } = renderHook(() =>
      useKanban({ tasks, onStatusChange: vi.fn() }),
    )

    act(() => {
      result.current.handleDragStart({
        active: { id: 'task-1' },
      } as DragStartEvent)
      result.current.handleDragCancel()
    })

    expect(result.current.activeTask).toBeNull()
  })

  it('handleDragEnd chama onStatusChange ao mover para outra coluna', () => {
    const onStatusChange = vi.fn()
    const { result } = renderHook(() =>
      useKanban({ tasks, onStatusChange }),
    )

    act(() => {
      result.current.handleDragEnd({
        active: { id: 'task-1' },
        over: { id: 'In Progress' },
      } as DragEndEvent)
    })

    expect(onStatusChange).toHaveBeenCalledWith('task-1', 'In Progress')
  })

  it('handleDragEnd não chama onStatusChange quando over é nulo', () => {
    const onStatusChange = vi.fn()
    const { result } = renderHook(() =>
      useKanban({ tasks, onStatusChange }),
    )

    act(() => {
      result.current.handleDragEnd({
        active: { id: 'task-1' },
        over: null,
      } as DragEndEvent)
    })

    expect(onStatusChange).not.toHaveBeenCalled()
  })

  it('handleDragEnd não chama onStatusChange para mesmo status', () => {
    const onStatusChange = vi.fn()
    const { result } = renderHook(() =>
      useKanban({ tasks, onStatusChange }),
    )

    act(() => {
      result.current.handleDragEnd({
        active: { id: 'task-1' },
        over: { id: 'To Do' },
      } as DragEndEvent)
    })

    expect(onStatusChange).not.toHaveBeenCalled()
  })

  it('handleDragEnd resolve status pelo id da tarefa de destino', () => {
    const onStatusChange = vi.fn()
    const { result } = renderHook(() =>
      useKanban({ tasks, onStatusChange }),
    )

    act(() => {
      result.current.handleDragEnd({
        active: { id: 'task-1' },
        over: { id: 'task-2' },
      } as DragEndEvent)
    })

    expect(onStatusChange).toHaveBeenCalledWith('task-1', 'In Progress')
  })

  it('expõe sensors e collisionDetection', () => {
    const { result } = renderHook(() =>
      useKanban({ tasks, onStatusChange: vi.fn() }),
    )

    expect(result.current.sensors).toBeDefined()
    expect(result.current.collisionDetection).toBeDefined()
  })
})
