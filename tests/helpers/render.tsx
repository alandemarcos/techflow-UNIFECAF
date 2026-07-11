import { render, type RenderOptions } from '@testing-library/react'
import { MemoryRouter, type MemoryRouterProps } from 'react-router-dom'
import type { ReactElement, ReactNode } from 'react'
import { TasksProvider } from '@/hooks/useTasks'
import { SidebarProvider } from '@/contexts/SidebarContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { TooltipProvider } from '@/components/ui/tooltip'

interface WrapperOptions {
  routerProps?: MemoryRouterProps
  withTasks?: boolean
  withSidebar?: boolean
  withTheme?: boolean
}

function createWrapper({
  routerProps = { initialEntries: ['/'] },
  withTasks = true,
  withSidebar = false,
  withTheme = false,
}: WrapperOptions = {}) {
  return function Wrapper({ children }: { children: ReactNode }) {
    let content = children

    if (withTasks) {
      content = <TasksProvider>{content}</TasksProvider>
    }

    if (withSidebar) {
      content = <SidebarProvider>{content}</SidebarProvider>
    }

    if (withTheme) {
      content = <ThemeProvider>{content}</ThemeProvider>
    }

    content = (
      <TooltipProvider>
        <MemoryRouter {...routerProps}>{content}</MemoryRouter>
      </TooltipProvider>
    )

    return content
  }
}

export function renderWithProviders(
  ui: ReactElement,
  options?: RenderOptions & WrapperOptions,
) {
  const { routerProps, withTasks, withSidebar, withTheme, ...renderOptions } =
    options ?? {}

  return render(ui, {
    wrapper: createWrapper({ routerProps, withTasks, withSidebar, withTheme }),
    ...renderOptions,
  })
}

export function renderWithRouter(
  ui: ReactElement,
  routerProps?: MemoryRouterProps,
) {
  return renderWithProviders(ui, { routerProps, withTasks: false })
}
