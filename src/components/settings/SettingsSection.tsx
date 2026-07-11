import type { ReactNode } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

interface SettingsSectionProps {
  title: string
  description?: string
  children: ReactNode
}

function SettingsSection({
  title,
  description,
  children,
}: SettingsSectionProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="pt-0">
        <div className="divide-y divide-border">{children}</div>
      </CardContent>
    </Card>
  )
}

export { Separator }
export default SettingsSection
