import { describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TaskTable from '@/components/tasks/TaskTable'
import { createMockTasks } from '../helpers/fixtures'
import { renderWithRouter } from '../helpers/render'

const pagination = {
  currentPage: 1,
  totalPages: 1,
  totalItems: 3,
  pageSize: 10,
  hasNextPage: false,
  hasPreviousPage: false,
  onPageChange: vi.fn(),
  onNextPage: vi.fn(),
  onPreviousPage: vi.fn(),
}

describe('TaskTable', () => {
  const tasks = createMockTasks().slice(0, 3)

  it('renderiza tarefas na tabela', () => {
    renderWithRouter(
      <TaskTable
        tasks={tasks}
        totalFiltered={tasks.length}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        pagination={pagination}
      />,
    )

    expect(screen.getByText('Tarefas cadastradas')).toBeInTheDocument()
    expect(screen.getByText('Primeira tarefa')).toBeInTheDocument()
    expect(screen.getByText('3 tarefas encontradas')).toBeInTheDocument()
  })

  it('chama onEdit ao clicar em editar', async () => {
    const user = userEvent.setup()
    const onEdit = vi.fn()

    renderWithRouter(
      <TaskTable
        tasks={tasks}
        totalFiltered={tasks.length}
        onEdit={onEdit}
        onDelete={vi.fn()}
        pagination={pagination}
      />,
    )

    await user.click(
      screen.getByRole('button', { name: `Editar ${tasks[0].title}` }),
    )

    expect(onEdit).toHaveBeenCalledWith(tasks[0])
  })

  it('chama onDelete ao clicar em excluir', async () => {
    const user = userEvent.setup()
    const onDelete = vi.fn()

    renderWithRouter(
      <TaskTable
        tasks={tasks}
        totalFiltered={tasks.length}
        onEdit={vi.fn()}
        onDelete={onDelete}
        pagination={pagination}
      />,
    )

    await user.click(
      screen.getByRole('button', { name: `Excluir ${tasks[0].title}` }),
    )

    expect(onDelete).toHaveBeenCalledWith(tasks[0])
  })
})
