import type { TaskFormData, TaskFormErrors } from '@/types/task'
import { isValidDateString } from '@/utils/date'

export function validateTaskForm(data: TaskFormData): TaskFormErrors {
  const errors: TaskFormErrors = {}

  if (!data.title.trim()) {
    errors.title = 'O título é obrigatório.'
  }

  if (!data.responsible.trim()) {
    errors.responsible = 'O responsável é obrigatório.'
  }

  if (!data.dueDate) {
    errors.dueDate = 'A data limite é obrigatória.'
  } else if (!isValidDateString(data.dueDate)) {
    errors.dueDate = 'Informe uma data válida.'
  }

  return errors
}

export function hasFormErrors(errors: TaskFormErrors) {
  return Object.keys(errors).length > 0
}
