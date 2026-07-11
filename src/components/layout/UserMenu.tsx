import { LogOut, Settings, User } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

const USER = {
  name: 'Administrador',
  initials: 'AD',
  role: 'Administrador do sistema',
}

function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          'inline-flex h-auto items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium transition-colors',
          'hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
        )}
        aria-label="Menu do usuário"
      >
        <Avatar size="sm">
          <AvatarFallback className="bg-primary/10 text-xs font-medium text-primary">
            {USER.initials}
          </AvatarFallback>
        </Avatar>
        <span className="hidden sm:inline">{USER.name}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium">{USER.name}</p>
              <p className="text-xs text-muted-foreground">{USER.role}</p>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem disabled>
            <User />
            Meu perfil
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <Settings />
            Preferências
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled variant="destructive">
          <LogOut />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserMenu
