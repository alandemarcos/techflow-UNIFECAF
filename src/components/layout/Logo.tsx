import { cn } from '@/lib/utils'
import { CheckSquare } from 'lucide-react'

interface LogoProps {
  className?: string
}

function Logo({ className }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <CheckSquare className="size-4" />
      </div>
      <span className="text-lg font-semibold tracking-tight">TaskFlow</span>
    </div>
  )
}

export default Logo
