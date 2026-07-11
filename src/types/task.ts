export type TaskPriority = 'baixa' | 'media' | 'alta' | 'urgente'

export type TaskStatus = 'pendente' | 'em_andamento' | 'concluida' | 'cancelada'

export interface Task {
  id: string
  title: string
  priority: TaskPriority
  status: TaskStatus
  assignee: string
  dueDate: string
}
