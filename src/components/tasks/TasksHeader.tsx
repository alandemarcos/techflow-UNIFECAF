import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

function TasksHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm text-muted-foreground">
          Visualize e gerencie todas as tarefas do projeto.
        </p>
      </div>
      <Button>
        <Plus className="size-4" />
        Nova tarefa
      </Button>
    </div>
  )
}

export default TasksHeader
