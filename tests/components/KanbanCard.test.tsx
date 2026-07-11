import { describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import KanbanCard from '@/components/kanban/KanbanCard'
import { createMockTask } from '../helpers/fixtures'
import { renderWithRouter } from '../helpers/render'
import { DndWrapper } from '../helpers/dnd'

describe('KanbanCard', () => {
  const task = createMockTask()

  it('renderiza título e responsável', () => {
    renderWithRouter(
      <DndWrapper>
        <KanbanCard task={task} />
      </DndWrapper>,
    )

    expect(screen.getByText(task.title)).toBeInTheDocument()
    expect(screen.getByText(task.responsible)).toBeInTheDocument()
  })

  it('chama onEdit ao clicar no botão de editar', async () => {
    const user = userEvent.setup()
    const onEdit = vi.fn()

    renderWithRouter(
      <DndWrapper>
        <KanbanCard task={task} onEdit={onEdit} />
      </DndWrapper>,
    )

    await user.click(
      screen.getByRole('button', { name: `Editar ${task.title}` }),
    )

    expect(onEdit).toHaveBeenCalledWith(task)
  })

  it('chama onDelete ao clicar no botão de excluir', async () => {
    const user = userEvent.setup()
    const onDelete = vi.fn()

    renderWithRouter(
      <DndWrapper>
        <KanbanCard task={task} onDelete={onDelete} />
      </DndWrapper>,
    )

    await user.click(
      screen.getByRole('button', { name: `Excluir ${task.title}` }),
    )

    expect(onDelete).toHaveBeenCalledWith(task)
  })
})
