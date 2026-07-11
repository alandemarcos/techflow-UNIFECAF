import { describe, expect, it } from 'vitest'
import {
  filterTasksBySearch,
  filterTasksByFilters,
  sortTasks,
  computeTaskListStats,
  getUniqueResponsibles,
  hasActiveFilters,
  hasActiveSearch,
} from '@/utils/task-list'
import { createMockTasks } from '../helpers/fixtures'
import { DEFAULT_TASK_FILTERS, DEFAULT_TASK_SORT } from '@/types/task'

describe('filterTasksBySearch', () => {
  const tasks = createMockTasks()

  it('retorna todas as tarefas quando query está vazia', () => {
    expect(filterTasksBySearch(tasks, '')).toHaveLength(tasks.length)
  })

  it('filtra por título', () => {
    const result = filterTasksBySearch(tasks, 'primeira')
    expect(result).toHaveLength(1)
    expect(result[0].title).toBe('Primeira tarefa')
  })

  it('filtra por descrição', () => {
    const result = filterTasksBySearch(tasks, 'documentação')
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('task-2')
  })

  it('filtra por responsável', () => {
    const result = filterTasksBySearch(tasks, 'mariana')
    expect(result).toHaveLength(1)
    expect(result[0].responsible).toBe('Mariana Costa')
  })
})

describe('filterTasksByFilters', () => {
  const tasks = createMockTasks()

  it('filtra por status', () => {
    const result = filterTasksByFilters(tasks, {
      ...DEFAULT_TASK_FILTERS,
      status: 'Done',
    })

    expect(result.every((task) => task.status === 'Done')).toBe(true)
  })

  it('filtra por prioridade', () => {
    const result = filterTasksByFilters(tasks, {
      ...DEFAULT_TASK_FILTERS,
      priority: 'High',
    })

    expect(result.every((task) => task.priority === 'High')).toBe(true)
  })

  it('filtra por responsável', () => {
    const result = filterTasksByFilters(tasks, {
      ...DEFAULT_TASK_FILTERS,
      responsible: 'Ana Silva',
    })

    expect(result.every((task) => task.responsible === 'Ana Silva')).toBe(true)
  })
})

describe('sortTasks', () => {
  const tasks = createMockTasks()

  it('ordena por título em ordem crescente', () => {
    const sorted = sortTasks(tasks, { field: 'title', direction: 'asc' })
    const titles = sorted.map((task) => task.title)

    expect(titles).toEqual([...titles].sort((a, b) => a.localeCompare(b, 'pt-BR')))
  })

  it('ordena por prioridade em ordem decrescente', () => {
    const sorted = sortTasks(tasks, { field: 'priority', direction: 'desc' })
    expect(sorted[0].priority).toBe('High')
  })

  it('ordena por status', () => {
    const sorted = sortTasks(tasks, { field: 'status', direction: 'asc' })
    expect(sorted[0].status).toBe('To Do')
  })

  it('ordena por data de entrega', () => {
    const sorted = sortTasks(tasks, DEFAULT_TASK_SORT)
    const dates = sorted.map((task) => task.dueDate)

    expect(dates).toEqual([...dates].sort())
  })
})

describe('computeTaskListStats', () => {
  it('calcula estatísticas corretamente', () => {
    const stats = computeTaskListStats(createMockTasks())

    expect(stats.total).toBe(5)
    expect(stats.pending).toBe(2)
    expect(stats.inProgress).toBe(2)
    expect(stats.completed).toBe(1)
    expect(stats.highPriority).toBe(2)
  })
})

describe('getUniqueResponsibles', () => {
  it('retorna responsáveis únicos ordenados', () => {
    const responsibles = getUniqueResponsibles(createMockTasks())

    expect(responsibles).toEqual([
      'Ana Silva',
      'Carlos Mendes',
      'Mariana Costa',
      'Pedro Santos',
    ])
  })
})

describe('hasActiveFilters', () => {
  it('retorna false para filtros padrão', () => {
    expect(hasActiveFilters(DEFAULT_TASK_FILTERS)).toBe(false)
  })

  it('retorna true quando algum filtro está ativo', () => {
    expect(
      hasActiveFilters({ ...DEFAULT_TASK_FILTERS, status: 'Done' }),
    ).toBe(true)
  })
})

describe('hasActiveSearch', () => {
  it('retorna false para query vazia', () => {
    expect(hasActiveSearch('')).toBe(false)
  })

  it('retorna true para query com texto', () => {
    expect(hasActiveSearch('teste')).toBe(true)
  })
})
