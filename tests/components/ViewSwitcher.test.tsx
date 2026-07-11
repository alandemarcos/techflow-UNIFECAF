import { describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ViewSwitcher from '@/components/kanban/ViewSwitcher'
import { renderWithRouter } from '../helpers/render'

describe('ViewSwitcher', () => {
  it('renderiza opções de lista e kanban', () => {
    renderWithRouter(
      <ViewSwitcher view="list" onViewChange={vi.fn()} />,
    )

    expect(screen.getByRole('group', { name: 'Seletor de visualização' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /lista/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /kanban/i })).toBeInTheDocument()
  })

  it('indica visualização ativa', () => {
    renderWithRouter(
      <ViewSwitcher view="kanban" onViewChange={vi.fn()} />,
    )

    expect(screen.getByRole('button', { name: /kanban/i })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
  })

  it('chama onViewChange ao clicar', async () => {
    const user = userEvent.setup()
    const onViewChange = vi.fn()

    renderWithRouter(
      <ViewSwitcher view="list" onViewChange={onViewChange} />,
    )

    await user.click(screen.getByRole('button', { name: /kanban/i }))

    expect(onViewChange).toHaveBeenCalledWith('kanban')
  })
})
