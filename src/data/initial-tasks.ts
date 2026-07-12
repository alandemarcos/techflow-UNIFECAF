import type { Task } from '@/types/task'

/** Dados iniciais para demonstração do MVP (persistência em memória). */
export const INITIAL_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Definir backlog da Sprint 3',
    description: 'Levantar e priorizar os itens do backlog para a próxima sprint.',
    priority: 'High',
    status: 'In Progress',
    responsible: 'Ana Silva',
    dueDate: '2026-07-15',
    createdAt: '2026-07-01T10:00:00.000Z',
  },
  {
    id: 'task-2',
    title: 'Revisar documentação do projeto',
    description: 'Atualizar README e documentação técnica do TaskFlow.',
    priority: 'Medium',
    status: 'To Do',
    responsible: 'Carlos Mendes',
    dueDate: '2026-07-18',
    createdAt: '2026-07-02T14:30:00.000Z',
  },
  {
    id: 'task-3',
    title: 'Configurar ambiente de homologação',
    description: 'Preparar variáveis e deploy para ambiente de homologação.',
    priority: 'Low',
    status: 'Done',
    responsible: 'Mariana Costa',
    dueDate: '2026-07-10',
    createdAt: '2026-06-28T09:15:00.000Z',
  },
]
