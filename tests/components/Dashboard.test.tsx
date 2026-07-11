import { describe, expect, it } from 'vitest'
import { screen } from '@testing-library/react'
import Dashboard from '@/pages/Dashboard'
import { renderWithProviders } from '../helpers/render'

describe('Dashboard', () => {
  it('renderiza painel de boas-vindas', () => {
    renderWithProviders(<Dashboard />, { withTasks: true })

    expect(screen.getByText('Bem-vindo ao TaskFlow')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /ver tarefas/i })).toHaveAttribute(
      'href',
      '/tasks',
    )
  })

  it('renderiza grid de estatísticas', () => {
    renderWithProviders(<Dashboard />, { withTasks: true })

    expect(screen.getByText('Total de tarefas')).toBeInTheDocument()
    expect(screen.getByText('Em andamento')).toBeInTheDocument()
    expect(screen.getByText('Concluídas')).toBeInTheDocument()
    expect(screen.getByText('Pendentes')).toBeInTheDocument()
  })
})
