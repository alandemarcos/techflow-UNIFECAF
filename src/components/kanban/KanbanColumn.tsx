import { useDroppable } from '@dnd-kit/core'
import type { Task } from '@/types/task'
import type { KanbanColumnConfig } from '@/hooks/useKanban'
import KanbanHeader from '@/components/kanban/KanbanHeader'
import KanbanCard from '@/components/kanban/KanbanCard'
import { cn } from '@/lib/utils'

interface KanbanColumnProps {
  column: KanbanColumnConfig
  tasks: Task[]
  activeTaskId: string | null
  onEdit?: (task: Task) => void
  onDelete?: (task: Task) => void
}

function KanbanColumn({
  column,
  tasks,
  activeTaskId,
  onEdit,
  onDelete,
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.status,
    data: { status: column.status },
  })

  return (
    <section
      className={cn(
        'flex w-full min-w-[280px] shrink-0 flex-col rounded-xl border bg-muted/20',
        'transition-colors duration-200',
        column.accentClass,
        isOver && 'border-primary/40 bg-primary/5',
      )}
    >
      <KanbanHeader column={column} taskCount={tasks.length} />

      <div
        ref={setNodeRef}
        className={cn(
          'flex min-h-[200px] flex-1 flex-col gap-3 p-3',
          'transition-colors duration-200',
          isOver && 'bg-primary/[0.02]',
        )}
      >
        {tasks.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-muted-foreground/20 px-4 py-10 text-center">
            <span className="text-2xl" aria-hidden>
              📭
            </span>
            <p className="text-sm text-muted-foreground">
              Nenhuma tarefa nesta etapa.
            </p>
          </div>
        ) : (
          tasks.map((task) => (
            <KanbanCard
              key={task.id}
              task={task}
              isDragging={activeTaskId === task.id}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </section>
  )
}

export default KanbanColumn
