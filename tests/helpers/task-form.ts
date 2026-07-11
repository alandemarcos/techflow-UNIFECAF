import { fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

export async function openCreateTaskForm(
  user: ReturnType<typeof userEvent.setup>,
) {
  await user.click(screen.getByRole('button', { name: /nova tarefa/i }))
  await screen.findByRole('dialog', { name: 'Nova tarefa' })
}

export function fillTaskFormFields(
  title: string,
  responsible = 'Teste QA',
  dueDate = '2026-12-31',
) {
  fireEvent.change(screen.getByLabelText(/título/i), {
    target: { value: title },
  })
  fireEvent.change(screen.getByLabelText(/responsável/i), {
    target: { value: responsible },
  })
  fireEvent.change(screen.getByLabelText(/data limite/i), {
    target: { value: dueDate },
  })
}

export async function submitTaskForm(
  user: ReturnType<typeof userEvent.setup>,
) {
  await user.click(screen.getByRole('button', { name: 'Salvar' }))
}

export async function createTaskViaUi(
  user: ReturnType<typeof userEvent.setup>,
  title: string,
) {
  await openCreateTaskForm(user)
  fillTaskFormFields(title)
  await submitTaskForm(user)
}

export function getTableDataRows() {
  return screen.getAllByRole('row').slice(1)
}
