import type { Task } from '@/types/task'

export const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Definir backlog da Sprint 3',
    priority: 'alta',
    status: 'em_andamento',
    assignee: 'Ana Silva',
    dueDate: '2026-07-15',
  },
  {
    id: '2',
    title: 'Revisar documentação do projeto',
    priority: 'media',
    status: 'pendente',
    assignee: 'Carlos Mendes',
    dueDate: '2026-07-18',
  },
  {
    id: '3',
    title: 'Configurar ambiente de homologação',
    priority: 'urgente',
    status: 'em_andamento',
    assignee: 'Mariana Costa',
    dueDate: '2026-07-12',
  },
  {
    id: '4',
    title: 'Implementar autenticação de usuários',
    priority: 'alta',
    status: 'pendente',
    assignee: 'Pedro Alves',
    dueDate: '2026-07-25',
  },
  {
    id: '5',
    title: 'Criar protótipo do Kanban',
    priority: 'baixa',
    status: 'concluida',
    assignee: 'Julia Ferreira',
    dueDate: '2026-07-08',
  },
  {
    id: '6',
    title: 'Validar requisitos com stakeholders',
    priority: 'media',
    status: 'concluida',
    assignee: 'Ana Silva',
    dueDate: '2026-07-05',
  },
]

export const DASHBOARD_STATS = {
  total: 48,
  inProgress: 12,
  completed: 28,
  pending: 8,
}
