import type { TaskStatus } from '@/types/task'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const statusConfig: Record<TaskStatus, { label: string; className: string }> = {
  pendente: {
    label: 'Pendente',
    className: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
  },
  em_andamento: {
    label: 'Em andamento',
    className: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  },
  concluida: {
    label: 'Concluída',
    className: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  },
  cancelada: {
    label: 'Cancelada',
    className: 'bg-slate-500/10 text-slate-600 dark:text-slate-400',
  },
}

interface TaskStatusBadgeProps {
  status: TaskStatus
}

function TaskStatusBadge({ status }: TaskStatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <Badge variant="secondary" className={cn('font-medium', config.className)}>
      {config.label}
    </Badge>
  )
}

export default TaskStatusBadge
