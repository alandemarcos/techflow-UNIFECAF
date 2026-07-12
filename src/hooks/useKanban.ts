import { useCallback, useMemo, useState } from 'react'
import {
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import type { Task, TaskStatus } from '@/types/task'
import { TASK_STATUSES } from '@/types/task'

export interface KanbanColumnConfig {
  status: TaskStatus
  title: string
  accentClass: string
  headerBgClass: string
  dotClass: string
}

export const KANBAN_COLUMNS: KanbanColumnConfig[] = [
  {
    status: 'To Do',
    title: 'To Do',
    accentClass: 'border-slate-200 dark:border-slate-700',
    headerBgClass: 'bg-slate-500/5',
    dotClass: 'bg-slate-400',
  },
  {
    status: 'In Progress',
    title: 'In Progress',
    accentClass: 'border-blue-200 dark:border-blue-800',
    headerBgClass: 'bg-blue-500/5',
    dotClass: 'bg-blue-500',
  },
  {
    status: 'Done',
    title: 'Done',
    accentClass: 'border-emerald-200 dark:border-emerald-800',
    headerBgClass: 'bg-emerald-500/5',
    dotClass: 'bg-emerald-500',
  },
]

export type KanbanColumnsMap = Record<TaskStatus, Task[]>

interface UseKanbanOptions {
  tasks: Task[]
  onStatusChange: (taskId: string, status: TaskStatus) => void
}

function groupTasksByStatus(tasks: Task[]): KanbanColumnsMap {
  return TASK_STATUSES.reduce<KanbanColumnsMap>((columns, status) => {
    columns[status] = tasks.filter((task) => task.status === status)
    return columns
  }, {} as KanbanColumnsMap)
}

/** Resolve o status alvo ao soltar um card sobre uma coluna ou outro card. */
function resolveTargetStatus(
  overId: string,
  tasks: Task[],
): TaskStatus | null {
  if (TASK_STATUSES.includes(overId as TaskStatus)) {
    return overId as TaskStatus
  }

  const overTask = tasks.find((task) => task.id === overId)
  return overTask?.status ?? null
}

export function useKanban({ tasks, onStatusChange }: UseKanbanOptions) {
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null)

  const columns = useMemo(() => groupTasksByStatus(tasks), [tasks])

  const activeTask = useMemo(
    () => tasks.find((task) => task.id === activeTaskId) ?? null,
    [tasks, activeTaskId],
  )

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveTaskId(String(event.active.id))
  }, [])

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      setActiveTaskId(null)

      if (!over) return

      const taskId = String(active.id)
      const task = tasks.find((item) => item.id === taskId)
      if (!task) return

      const targetStatus = resolveTargetStatus(String(over.id), tasks)
      if (!targetStatus || task.status === targetStatus) return

      onStatusChange(taskId, targetStatus)
    },
    [tasks, onStatusChange],
  )

  const handleDragCancel = useCallback(() => {
    setActiveTaskId(null)
  }, [])

  return {
    columns,
    activeTask,
    sensors,
    collisionDetection: closestCorners,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
  }
}
