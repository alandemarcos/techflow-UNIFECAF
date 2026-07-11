import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Tasks from '@/pages/Tasks'
import { renderWithProviders } from '../helpers/render'
import {
  createTaskViaUi,
  fillTaskFormFields,
  getTableDataRows,
  openCreateTaskForm,
  submitTaskForm,
} from '../helpers/task-form'
import * as dateUtils from '@/utils/date'

describe('Tasks - CRUD', () => {
  beforeEach(() => {
    vi.spyOn(dateUtils, 'getTodayDateString').mockReturnValue('2026-07-11')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('cria nova tarefa', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Tasks />, { withTasks: true })

    const initialRows = getTableDataRows().length

    await createTaskViaUi(user, 'Tarefa criada nos testes')

    await waitFor(() => {
      expect(getTableDataRows().length).toBeGreaterThan(initialRows)
    })
  })

  it('edita tarefa existente', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Tasks />, { withTasks: true })

    await user.click(
      screen.getByRole('button', {
        name: /editar definir backlog da sprint 3/i,
      }),
    )

    fillTaskFormFields('Tarefa editada com sucesso')
    await submitTaskForm(user)

    await waitFor(() => {
      expect(
        screen.getByText('Tarefa editada com sucesso'),
      ).toBeInTheDocument()
    })
  })

  it('exclui tarefa após confirmação', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Tasks />, { withTasks: true })

    const taskTitle = 'Revisar documentação do projeto'

    await user.click(
      screen.getByRole('button', { name: new RegExp(`Excluir ${taskTitle}`, 'i') }),
    )
    await user.click(screen.getByRole('button', { name: 'Excluir' }))

    await waitFor(() => {
      expect(screen.queryByText(taskTitle)).not.toBeInTheDocument()
    })
  })

  it('cancela exclusão de tarefa', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Tasks />, { withTasks: true })

    const taskTitle = 'Revisar documentação do projeto'

    await user.click(
      screen.getByRole('button', { name: new RegExp(`Excluir ${taskTitle}`, 'i') }),
    )
    await user.click(screen.getByRole('button', { name: 'Cancelar' }))

    expect(screen.queryByRole('dialog', { name: /excluir tarefa/i })).not.toBeInTheDocument()
    expect(screen.getByText(taskTitle)).toBeInTheDocument()
  })
})

describe('Tasks - Validação', () => {
  beforeEach(() => {
    vi.spyOn(dateUtils, 'getTodayDateString').mockReturnValue('2026-07-11')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('exibe mensagens de erro de validação', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Tasks />, { withTasks: true })

    await openCreateTaskForm(user)
    await submitTaskForm(user)

    expect(screen.getByText('O título é obrigatório.')).toBeInTheDocument()
    expect(screen.getByText('O responsável é obrigatório.')).toBeInTheDocument()
    expect(screen.getByText('A data limite é obrigatória.')).toBeInTheDocument()
  })
})

describe('Tasks - Filtros e pesquisa', () => {
  it('pesquisa tarefa por texto', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Tasks />, { withTasks: true })

    await user.type(
      screen.getByRole('textbox', { name: /pesquisar tarefas/i }),
      'backlog',
    )

    expect(screen.getByText(/definir backlog/i)).toBeInTheDocument()
    expect(screen.queryByText(/revisar documentação/i)).not.toBeInTheDocument()
  })

  it('filtra por prioridade', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Tasks />, { withTasks: true })

    const prioritySelect = screen.getAllByRole('combobox')[1]
    await user.click(prioritySelect)
    await user.click(screen.getByRole('option', { name: 'High' }))

    getTableDataRows().forEach((row) => {
      expect(within(row).getByText('High')).toBeInTheDocument()
    })
  })

  it('filtra por status', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Tasks />, { withTasks: true })

    const statusSelect = screen.getAllByRole('combobox')[0]
    await user.click(statusSelect)
    await user.click(screen.getByRole('option', { name: 'Done' }))

    expect(screen.getByText(/configurar ambiente/i)).toBeInTheDocument()
    expect(screen.queryByText(/definir backlog/i)).not.toBeInTheDocument()
  })

  it('filtra por responsável', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Tasks />, { withTasks: true })

    const responsibleSelect = screen.getAllByRole('combobox')[2]
    await user.click(responsibleSelect)
    await user.click(screen.getByRole('option', { name: 'Ana Silva' }))

    expect(screen.getByText(/definir backlog/i)).toBeInTheDocument()

    getTableDataRows().forEach((row) => {
      expect(within(row).getByText('Ana Silva')).toBeInTheDocument()
      expect(within(row).queryByText('Carlos Mendes')).not.toBeInTheDocument()
    })
  })

  it('ordena tarefas por título', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Tasks />, { withTasks: true })

    const sortSelect = screen.getAllByRole('combobox')[3]
    await user.click(sortSelect)
    await user.click(screen.getByRole('option', { name: 'Título' }))

    const titles = getTableDataRows().map(
      (row) => within(row).getAllByRole('cell')[0].textContent?.trim(),
    )

    const sorted = [...titles].sort((a, b) =>
      (a ?? '').localeCompare(b ?? '', 'pt-BR'),
    )
    expect(titles).toEqual(sorted)
  })
})

describe('Tasks - Kanban', () => {
  it('renderiza colunas do kanban', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Tasks />, { withTasks: true })

    await user.click(screen.getByRole('button', { name: /kanban/i }))

    expect(screen.getByRole('heading', { name: 'To Do' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'In Progress' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Done' })).toBeInTheDocument()
  })

  it('exibe quantidade correta de cartões por coluna', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Tasks />, { withTasks: true })

    await user.click(screen.getByRole('button', { name: /kanban/i }))

    expect(screen.getAllByLabelText('1 tarefas')).toHaveLength(3)
  })

  it('exibe tarefas nas colunas corretas', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Tasks />, { withTasks: true })

    await user.click(screen.getByRole('button', { name: /kanban/i }))

    const todoSection = screen
      .getByRole('heading', { name: 'To Do' })
      .closest('section')

    expect(todoSection).toBeTruthy()
    expect(within(todoSection as HTMLElement).getByText(/revisar documentação/i)).toBeInTheDocument()
  })
})
