import { ClipboardList, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface EmptyStateProps {
  onCreateTask: () => void
}

function EmptyState({ onCreateTask }: EmptyStateProps) {
  return (
    <Card className="border-dashed shadow-sm">
      <CardHeader className="items-center text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-muted">
          <ClipboardList className="size-8 text-muted-foreground" />
        </div>
        <CardTitle>Nenhuma tarefa cadastrada</CardTitle>
        <CardDescription className="max-w-sm">
          Comece organizando seu fluxo de trabalho criando a primeira tarefa do
          projeto.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center pb-8">
        <Button onClick={onCreateTask}>
          <Plus className="size-4" />
          Criar primeira tarefa
        </Button>
      </CardContent>
    </Card>
  )
}

export default EmptyState
