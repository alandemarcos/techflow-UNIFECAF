import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface EmptyStateCardProps {
  icon: LucideIcon
  title: string
  description: string
  action: ReactNode
}

function EmptyStateCard({
  icon: Icon,
  title,
  description,
  action,
}: EmptyStateCardProps) {
  return (
    <Card className="border-dashed shadow-sm animate-in fade-in-50 duration-300">
      <CardHeader className="items-center text-center">
        <div
          className="flex size-16 items-center justify-center rounded-full bg-muted"
          aria-hidden
        >
          <Icon className="size-8 text-muted-foreground" />
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="max-w-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center pb-8">{action}</CardContent>
    </Card>
  )
}

export default EmptyStateCard
