import { ClipboardList, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import EmptyStateCard from '@/components/tasks/EmptyStateCard'

interface EmptyStateProps {
  onCreateTask: () => void
}

function EmptyState({ onCreateTask }: EmptyStateProps) {
  return (
    <EmptyStateCard
      icon={ClipboardList}
      title="Nenhuma tarefa cadastrada"
      description="Comece organizando seu fluxo de trabalho criando a primeira tarefa do projeto."
      action={
        <Button onClick={onCreateTask}>
          <Plus className="size-4" aria-hidden />
          Criar primeira tarefa
        </Button>
      }
    />
  )
}

export default EmptyState
