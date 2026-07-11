import type { Task } from '@/types/task'
import TaskCard from '@/components/tasks/TaskCard'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface DeleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  task: Task | null
  onConfirm: () => void
}

function DeleteDialog({
  open,
  onOpenChange,
  task,
  onConfirm,
}: DeleteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" showCloseButton>
        <DialogHeader>
          <DialogTitle>Excluir tarefa</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir esta tarefa? Esta ação não pode ser
            desfeita.
          </DialogDescription>
        </DialogHeader>

        {task && <TaskCard task={task} />}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteDialog
