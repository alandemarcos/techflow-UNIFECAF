import type { TaskPriority } from '@/types/task'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { AlertTriangle, ArrowDown, Minus } from 'lucide-react'

const priorityConfig: Record<
  TaskPriority,
  { label: string; className: string; icon: typeof Minus }
> = {
  Low: {
    label: 'Low',
    className:
      'border-emerald-200 bg-emerald-500/10 text-emerald-600 dark:border-emerald-800 dark:text-emerald-400',
    icon: ArrowDown,
  },
  Medium: {
    label: 'Medium',
    className:
      'border-amber-200 bg-amber-500/10 text-amber-600 dark:border-amber-800 dark:text-amber-400',
    icon: Minus,
  },
  High: {
    label: 'High',
    className:
      'border-red-200 bg-red-500/10 text-red-600 dark:border-red-800 dark:text-red-400',
    icon: AlertTriangle,
  },
}

interface TaskPriorityBadgeProps {
  priority: TaskPriority
}

function TaskPriorityBadge({ priority }: TaskPriorityBadgeProps) {
  const config = priorityConfig[priority]
  const Icon = config.icon

  return (
    <Badge
      variant="outline"
      className={cn('gap-1 font-medium', config.className)}
    >
      <Icon className="size-3" />
      {config.label}
    </Badge>
  )
}

export default TaskPriorityBadge
