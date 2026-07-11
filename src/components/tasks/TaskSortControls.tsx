import type { SortDirection, TaskSortField } from '@/types/task'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface TaskSortControlsProps {
  sortField: TaskSortField
  sortDirection: SortDirection
  onSortFieldChange: (field: TaskSortField) => void
  onSortDirectionChange: (direction: SortDirection) => void
}

const sortFieldLabels: Record<TaskSortField, string> = {
  title: 'Título',
  priority: 'Prioridade',
  status: 'Status',
  dueDate: 'Data de entrega',
}

function TaskSortControls({
  sortField,
  sortDirection,
  onSortFieldChange,
  onSortDirectionChange,
}: TaskSortControlsProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
      <div className="space-y-2 sm:flex-1">
        <Label>Ordenar por</Label>
        <Select
          value={sortField}
          onValueChange={(value) => onSortFieldChange(value as TaskSortField)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(sortFieldLabels).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2 sm:w-48">
        <Label>Ordem</Label>
        <Select
          value={sortDirection}
          onValueChange={(value) =>
            onSortDirectionChange(value as SortDirection)
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Crescente</SelectItem>
            <SelectItem value="desc">Decrescente</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default TaskSortControls
