import type { TaskPriority } from '@/types/task'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const priorityConfig: Record<
  TaskPriority,
  { label: string; className: string }
> = {
  baixa: {
    label: 'Baixa',
    className: 'bg-slate-500/10 text-slate-600 dark:text-slate-400',
  },
  media: {
    label: 'Média',
    className: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  },
  alta: {
    label: 'Alta',
    className: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  },
  urgente: {
    label: 'Urgente',
    className: 'bg-red-500/10 text-red-600 dark:text-red-400',
  },
}

interface TaskPriorityBadgeProps {
  priority: TaskPriority
}

function TaskPriorityBadge({ priority }: TaskPriorityBadgeProps) {
  const config = priorityConfig[priority]

  return (
    <Badge variant="secondary" className={cn('font-medium', config.className)}>
      {config.label}
    </Badge>
  )
}

export default TaskPriorityBadge
