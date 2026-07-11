import { LayoutGrid, List } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export type TaskViewMode = 'list' | 'kanban'

interface ViewSwitcherProps {
  view: TaskViewMode
  onViewChange: (view: TaskViewMode) => void
}

function ViewSwitcher({ view, onViewChange }: ViewSwitcherProps) {
  return (
    <div
      className="inline-flex items-center gap-1 rounded-lg border bg-muted/40 p-1"
      role="group"
      aria-label="Seletor de visualização"
    >
      <Button
        type="button"
        variant={view === 'list' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('list')}
        className={cn(
          'gap-1.5 transition-all duration-200',
          view === 'list' && 'shadow-sm',
        )}
        aria-pressed={view === 'list'}
      >
        <List className="size-3.5" />
        Lista
      </Button>
      <Button
        type="button"
        variant={view === 'kanban' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('kanban')}
        className={cn(
          'gap-1.5 transition-all duration-200',
          view === 'kanban' && 'shadow-sm',
        )}
        aria-pressed={view === 'kanban'}
      >
        <LayoutGrid className="size-3.5" />
        Kanban
      </Button>
    </div>
  )
}

export default ViewSwitcher
