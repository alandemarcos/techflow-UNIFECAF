import { describe, expect, it } from 'vitest'
import { screen } from '@testing-library/react'
import KanbanColumn from '@/components/kanban/KanbanColumn'
import { KANBAN_COLUMNS } from '@/hooks/useKanban'
import { createMockTasks } from '../helpers/fixtures'
import { renderWithRouter } from '../helpers/render'
import { DndWrapper } from '../helpers/dnd'

describe('KanbanColumn', () => {
  const column = KANBAN_COLUMNS[0]
  const tasks = createMockTasks().filter((task) => task.status === 'To Do')

  it('renderiza cabeçalho com título e contagem', () => {
    renderWithRouter(
      <DndWrapper>
        <KanbanColumn
          column={column}
          tasks={tasks}
          activeTaskId={null}
        />
      </DndWrapper>,
    )

    expect(screen.getByRole('heading', { name: 'To Do' })).toBeInTheDocument()
    expect(screen.getByLabelText(`${tasks.length} tarefas`)).toHaveTextContent(
      String(tasks.length),
    )
  })

  it('renderiza cartões das tarefas', () => {
    renderWithRouter(
      <DndWrapper>
        <KanbanColumn
          column={column}
          tasks={tasks}
          activeTaskId={null}
        />
      </DndWrapper>,
    )

    tasks.forEach((task) => {
      expect(screen.getByText(task.title)).toBeInTheDocument()
    })
  })

  it('exibe estado vazio quando não há tarefas', () => {
    renderWithRouter(
      <DndWrapper>
        <KanbanColumn
          column={column}
          tasks={[]}
          activeTaskId={null}
        />
      </DndWrapper>,
    )

    expect(
      screen.getByText('Nenhuma tarefa nesta etapa.'),
    ).toBeInTheDocument()
    expect(screen.getByLabelText('0 tarefas')).toHaveTextContent('0')
  })
})
