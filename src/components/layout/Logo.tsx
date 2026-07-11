import { CheckSquare } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LogoProps {
  collapsed?: boolean
  className?: string
}

function Logo({ collapsed = false, className }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
        <CheckSquare className="size-5" />
      </div>
      {!collapsed && (
        <div className="flex min-w-0 flex-col">
          <span className="truncate text-base font-semibold tracking-tight">
            TaskFlow
          </span>
          <span className="truncate text-xs text-muted-foreground">
            Gestão de tarefas
          </span>
        </div>
      )}
    </div>
  )
}

export default Logo
