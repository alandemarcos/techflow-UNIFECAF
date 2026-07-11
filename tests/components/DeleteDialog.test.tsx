import { describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DeleteDialog from '@/components/tasks/DeleteDialog'
import { createMockTask } from '../helpers/fixtures'
import { renderWithRouter } from '../helpers/render'

describe('DeleteDialog', () => {
  const task = createMockTask()

  it('renderiza diálogo com informações da tarefa', () => {
    renderWithRouter(
      <DeleteDialog
        open
        task={task}
        onOpenChange={vi.fn()}
        onConfirm={vi.fn()}
      />,
    )

    expect(screen.getByText('Excluir tarefa')).toBeInTheDocument()
    expect(screen.getByText(task.title)).toBeInTheDocument()
  })

  it('chama onConfirm ao confirmar exclusão', async () => {
    const user = userEvent.setup()
    const onConfirm = vi.fn()

    renderWithRouter(
      <DeleteDialog
        open
        task={task}
        onOpenChange={vi.fn()}
        onConfirm={onConfirm}
      />,
    )

    await user.click(screen.getByRole('button', { name: 'Excluir' }))

    expect(onConfirm).toHaveBeenCalled()
  })

  it('cancela exclusão ao clicar em cancelar', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()

    renderWithRouter(
      <DeleteDialog
        open
        task={task}
        onOpenChange={onOpenChange}
        onConfirm={vi.fn()}
      />,
    )

    await user.click(screen.getByRole('button', { name: 'Cancelar' }))

    expect(onOpenChange).toHaveBeenCalledWith(false)
  })
})
