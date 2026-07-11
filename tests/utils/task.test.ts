import { describe, expect, it } from 'vitest'
import {
  createTaskFromForm,
  updateTaskFromForm,
  getEmptyTaskForm,
  updateTaskStatus,
  taskToFormData,
} from '@/utils/task'
import { createMockTask, createValidFormData } from '../helpers/fixtures'

describe('createTaskFromForm', () => {
  it('cria tarefa com dados normalizados', () => {
    const data = createValidFormData({
      title: '  Título com espaços  ',
      responsible: '  Ana Silva  ',
    })

    const task = createTaskFromForm(data)

    expect(task.title).toBe('Título com espaços')
    expect(task.responsible).toBe('Ana Silva')
    expect(task.id).toBeTruthy()
    expect(task.createdAt).toBeTruthy()
  })
})

describe('updateTaskFromForm', () => {
  it('atualiza campos da tarefa mantendo id e createdAt', () => {
    const task = createMockTask()
    const data = createValidFormData({ title: 'Título atualizado' })

    const updated = updateTaskFromForm(task, data)

    expect(updated.id).toBe(task.id)
    expect(updated.createdAt).toBe(task.createdAt)
    expect(updated.title).toBe('Título atualizado')
  })
})

describe('getEmptyTaskForm', () => {
  it('retorna formulário com valores padrão', () => {
    expect(getEmptyTaskForm()).toEqual({
      title: '',
      description: '',
      responsible: '',
      priority: 'Medium',
      status: 'To Do',
      dueDate: '',
    })
  })
})

describe('updateTaskStatus', () => {
  it('atualiza apenas o status', () => {
    const task = createMockTask({ status: 'To Do' })
    const updated = updateTaskStatus(task, 'Done')

    expect(updated.status).toBe('Done')
    expect(updated.title).toBe(task.title)
  })
})

describe('taskToFormData', () => {
  it('converte tarefa para dados do formulário', () => {
    const task = createMockTask()
    const formData = taskToFormData(task)

    expect(formData.title).toBe(task.title)
    expect(formData.responsible).toBe(task.responsible)
    expect(formData.dueDate).toBe(task.dueDate)
  })
})
