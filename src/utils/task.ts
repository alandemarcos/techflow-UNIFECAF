import type { Task, TaskFormData, TaskStatus } from '@/types/task'

function createTaskId() {
  return crypto.randomUUID()
}

export function createTaskFromForm(data: TaskFormData): Task {
  return {
    id: createTaskId(),
    title: data.title.trim(),
    description: data.description.trim(),
    responsible: data.responsible.trim(),
    priority: data.priority,
    status: data.status,
    dueDate: data.dueDate,
    createdAt: new Date().toISOString(),
  }
}

export function updateTaskFromForm(task: Task, data: TaskFormData): Task {
  return {
    ...task,
    title: data.title.trim(),
    description: data.description.trim(),
    responsible: data.responsible.trim(),
    priority: data.priority,
    status: data.status,
    dueDate: data.dueDate,
  }
}

export function getEmptyTaskForm(): TaskFormData {
  return {
    title: '',
    description: '',
    responsible: '',
    priority: 'Medium',
    status: 'To Do',
    dueDate: '',
  }
}

export function updateTaskStatus(task: Task, status: TaskStatus): Task {
  return { ...task, status }
}

export function taskToFormData(task: Task): TaskFormData {
  return {
    title: task.title,
    description: task.description,
    responsible: task.responsible,
    priority: task.priority,
    status: task.status,
    dueDate: task.dueDate,
  }
}
