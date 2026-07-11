import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

function SearchInput() {
  return (
    <div className="relative hidden w-full max-w-sm md:block">
      <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Pesquisar tarefas, projetos..."
        className="h-9 bg-muted/40 pl-9"
        readOnly
        aria-label="Pesquisar"
      />
    </div>
  )
}

export default SearchInput
