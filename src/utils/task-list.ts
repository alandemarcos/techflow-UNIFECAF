import type {
  Task,
  TaskFilters,
  TaskListStats,
  TaskPriority,
  TaskSort,
  TaskStatus,
} from '@/types/task'

const PRIORITY_ORDER: Record<TaskPriority, number> = {
  Low: 1,
  Medium: 2,
  High: 3,
}

const STATUS_ORDER: Record<TaskStatus, number> = {
  'To Do': 1,
  'In Progress': 2,
  Done: 3,
}

export function filterTasksBySearch(tasks: Task[], query: string): Task[] {
  const normalizedQuery = query.trim().toLowerCase()
  if (!normalizedQuery) return tasks

  return tasks.filter((task) => {
    const searchableText = [
      task.title,
      task.description,
      task.responsible,
    ]
      .join(' ')
      .toLowerCase()

    return searchableText.includes(normalizedQuery)
  })
}

export function filterTasksByFilters(
  tasks: Task[],
  filters: TaskFilters,
): Task[] {
  return tasks.filter((task) => {
    if (filters.status !== 'all' && task.status !== filters.status) {
      return false
    }

    if (filters.priority !== 'all' && task.priority !== filters.priority) {
      return false
    }

    if (
      filters.responsible !== 'all' &&
      task.responsible !== filters.responsible
    ) {
      return false
    }

    return true
  })
}

export function sortTasks(tasks: Task[], sort: TaskSort): Task[] {
  const sorted = [...tasks]

  sorted.sort((a, b) => {
    const direction = sort.direction === 'asc' ? 1 : -1

    switch (sort.field) {
      case 'title':
        return a.title.localeCompare(b.title, 'pt-BR') * direction
      case 'priority':
        return (
          (PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]) * direction
        )
      case 'status':
        return (STATUS_ORDER[a.status] - STATUS_ORDER[b.status]) * direction
      case 'dueDate':
        return a.dueDate.localeCompare(b.dueDate) * direction
      default:
        return 0
    }
  })

  return sorted
}

export function computeTaskListStats(tasks: Task[]): TaskListStats {
  return {
    total: tasks.length,
    pending: tasks.filter((task) => task.status === 'To Do').length,
    inProgress: tasks.filter((task) => task.status === 'In Progress').length,
    completed: tasks.filter((task) => task.status === 'Done').length,
    highPriority: tasks.filter((task) => task.priority === 'High').length,
  }
}

export function getUniqueResponsibles(tasks: Task[]): string[] {
  return [...new Set(tasks.map((task) => task.responsible))].sort((a, b) =>
    a.localeCompare(b, 'pt-BR'),
  )
}

export function hasActiveFilters(filters: TaskFilters): boolean {
  return (
    filters.status !== 'all' ||
    filters.priority !== 'all' ||
    filters.responsible !== 'all'
  )
}

export function hasActiveSearch(query: string): boolean {
  return query.trim().length > 0
}
