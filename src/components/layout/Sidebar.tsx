import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSidebar } from '@/contexts/SidebarContext'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import Logo from '@/components/layout/Logo'
import SidebarNav from '@/components/layout/SidebarNav'

function SidebarContent() {
  const { collapsed, toggleCollapsed, isMobile, setMobileOpen } = useSidebar()

  return (
    <>
      <div
        className={cn(
          'flex h-16 items-center border-b border-sidebar-border',
          collapsed ? 'justify-center px-2' : 'justify-between px-4',
        )}
      >
        <Logo collapsed={collapsed} />
        {!isMobile && !collapsed && (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={toggleCollapsed}
            aria-label="Recolher sidebar"
            className="text-muted-foreground"
          >
            <ChevronLeft className="size-4" />
          </Button>
        )}
      </div>

      <ScrollArea className="flex-1">
        <SidebarNav
          collapsed={collapsed}
          onNavigate={() => isMobile && setMobileOpen(false)}
        />
      </ScrollArea>

      <Separator />

      <div className={cn('p-3', collapsed && 'flex justify-center')}>
        {!isMobile && collapsed ? (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={toggleCollapsed}
            aria-label="Expandir sidebar"
            className="text-muted-foreground"
          >
            <ChevronRight className="size-4" />
          </Button>
        ) : (
          <p className="px-2 text-xs text-muted-foreground">
            TaskFlow v0.2.0
          </p>
        )}
      </div>
    </>
  )
}

function Sidebar() {
  const { collapsed, isMobile } = useSidebar()

  if (isMobile) return null

  return (
    <aside
      aria-label="Navegação principal"
      className={cn(
        'hidden shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground shadow-sm transition-[width] duration-300 lg:flex',
        collapsed ? 'w-[72px]' : 'w-64',
      )}
    >
      <SidebarContent />
    </aside>
  )
}

export { SidebarContent }
export default Sidebar
