import PageContainer from '@/components/layout/PageContainer'

function Settings() {
  return (
    <PageContainer
      title="Configurações"
      description="Personalize sua experiência no TaskFlow."
    >
      <div className="rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center text-sm text-muted-foreground">
        Opções de configuração serão implementadas nas próximas sprints.
      </div>
    </PageContainer>
  )
}

export default Settings
