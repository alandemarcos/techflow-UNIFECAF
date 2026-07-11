export type TaskPriority = 'Low' | 'Medium' | 'High'

export type TaskStatus = 'To Do' | 'In Progress' | 'Done'

export interface Task {
  id: string
  title: string
  description: string
  priority: TaskPriority
  status: TaskStatus
  responsible: string
  dueDate: string
  createdAt: string
}

export interface TaskFormData {
  title: string
  description: string
  responsible: string
  priority: TaskPriority
  status: TaskStatus
  dueDate: string
}

export interface TaskFormErrors {
  title?: string
  description?: string
  responsible?: string
  dueDate?: string
}

export type TaskStatusFilter = TaskStatus | 'all'
export type TaskPriorityFilter = TaskPriority | 'all'
export type TaskSortField = 'title' | 'priority' | 'status' | 'dueDate'
export type SortDirection = 'asc' | 'desc'

export interface TaskFilters {
  status: TaskStatusFilter
  priority: TaskPriorityFilter
  responsible: string
}

export interface TaskSort {
  field: TaskSortField
  direction: SortDirection
}

export interface TaskListStats {
  total: number
  pending: number
  inProgress: number
  completed: number
  highPriority: number
}

export const TASK_PRIORITIES: TaskPriority[] = ['Low', 'Medium', 'High']

export const TASK_STATUSES: TaskStatus[] = ['To Do', 'In Progress', 'Done']

export const DEFAULT_TASK_FILTERS: TaskFilters = {
  status: 'all',
  priority: 'all',
  responsible: 'all',
}

export const DEFAULT_TASK_SORT: TaskSort = {
  field: 'dueDate',
  direction: 'asc',
}

export const DESCRIPTION_MAX_LENGTH = 500
export const TITLE_MIN_LENGTH = 5
