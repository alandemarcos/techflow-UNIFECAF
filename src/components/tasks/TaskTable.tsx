import type { Task } from '@/types/task'
import { Pencil, Trash2 } from 'lucide-react'
import TaskPriorityBadge from '@/components/tasks/TaskPriorityBadge'
import TaskStatusBadge from '@/components/tasks/TaskStatusBadge'
import TaskPagination from '@/components/tasks/TaskPagination'
import { formatDate } from '@/utils/date'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface TaskPaginationState {
  currentPage: number
  totalPages: number
  totalItems: number
  pageSize: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  onPageChange: (page: number) => void
  onNextPage: () => void
  onPreviousPage: () => void
}

interface TaskTableProps {
  tasks: Task[]
  totalFiltered: number
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
  pagination: TaskPaginationState
}

function TaskTable({
  tasks,
  totalFiltered,
  onEdit,
  onDelete,
  pagination,
}: TaskTableProps) {
  return (
    <Card className="overflow-hidden shadow-sm transition-shadow hover:shadow-md">
      <CardHeader>
        <CardTitle>Tarefas cadastradas</CardTitle>
        <CardDescription>
          {totalFiltered}{' '}
          {totalFiltered === 1 ? 'tarefa encontrada' : 'tarefas encontradas'}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-6">Título</TableHead>
              <TableHead>Responsável</TableHead>
              <TableHead>Prioridade</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="pr-6 text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow
                key={task.id}
                className="transition-colors duration-200 hover:bg-muted/50"
              >
                <TableCell className="max-w-[220px] pl-6 font-medium">
                  <Tooltip>
                    <TooltipTrigger>
                      <span className="block truncate">{task.title}</span>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs">
                      <p className="font-medium">{task.title}</p>
                      {task.description && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          {task.description}
                        </p>
                      )}
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {task.responsible}
                </TableCell>
                <TableCell>
                  <TaskPriorityBadge priority={task.priority} />
                </TableCell>
                <TableCell>
                  <TaskStatusBadge status={task.status} />
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDate(task.dueDate)}
                </TableCell>
                <TableCell className="pr-6">
                  <div className="flex justify-end gap-1">
                    <Tooltip>
                      <TooltipTrigger>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => onEdit(task)}
                          aria-label={`Editar ${task.title}`}
                        >
                          <Pencil className="size-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Editar</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => onDelete(task)}
                          aria-label={`Excluir ${task.title}`}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Excluir</TooltipContent>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TaskPagination {...pagination} />
      </CardContent>
    </Card>
  )
}

export default TaskTable
