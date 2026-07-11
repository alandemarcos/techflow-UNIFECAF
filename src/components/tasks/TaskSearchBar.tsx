import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface TaskSearchBarProps {
  query: string
  onQueryChange: (query: string) => void
  onClear: () => void
}

function TaskSearchBar({ query, onQueryChange, onClear }: TaskSearchBarProps) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Pesquisar por título, descrição ou responsável..."
        className="pr-10 pl-9 transition-shadow focus-visible:shadow-sm"
        aria-label="Pesquisar tarefas"
      />
      {query && (
        <Tooltip>
          <TooltipTrigger>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={onClear}
              className="absolute top-1/2 right-1.5 -translate-y-1/2"
              aria-label="Limpar pesquisa"
            >
              <X className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Limpar pesquisa</TooltipContent>
        </Tooltip>
      )}
    </div>
  )
}

export default TaskSearchBar
