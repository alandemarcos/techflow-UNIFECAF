import type { TaskStatus } from '@/types/task'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { CheckCircle2, Circle, Loader2 } from 'lucide-react'

const statusConfig: Record<
  TaskStatus,
  { label: string; className: string; icon: typeof Circle }
> = {
  'To Do': {
    label: 'To Do',
    className:
      'border-slate-200 bg-slate-500/10 text-slate-600 dark:border-slate-700 dark:text-slate-400',
    icon: Circle,
  },
  'In Progress': {
    label: 'In Progress',
    className:
      'border-blue-200 bg-blue-500/10 text-blue-600 dark:border-blue-800 dark:text-blue-400',
    icon: Loader2,
  },
  Done: {
    label: 'Done',
    className:
      'border-emerald-200 bg-emerald-500/10 text-emerald-600 dark:border-emerald-800 dark:text-emerald-400',
    icon: CheckCircle2,
  },
}

interface TaskStatusBadgeProps {
  status: TaskStatus
}

function TaskStatusBadge({ status }: TaskStatusBadgeProps) {
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <Badge
      variant="outline"
      className={cn('gap-1 font-medium', config.className)}
    >
      <Icon
        className={cn('size-3', status === 'In Progress' && 'animate-spin')}
      />
      {config.label}
    </Badge>
  )
}

export default TaskStatusBadge
