import { LayoutDashboard, ListTodo, type LucideIcon } from 'lucide-react'

export interface NavItem {
  label: string
  to: string
  icon: LucideIcon
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Dashboard',
    to: '/',
    icon: LayoutDashboard,
  },
  {
    label: 'Lista de Tarefas',
    to: '/tasks',
    icon: ListTodo,
  },
]

export const PAGE_TITLES: Record<string, string> = {
  '/': 'Dashboard',
  '/tasks': 'Lista de Tarefas',
}
