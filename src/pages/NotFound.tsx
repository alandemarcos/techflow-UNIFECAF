import { Link } from 'react-router-dom'
import PageContainer from '@/components/layout/PageContainer'

function NotFound() {
  return (
    <PageContainer
      title="Página não encontrada"
      description="A rota solicitada não existe no TaskFlow."
    >
      <div className="flex flex-col items-start gap-4">
        <p className="text-sm text-muted-foreground">
          Verifique o endereço ou volte para o dashboard.
        </p>
        <Link
          to="/"
          className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Ir para o Dashboard
        </Link>
      </div>
    </PageContainer>
  )
}

export default NotFound
