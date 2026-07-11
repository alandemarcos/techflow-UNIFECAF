import type { TaskStatus } from '@/types/task'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const statusConfig: Record<TaskStatus, { label: string; className: string }> = {
  'To Do': {
    label: 'To Do',
    className: 'bg-slate-500/10 text-slate-600 dark:text-slate-400',
  },
  'In Progress': {
    label: 'In Progress',
    className: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  },
  Done: {
    label: 'Done',
    className: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
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
