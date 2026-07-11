import type { Task, TaskFormData } from '@/types/task'

export function createMockTask(overrides: Partial<Task> = {}): Task {
  return {
    id: 'task-mock-1',
    title: 'Tarefa de teste exemplo',
    description: 'Descrição da tarefa de teste.',
    priority: 'Medium',
    status: 'To Do',
    responsible: 'Ana Silva',
    dueDate: '2026-12-31',
    createdAt: '2026-07-01T10:00:00.000Z',
    ...overrides,
  }
}

export function createMockTasks(): Task[] {
  return [
    createMockTask({
      id: 'task-1',
      title: 'Primeira tarefa',
      status: 'To Do',
      priority: 'High',
      responsible: 'Ana Silva',
      dueDate: '2026-08-01',
    }),
    createMockTask({
      id: 'task-2',
      title: 'Segunda tarefa',
      description: 'Documentação do projeto',
      status: 'In Progress',
      priority: 'Medium',
      responsible: 'Carlos Mendes',
      dueDate: '2026-09-15',
    }),
    createMockTask({
      id: 'task-3',
      title: 'Terceira tarefa',
      status: 'Done',
      priority: 'Low',
      responsible: 'Mariana Costa',
      dueDate: '2026-07-20',
    }),
    createMockTask({
      id: 'task-4',
      title: 'Quarta tarefa',
      status: 'To Do',
      priority: 'Low',
      responsible: 'Ana Silva',
      dueDate: '2026-10-01',
    }),
    createMockTask({
      id: 'task-5',
      title: 'Quinta tarefa',
      status: 'In Progress',
      priority: 'High',
      responsible: 'Pedro Santos',
      dueDate: '2026-11-01',
    }),
  ]
}

export function createValidFormData(
  overrides: Partial<TaskFormData> = {},
): TaskFormData {
  return {
    title: 'Nova tarefa válida',
    description: 'Descrição da nova tarefa.',
    responsible: 'Ana Silva',
    priority: 'Medium',
    status: 'To Do',
    dueDate: '2026-12-31',
    ...overrides,
  }
}
