import { describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TaskPagination from '@/components/tasks/TaskPagination'
import { renderWithRouter } from '../helpers/render'

describe('TaskPagination', () => {
  const baseProps = {
    currentPage: 1,
    totalPages: 3,
    totalItems: 25,
    pageSize: 10,
    hasNextPage: true,
    hasPreviousPage: false,
    onPageChange: vi.fn(),
    onNextPage: vi.fn(),
    onPreviousPage: vi.fn(),
  }

  it('renderiza informações de paginação', () => {
    renderWithRouter(<TaskPagination {...baseProps} />)

    expect(screen.getByText(/tarefas no total/i)).toBeInTheDocument()
    expect(screen.getByText(/página/i)).toBeInTheDocument()
    expect(screen.getByText('1', { selector: 'span.font-medium' })).toBeInTheDocument()
  })

  it('chama onNextPage ao clicar em próxima', async () => {
    const user = userEvent.setup()
    const onNextPage = vi.fn()

    renderWithRouter(
      <TaskPagination {...baseProps} onNextPage={onNextPage} />,
    )

    await user.click(
      screen.getByRole('button', { name: /ir para próxima página/i }),
    )

    expect(onNextPage).toHaveBeenCalled()
  })

  it('chama onPageChange ao selecionar página', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()

    renderWithRouter(
      <TaskPagination {...baseProps} onPageChange={onPageChange} />,
    )

    await user.click(screen.getByRole('button', { name: '2' }))

    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it('não renderiza quando não há itens', () => {
    const { container } = renderWithRouter(
      <TaskPagination
        {...baseProps}
        totalItems={0}
        totalPages={1}
        hasNextPage={false}
      />,
    )

    expect(container).toBeEmptyDOMElement()
  })
})
