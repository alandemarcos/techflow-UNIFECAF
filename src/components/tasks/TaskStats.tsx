import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  ListTodo,
  Loader2,
} from 'lucide-react'
import type { TaskListStats } from '@/types/task'
import StatCard from '@/components/dashboard/StatCard'

interface TaskStatsProps {
  stats: TaskListStats
}

const statCards = [
  {
    key: 'total' as const,
    title: 'Total de tarefas',
    description: 'Tarefas cadastradas',
    icon: ListTodo,
    iconClassName: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  },
  {
    key: 'pending' as const,
    title: 'Pendentes',
    description: 'Aguardando início',
    icon: Clock,
    iconClassName: 'bg-slate-500/10 text-slate-600 dark:text-slate-400',
  },
  {
    key: 'inProgress' as const,
    title: 'Em andamento',
    description: 'Sendo executadas',
    icon: Loader2,
    iconClassName: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  },
  {
    key: 'completed' as const,
    title: 'Concluídas',
    description: 'Finalizadas com sucesso',
    icon: CheckCircle2,
    iconClassName: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  },
  {
    key: 'highPriority' as const,
    title: 'Alta prioridade',
    description: 'Tarefas urgentes',
    icon: AlertTriangle,
    iconClassName: 'bg-red-500/10 text-red-600 dark:text-red-400',
  },
]

function TaskStats({ stats }: TaskStatsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {statCards.map((card) => (
        <StatCard
          key={card.key}
          title={card.title}
          value={stats[card.key]}
          description={card.description}
          icon={card.icon}
          iconClassName={card.iconClassName}
        />
      ))}
    </div>
  )
}

export default TaskStats
