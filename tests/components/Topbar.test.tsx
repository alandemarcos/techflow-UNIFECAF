import { describe, expect, it } from 'vitest'
import { screen } from '@testing-library/react'
import Topbar from '@/components/layout/Topbar'
import { renderWithProviders } from '../helpers/render'

describe('Topbar', () => {
  it('renderiza título da página atual', () => {
    renderWithProviders(<Topbar />, {
      routerProps: { initialEntries: ['/tasks'] },
      withTasks: true,
      withSidebar: true,
      withTheme: true,
    })

    expect(
      screen.getByRole('heading', { name: 'Lista de Tarefas' }),
    ).toBeInTheDocument()
  })

  it('renderiza controles de tema e usuário', () => {
    renderWithProviders(<Topbar />, {
      withTasks: true,
      withSidebar: true,
      withTheme: true,
    })

    expect(
      screen.getByRole('button', { name: /ativar modo escuro/i }),
    ).toBeInTheDocument()
    expect(screen.getByText('Administrador')).toBeInTheDocument()
  })
})
