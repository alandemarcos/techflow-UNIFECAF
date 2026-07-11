import { Bell, User } from 'lucide-react'

function Topbar() {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-background px-6">
      <div>
        <p className="text-sm font-medium">TaskFlow</p>
        <p className="text-xs text-muted-foreground">
          Gerenciamento de tarefas
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="inline-flex size-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          aria-label="Notificações"
        >
          <Bell className="size-4" />
        </button>
        <button
          type="button"
          className="inline-flex size-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          aria-label="Perfil do usuário"
        >
          <User className="size-4" />
        </button>
      </div>
    </header>
  )
}

export default Topbar
