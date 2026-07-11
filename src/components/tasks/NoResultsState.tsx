import { FilterX, SearchX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface NoResultsStateProps {
  onClearFilters: () => void
}

function NoResultsState({ onClearFilters }: NoResultsStateProps) {
  return (
    <Card className="border-dashed shadow-sm animate-in fade-in-50 duration-300">
      <CardHeader className="items-center text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-muted">
          <SearchX className="size-8 text-muted-foreground" />
        </div>
        <CardTitle>Nenhuma tarefa encontrada.</CardTitle>
        <CardDescription className="max-w-sm">
          Não há tarefas que correspondam aos filtros ou à pesquisa aplicada.
          Tente ajustar os critérios ou limpar os filtros.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center pb-8">
        <Button variant="outline" onClick={onClearFilters}>
          <FilterX className="size-4" />
          Limpar filtros
        </Button>
      </CardContent>
    </Card>
  )
}

export default NoResultsState
