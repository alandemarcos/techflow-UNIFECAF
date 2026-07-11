import { CheckCircle2, Clock, ListTodo, Loader2 } from 'lucide-react'
import { DASHBOARD_STATS } from '@/data/mock-tasks'
import StatCard from '@/components/dashboard/StatCard'

const stats = [
  {
    title: 'Total de tarefas',
    value: DASHBOARD_STATS.total,
    description: 'Tarefas cadastradas no sistema',
    icon: ListTodo,
    iconClassName: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  },
  {
    title: 'Em andamento',
    value: DASHBOARD_STATS.inProgress,
    description: 'Tarefas sendo executadas agora',
    icon: Loader2,
    iconClassName: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  },
  {
    title: 'Concluídas',
    value: DASHBOARD_STATS.completed,
    description: 'Tarefas finalizadas com sucesso',
    icon: CheckCircle2,
    iconClassName: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  },
  {
    title: 'Pendentes',
    value: DASHBOARD_STATS.pending,
    description: 'Aguardando início de execução',
    icon: Clock,
    iconClassName: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
  },
]

function StatsGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  )
}

export default StatsGrid
