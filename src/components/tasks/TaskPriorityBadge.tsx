import type { TaskPriority } from '@/types/task'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const priorityConfig: Record<
  TaskPriority,
  { label: string; className: string }
> = {
  Low: {
    label: 'Low',
    className: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  },
  Medium: {
    label: 'Medium',
    className: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  },
  High: {
    label: 'High',
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
