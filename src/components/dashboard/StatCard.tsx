import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface StatCardProps {
  title: string
  value: number
  description: string
  icon: LucideIcon
  iconClassName?: string
}

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  iconClassName,
}: StatCardProps) {
  return (
    <Card className="shadow-sm transition-shadow hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div
          className={cn(
            'flex size-9 items-center justify-center rounded-lg',
            iconClassName,
          )}
        >
          <Icon className="size-4" />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold tracking-tight">{value}</p>
        <CardDescription className="mt-1">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}

export default StatCard
