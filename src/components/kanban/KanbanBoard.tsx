import {
  DndContext,
  DragOverlay,
} from '@dnd-kit/core'
import type { Task, TaskStatus } from '@/types/task'
import { useKanban, KANBAN_COLUMNS } from '@/hooks/useKanban'
import KanbanColumn from '@/components/kanban/KanbanColumn'
import KanbanCard from '@/components/kanban/KanbanCard'

interface KanbanBoardProps {
  tasks: Task[]
  onStatusChange: (taskId: string, status: TaskStatus) => void
  onEdit?: (task: Task) => void
  onDelete?: (task: Task) => void
}

function KanbanBoard({
  tasks,
  onStatusChange,
  onEdit,
  onDelete,
}: KanbanBoardProps) {
  const {
    columns,
    activeTask,
    sensors,
    collisionDetection,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
  } = useKanban({ tasks, onStatusChange })

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetection}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="flex flex-col gap-4">
        <div
          className="flex gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-3 lg:overflow-visible"
          role="region"
          aria-label="Quadro Kanban"
        >
          {KANBAN_COLUMNS.map((column) => (
            <KanbanColumn
              key={column.status}
              column={column}
              tasks={columns[column.status]}
              activeTaskId={activeTask?.id ?? null}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      </div>

      <DragOverlay dropAnimation={{ duration: 200, easing: 'ease' }}>
        {activeTask ? (
          <KanbanCard task={activeTask} isOverlay />
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

export default KanbanBoard
