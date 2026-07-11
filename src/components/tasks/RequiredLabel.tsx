import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface RequiredLabelProps {
  htmlFor?: string
  children: React.ReactNode
  className?: string
}

function RequiredLabel({ htmlFor, children, className }: RequiredLabelProps) {
  return (
    <Label htmlFor={htmlFor} className={cn(className)}>
      {children}
      <span className="ml-0.5 text-destructive" aria-hidden="true">
        *
      </span>
    </Label>
  )
}

export default RequiredLabel
