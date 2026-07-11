import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { NAV_ITEMS } from '@/constants/navigation'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface SidebarNavProps {
  collapsed?: boolean
  onNavigate?: () => void
}

function SidebarNav({ collapsed = false, onNavigate }: SidebarNavProps) {
  return (
    <nav className="flex flex-1 flex-col gap-1 p-3">
      {NAV_ITEMS.map(({ label, to, icon: Icon }) => {
        const navLink = (
          <NavLink
            to={to}
            end={to === '/'}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                'group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                collapsed && 'justify-center px-2',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-sm'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground',
              )
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span
                    className={cn(
                      'absolute top-1/2 left-0 h-6 w-1 -translate-y-1/2 rounded-r-full bg-primary',
                      collapsed && 'left-0.5 h-5 w-0.5',
                    )}
                  />
                )}
                <Icon className="size-4 shrink-0" />
                {!collapsed && <span className="truncate">{label}</span>}
              </>
            )}
          </NavLink>
        )

        if (collapsed) {
          return (
            <Tooltip key={to}>
              <TooltipTrigger>{navLink}</TooltipTrigger>
              <TooltipContent side="right">{label}</TooltipContent>
            </Tooltip>
          )
        }

        return <div key={to}>{navLink}</div>
      })}
    </nav>
  )
}

export default SidebarNav
