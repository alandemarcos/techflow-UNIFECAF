import { describe, expect, it } from 'vitest'
import { screen } from '@testing-library/react'
import { SidebarContent } from '@/components/layout/Sidebar'
import { renderWithProviders } from '../helpers/render'

describe('Sidebar', () => {
  it('renderiza logo e navegação', () => {
    renderWithProviders(<SidebarContent />, {
      withSidebar: true,
      withTasks: false,
    })

    expect(screen.getByText('TaskFlow')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /dashboard/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /lista de tarefas/i })).toBeInTheDocument()
  })

  it('exibe versão do sistema', () => {
    renderWithProviders(<SidebarContent />, {
      withSidebar: true,
      withTasks: false,
    })

    expect(screen.getByText('TaskFlow v0.2.0')).toBeInTheDocument()
  })
})
