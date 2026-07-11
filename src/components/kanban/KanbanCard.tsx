import { useDraggable, useDroppable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import type { Task, TaskPriority } from '@/types/task'
import {
  AlertTriangle,
  ArrowDown,
  Calendar,
  CheckCircle2,
  Circle,
  GripVertical,
  Loader2,
  Minus,
  Pencil,
  Trash2,
  User,
} from 'lucide-react'
import TaskPriorityBadge from '@/components/tasks/TaskPriorityBadge'
import TaskStatusBadge from '@/components/tasks/TaskStatusBadge'
import { formatDate } from '@/utils/date'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const priorityIcons: Record<TaskPriority, typeof Minus> = {
  Low: ArrowDown,
  Medium: Minus,
  High: AlertTriangle,
}

const statusIcons = {
  'To Do': Circle,
  'In Progress': Loader2,
  Done: CheckCircle2,
} as const

interface KanbanCardContentProps {
  task: Task
  isDragging?: boolean
  onEdit?: (task: Task) => void
  onDelete?: (task: Task) => void
}

function KanbanCardContent({
  task,
  isDragging = false,
  onEdit,
  onDelete,
}: KanbanCardContentProps) {
  const PriorityIcon = priorityIcons[task.priority]
  const StatusIcon = statusIcons[task.status]

  return (
    <article
      className={cn(
        'group relative rounded-xl border bg-card p-3 shadow-sm',
        'transition-all duration-200 ease-out',
        !isDragging && 'hover:-translate-y-0.5 hover:border-border/80 hover:shadow-md',
        isDragging && 'cursor-grabbing shadow-xl ring-2 ring-primary/20',
        !isDragging && 'cursor-grab active:cursor-grabbing',
      )}
    >
      <div className="flex gap-2">
        <div
          className="mt-0.5 shrink-0 text-muted-foreground/50 transition-colors group-hover:text-muted-foreground"
          aria-hidden
        >
          <GripVertical className="size-4" />
        </div>

        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex min-w-0 items-start gap-2">
              <div
                className={cn(
                  'mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg',
                  'bg-muted/60 text-muted-foreground',
                )}
              >
                <PriorityIcon className="size-3.5" />
              </div>
              <div className="min-w-0">
                <h4 className="line-clamp-1 text-sm font-semibold leading-tight">
                  {task.title}
                </h4>
                {task.description && (
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                    {task.description}
                  </p>
                )}
              </div>
            </div>

            {!isDragging && (
              <div className="flex shrink-0 gap-0.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                {onEdit && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    onPointerDown={(event) => event.stopPropagation()}
                    onClick={(event) => {
                      event.stopPropagation()
                      onEdit(task)
                    }}
                    aria-label={`Editar ${task.title}`}
                  >
                    <Pencil className="size-3" />
                  </Button>
                )}
                {onDelete && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    onPointerDown={(event) => event.stopPropagation()}
                    onClick={(event) => {
                      event.stopPropagation()
                      onDelete(task)
                    }}
                    aria-label={`Excluir ${task.title}`}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="size-3" />
                  </Button>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5">
            <TaskPriorityBadge priority={task.priority} />
            <TaskStatusBadge status={task.status} />
          </div>

          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <User className="size-3" />
              <span className="truncate">{task.responsible}</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="size-3" />
              {formatDate(task.dueDate)}
            </span>
            <span className="inline-flex items-center gap-1">
              <StatusIcon
                className={cn(
                  'size-3',
                  task.status === 'In Progress' && 'animate-spin',
                )}
              />
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}

interface KanbanCardProps {
  task: Task
  isOverlay?: boolean
  isDragging?: boolean
  onEdit?: (task: Task) => void
  onDelete?: (task: Task) => void
}

function KanbanCard({
  task,
  isOverlay = false,
  isDragging = false,
  onEdit,
  onDelete,
}: KanbanCardProps) {
  const { attributes, listeners, setNodeRef: setDragRef, transform, isDragging: isDraggingState } =
    useDraggable({
      id: task.id,
      data: { task, status: task.status },
      disabled: isOverlay,
    })

  const { setNodeRef: setDropRef } = useDroppable({
    id: task.id,
    data: { task, status: task.status },
    disabled: isOverlay,
  })

  function setNodeRef(node: HTMLElement | null) {
    setDragRef(node)
    setDropRef(node)
  }

  const dragging = isDragging || isDraggingState

  if (isOverlay) {
    return (
      <KanbanCardContent
        task={task}
        isDragging
        onEdit={onEdit}
        onDelete={onDelete}
      />
    )
  }

  const style = transform
    ? { transform: CSS.Translate.toString(transform) }
    : undefined

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(dragging && 'opacity-40')}
      {...attributes}
      {...listeners}
    >
      <KanbanCardContent
        task={task}
        isDragging={dragging}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  )
}

export default KanbanCard
