import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TaskForm from '@/components/tasks/TaskForm'
import { createMockTask, createValidFormData } from '../helpers/fixtures'
import { fillTaskFormFields } from '../helpers/task-form'
import { renderWithRouter } from '../helpers/render'
import * as dateUtils from '@/utils/date'

describe('TaskForm', () => {
  beforeEach(() => {
    vi.spyOn(dateUtils, 'getTodayDateString').mockReturnValue('2026-07-11')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renderiza formulário de nova tarefa', () => {
    renderWithRouter(
      <TaskForm open onOpenChange={vi.fn()} onSubmit={vi.fn()} />,
    )

    expect(screen.getByText('Nova tarefa')).toBeInTheDocument()
    expect(screen.getByLabelText(/título/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/responsável/i)).toBeInTheDocument()
  })

  it('renderiza formulário de edição com dados da tarefa', () => {
    const task = createMockTask()

    renderWithRouter(
      <TaskForm
        open
        task={task}
        onOpenChange={vi.fn()}
        onSubmit={vi.fn()}
      />,
    )

    expect(screen.getByText('Editar tarefa')).toBeInTheDocument()
    expect(screen.getByLabelText(/título/i)).toHaveValue(task.title)
    expect(screen.getByLabelText(/responsável/i)).toHaveValue(task.responsible)
  })

  it('exibe erros de validação ao submeter formulário inválido', async () => {
    const user = userEvent.setup()

    renderWithRouter(
      <TaskForm open onOpenChange={vi.fn()} onSubmit={vi.fn()} />,
    )

    await user.click(screen.getByRole('button', { name: 'Salvar' }))

    expect(screen.getByText('O título é obrigatório.')).toBeInTheDocument()
    expect(screen.getByText('O responsável é obrigatório.')).toBeInTheDocument()
    expect(screen.getByText('A data limite é obrigatória.')).toBeInTheDocument()
  })

  it('exibe erro de título mínimo', async () => {
    const user = userEvent.setup()

    renderWithRouter(
      <TaskForm open onOpenChange={vi.fn()} onSubmit={vi.fn()} />,
    )

    await user.type(screen.getByLabelText(/título/i), 'abc')
    await user.type(screen.getByLabelText(/responsável/i), 'Ana Silva')
    await user.type(screen.getByLabelText(/data limite/i), '2026-12-31')
    await user.click(screen.getByRole('button', { name: 'Salvar' }))

    expect(
      screen.getByText('O título deve ter no mínimo 5 caracteres.'),
    ).toBeInTheDocument()
  })

  it('exibe erro de descrição máxima', async () => {
    const user = userEvent.setup()

    renderWithRouter(
      <TaskForm open onOpenChange={vi.fn()} onSubmit={vi.fn()} />,
    )

    fillTaskFormFields('Título válido')
    fireEvent.change(screen.getByLabelText(/descrição/i), {
      target: { value: 'a'.repeat(501) },
    })
    await user.click(screen.getByRole('button', { name: 'Salvar' }))

    expect(
      screen.getByText('A descrição deve ter no máximo 500 caracteres.'),
    ).toBeInTheDocument()
  })

  it('chama onSubmit com dados válidos', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    const onOpenChange = vi.fn()
    const data = createValidFormData()

    renderWithRouter(
      <TaskForm open onOpenChange={onOpenChange} onSubmit={onSubmit} />,
    )

    await user.type(screen.getByLabelText(/título/i), data.title)
    await user.type(screen.getByLabelText(/responsável/i), data.responsible)
    await user.type(screen.getByLabelText(/data limite/i), data.dueDate)
    await user.click(screen.getByRole('button', { name: 'Salvar' }))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          title: data.title,
          responsible: data.responsible,
          dueDate: data.dueDate,
        }),
      )
    })
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('fecha ao clicar em cancelar', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()

    renderWithRouter(
      <TaskForm open onOpenChange={onOpenChange} onSubmit={vi.fn()} />,
    )

    await user.click(screen.getByRole('button', { name: 'Cancelar' }))

    expect(onOpenChange).toHaveBeenCalledWith(false)
  })
})
