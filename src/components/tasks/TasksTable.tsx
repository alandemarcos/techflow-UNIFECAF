import type { Task } from '@/types/task'
import TaskPriorityBadge from '@/components/tasks/TaskPriorityBadge'
import TaskStatusBadge from '@/components/tasks/TaskStatusBadge'
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

interface TasksTableProps {
  tasks: Task[]
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function TasksTable({ tasks }: TasksTableProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Tarefas recentes</CardTitle>
        <CardDescription>
          Dados fictícios para demonstração da interface.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-6">Título</TableHead>
              <TableHead>Prioridade</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Responsável</TableHead>
              <TableHead className="pr-6">Data</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="max-w-[240px] truncate pl-6 font-medium">
                  {task.title}
                </TableCell>
                <TableCell>
                  <TaskPriorityBadge priority={task.priority} />
                </TableCell>
                <TableCell>
                  <TaskStatusBadge status={task.status} />
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {task.assignee}
                </TableCell>
                <TableCell className="pr-6 text-muted-foreground">
                  {formatDate(task.dueDate)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default TasksTable
