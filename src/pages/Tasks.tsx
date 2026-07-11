import PageContainer from '@/components/layout/PageContainer'

function Tasks() {
  return (
    <PageContainer
      title="Tarefas"
      description="Gerencie suas tarefas e acompanhe o progresso."
    >
      <div className="rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center text-sm text-muted-foreground">
        Listagem e kanban de tarefas serão implementados nas próximas sprints.
      </div>
    </PageContainer>
  )
}

export default Tasks
