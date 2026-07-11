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
  responsible?: string
  dueDate?: string
}

export const TASK_PRIORITIES: TaskPriority[] = ['Low', 'Medium', 'High']

export const TASK_STATUSES: TaskStatus[] = ['To Do', 'In Progress', 'Done']
