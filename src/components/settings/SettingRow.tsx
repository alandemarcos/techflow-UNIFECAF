import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SettingRowProps {
  label: string
  description?: string
  children: ReactNode
  className?: string
}

function SettingRow({
  label,
  description,
  children,
  className,
}: SettingRowProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between',
        className,
      )}
    >
      <div className="space-y-0.5">
        <p className="text-sm font-medium">{label}</p>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  )
}

export default SettingRow
