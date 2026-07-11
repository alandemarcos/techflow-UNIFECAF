import { cn } from '@/lib/utils'

interface PageContainerProps {
  children: React.ReactNode
  className?: string
  title?: string
  description?: string
}

function PageContainer({
  children,
  className,
  title,
  description,
}: PageContainerProps) {
  return (
    <div className={cn('flex flex-1 flex-col gap-6 p-6', className)}>
      {(title || description) && (
        <header className="space-y-1">
          {title && (
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          )}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </header>
      )}
      <div className="flex-1">{children}</div>
    </div>
  )
}

export default PageContainer
