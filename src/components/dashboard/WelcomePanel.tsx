import { ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

function WelcomePanel() {
  return (
    <Card className="border-primary/10 bg-gradient-to-br from-primary/5 via-background to-background shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2 text-primary">
          <Sparkles className="size-5" />
          <span className="text-sm font-medium">Bem-vindo</span>
        </div>
        <CardTitle className="text-2xl">Bem-vindo ao TaskFlow</CardTitle>
        <CardDescription className="max-w-2xl text-base leading-relaxed">
          O TaskFlow é uma plataforma de gestão de tarefas projetada para
          equipes que utilizam metodologias ágeis. Organize sprints, acompanhe
          entregas e mantenha todos alinhados com visibilidade total do fluxo de
          trabalho.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button render={<Link to="/tasks" />}>
          Ver tarefas
          <ArrowRight />
        </Button>
      </CardContent>
    </Card>
  )
}

export default WelcomePanel
