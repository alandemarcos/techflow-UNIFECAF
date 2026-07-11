import type { TaskFormData, TaskFormErrors } from '@/types/task'
import {
  DESCRIPTION_MAX_LENGTH,
  TITLE_MIN_LENGTH,
} from '@/types/task'
import { isTodayOrFutureDate, isValidDateString } from '@/utils/date'

export function validateTaskForm(
  data: TaskFormData,
  options?: { originalDueDate?: string },
): TaskFormErrors {
  const errors: TaskFormErrors = {}
  const title = data.title.trim()

  if (!title) {
    errors.title = 'O título é obrigatório.'
  } else if (title.length < TITLE_MIN_LENGTH) {
    errors.title = `O título deve ter no mínimo ${TITLE_MIN_LENGTH} caracteres.`
  }

  if (data.description.length > DESCRIPTION_MAX_LENGTH) {
    errors.description = `A descrição deve ter no máximo ${DESCRIPTION_MAX_LENGTH} caracteres.`
  }

  if (!data.responsible.trim()) {
    errors.responsible = 'O responsável é obrigatório.'
  }

  if (!data.dueDate) {
    errors.dueDate = 'A data limite é obrigatória.'
  } else if (!isValidDateString(data.dueDate)) {
    errors.dueDate = 'Informe uma data válida.'
  } else if (
    !isTodayOrFutureDate(data.dueDate) &&
    data.dueDate !== options?.originalDueDate
  ) {
    errors.dueDate = 'A data não pode ser anterior ao dia atual.'
  }

  return errors
}

export function hasFormErrors(errors: TaskFormErrors) {
  return Object.keys(errors).length > 0
}
