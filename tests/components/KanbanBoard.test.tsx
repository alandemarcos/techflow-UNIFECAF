import { describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'
import KanbanBoard from '@/components/kanban/KanbanBoard'
import { createMockTasks } from '../helpers/fixtures'
import { renderWithRouter } from '../helpers/render'

describe('KanbanBoard', () => {
  const tasks = createMockTasks()

  it('renderiza três colunas', () => {
    renderWithRouter(
      <KanbanBoard
        tasks={tasks}
        onStatusChange={vi.fn()}
      />,
    )

    expect(screen.getByRole('heading', { name: 'To Do' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'In Progress' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Done' })).toBeInTheDocument()
  })

  it('distribui cartões nas colunas corretas', () => {
    renderWithRouter(
      <KanbanBoard
        tasks={tasks}
        onStatusChange={vi.fn()}
      />,
    )

    expect(screen.getAllByLabelText('2 tarefas')).toHaveLength(2)
    expect(screen.getByLabelText('1 tarefas')).toBeInTheDocument()
  })
})
