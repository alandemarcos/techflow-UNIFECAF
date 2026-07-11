import type { Task } from '@/types/task'
import { Calendar, User } from 'lucide-react'
import TaskPriorityBadge from '@/components/tasks/TaskPriorityBadge'
import TaskStatusBadge from '@/components/tasks/TaskStatusBadge'
import { formatDate } from '@/utils/date'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface TaskCardProps {
  task: Task
}

function TaskCard({ task }: TaskCardProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <TaskPriorityBadge priority={task.priority} />
          <TaskStatusBadge status={task.status} />
        </div>
        <CardTitle className="line-clamp-1">{task.title}</CardTitle>
        {task.description && (
          <CardDescription className="line-clamp-2">
            {task.description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="flex flex-wrap gap-4 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <User className="size-3.5" />
          {task.responsible}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Calendar className="size-3.5" />
          {formatDate(task.dueDate)}
        </span>
      </CardContent>
    </Card>
  )
}

export default TaskCard
