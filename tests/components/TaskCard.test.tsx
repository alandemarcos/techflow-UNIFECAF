import { describe, expect, it } from 'vitest'
import { screen } from '@testing-library/react'
import TaskCard from '@/components/tasks/TaskCard'
import { createMockTask } from '../helpers/fixtures'
import { renderWithRouter } from '../helpers/render'

describe('TaskCard', () => {
  it('renderiza informações da tarefa', () => {
    const task = createMockTask()

    renderWithRouter(<TaskCard task={task} />)

    expect(screen.getByText(task.title)).toBeInTheDocument()
    expect(screen.getByText(task.description)).toBeInTheDocument()
    expect(screen.getByText(task.responsible)).toBeInTheDocument()
  })

  it('renderiza badges de prioridade e status', () => {
    const task = createMockTask({ priority: 'High', status: 'In Progress' })

    renderWithRouter(<TaskCard task={task} />)

    expect(screen.getByText('High')).toBeInTheDocument()
    expect(screen.getByText('In Progress')).toBeInTheDocument()
  })
})
