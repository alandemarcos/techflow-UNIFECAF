import { FilterX, SearchX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import EmptyStateCard from '@/components/tasks/EmptyStateCard'

interface NoResultsStateProps {
  onClearFilters: () => void
}

function NoResultsState({ onClearFilters }: NoResultsStateProps) {
  return (
    <EmptyStateCard
      icon={SearchX}
      title="Nenhuma tarefa encontrada"
      description="Não há tarefas que correspondam aos filtros ou à pesquisa aplicada. Tente ajustar os critérios ou limpar os filtros."
      action={
        <Button variant="outline" onClick={onClearFilters}>
          <FilterX className="size-4" aria-hidden />
          Limpar filtros
        </Button>
      }
    />
  )
}

export default NoResultsState
