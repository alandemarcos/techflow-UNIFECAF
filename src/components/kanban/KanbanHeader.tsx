import type { KanbanColumnConfig } from '@/hooks/useKanban'
import { cn } from '@/lib/utils'

interface KanbanHeaderProps {
  column: KanbanColumnConfig
  taskCount: number
}

function KanbanHeader({ column, taskCount }: KanbanHeaderProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between rounded-t-xl border-b px-4 py-3',
        column.accentClass,
        column.headerBgClass,
      )}
    >
      <div className="flex items-center gap-2.5">
        <span
          className={cn('size-2 shrink-0 rounded-full', column.dotClass)}
          aria-hidden
        />
        <h3 className="text-sm font-semibold tracking-tight">{column.title}</h3>
      </div>
      <span
        className="inline-flex min-w-6 items-center justify-center rounded-full bg-background/80 px-2 py-0.5 text-xs font-medium text-muted-foreground tabular-nums"
        aria-label={`${taskCount} tarefas`}
      >
        {taskCount}
      </span>
    </div>
  )
}

export default KanbanHeader
