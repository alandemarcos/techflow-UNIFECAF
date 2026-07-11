import { useEffect, useState } from 'react'
import type { Task, TaskFormData, TaskFormErrors } from '@/types/task'
import {
  DESCRIPTION_MAX_LENGTH,
  TASK_PRIORITIES,
  TASK_STATUSES,
} from '@/types/task'
import { getEmptyTaskForm, taskToFormData } from '@/utils/task'
import { hasFormErrors, validateTaskForm } from '@/utils/validation'
import { getTodayDateString } from '@/utils/date'
import RequiredLabel from '@/components/tasks/RequiredLabel'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

interface TaskFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  task?: Task | null
  onSubmit: (data: TaskFormData) => void
}

function TaskForm({ open, onOpenChange, task, onSubmit }: TaskFormProps) {
  const isEditing = Boolean(task)
  const [formData, setFormData] = useState<TaskFormData>(getEmptyTaskForm())
  const [errors, setErrors] = useState<TaskFormErrors>({})

  useEffect(() => {
    if (open) {
      setFormData(task ? taskToFormData(task) : getEmptyTaskForm())
      setErrors({})
    }
  }, [open, task])

  function updateField<K extends keyof TaskFormData>(
    field: K,
    value: TaskFormData[K],
  ) {
    setFormData((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const validationErrors = validateTaskForm(formData, {
      originalDueDate: task?.dueDate,
    })
    setErrors(validationErrors)

    if (hasFormErrors(validationErrors)) return

    onSubmit(formData)
    onOpenChange(false)
  }

  const descriptionLength = formData.description.length
  const isDescriptionNearLimit = descriptionLength > DESCRIPTION_MAX_LENGTH * 0.9

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg" showCloseButton>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Editar tarefa' : 'Nova tarefa'}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Atualize as informações da tarefa selecionada.'
              : 'Preencha os campos para cadastrar uma nova tarefa.'}
          </DialogDescription>
        </DialogHeader>

        <form id="task-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <RequiredLabel htmlFor="title">Título</RequiredLabel>
            <Input
              id="title"
              value={formData.title}
              onChange={(event) => updateField('title', event.target.value)}
              placeholder="Ex: Revisar documentação"
              aria-invalid={Boolean(errors.title)}
              aria-required="true"
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(event) =>
                updateField('description', event.target.value)
              }
              placeholder="Descreva os detalhes da tarefa..."
              rows={3}
              maxLength={DESCRIPTION_MAX_LENGTH}
              aria-invalid={Boolean(errors.description)}
            />
            <div className="flex items-center justify-between gap-2">
              {errors.description ? (
                <p className="text-sm text-destructive">{errors.description}</p>
              ) : (
                <span />
              )}
              <p
                className={cn(
                  'text-xs text-muted-foreground',
                  isDescriptionNearLimit && 'text-amber-600 dark:text-amber-400',
                  descriptionLength >= DESCRIPTION_MAX_LENGTH &&
                    'text-destructive',
                )}
              >
                {descriptionLength}/{DESCRIPTION_MAX_LENGTH}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <RequiredLabel htmlFor="responsible">Responsável</RequiredLabel>
            <Input
              id="responsible"
              value={formData.responsible}
              onChange={(event) =>
                updateField('responsible', event.target.value)
              }
              placeholder="Ex: Ana Silva"
              aria-invalid={Boolean(errors.responsible)}
              aria-required="true"
            />
            {errors.responsible && (
              <p className="text-sm text-destructive">{errors.responsible}</p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Prioridade</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) =>
                  updateField('priority', value as TaskFormData['priority'])
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {TASK_PRIORITIES.map((priority) => (
                    <SelectItem key={priority} value={priority}>
                      {priority}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  updateField('status', value as TaskFormData['status'])
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {TASK_STATUSES.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <RequiredLabel htmlFor="dueDate">Data limite</RequiredLabel>
            <Input
              id="dueDate"
              type="date"
              value={formData.dueDate}
              min={getTodayDateString()}
              onChange={(event) => updateField('dueDate', event.target.value)}
              aria-invalid={Boolean(errors.dueDate)}
              aria-required="true"
            />
            {errors.dueDate && (
              <p className="text-sm text-destructive">{errors.dueDate}</p>
            )}
          </div>
        </form>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button type="submit" form="task-form">
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default TaskForm
