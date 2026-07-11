import { CheckCircle2, Clock, ListTodo, Loader2 } from 'lucide-react'
import { useTasks } from '@/hooks/useTasks'
import StatCard from '@/components/dashboard/StatCard'

function StatsGrid() {
  const { stats } = useTasks()

  const cards = [
    {
      title: 'Total de tarefas',
      value: stats.total,
      description: 'Tarefas cadastradas no sistema',
      icon: ListTodo,
      iconClassName: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    },
    {
      title: 'Em andamento',
      value: stats.inProgress,
      description: 'Tarefas sendo executadas agora',
      icon: Loader2,
      iconClassName: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    },
    {
      title: 'Concluídas',
      value: stats.completed,
      description: 'Tarefas finalizadas com sucesso',
      icon: CheckCircle2,
      iconClassName: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    },
    {
      title: 'Pendentes',
      value: stats.pending,
      description: 'Aguardando início de execução',
      icon: Clock,
      iconClassName: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <StatCard key={card.title} {...card} />
      ))}
    </div>
  )
}

export default StatsGrid
