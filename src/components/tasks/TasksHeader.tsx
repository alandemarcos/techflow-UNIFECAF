import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface TasksHeaderProps {
  onCreateTask: () => void
}

function TasksHeader({ onCreateTask }: TasksHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm text-muted-foreground">
          Visualize e gerencie todas as tarefas do projeto.
        </p>
      </div>
      <Button onClick={onCreateTask} className="w-full sm:w-auto">
        <Plus className="size-4" aria-hidden />
        Nova tarefa
      </Button>
    </div>
  )
}

export default TasksHeader
