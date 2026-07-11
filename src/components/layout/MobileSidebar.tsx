import { Menu } from 'lucide-react'
import { useSidebar } from '@/contexts/SidebarContext'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { SidebarContent } from '@/components/layout/Sidebar'

function MobileSidebar() {
  const { mobileOpen, setMobileOpen, isMobile } = useSidebar()

  if (!isMobile) return null

  return (
    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
      <SheetContent side="left" className="w-72 p-0" showCloseButton={false}>
        <SheetHeader className="sr-only">
          <SheetTitle>Menu de navegação</SheetTitle>
        </SheetHeader>
        <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
          <SidebarContent />
        </div>
      </SheetContent>
    </Sheet>
  )
}

function MobileMenuButton() {
  const { isMobile, setMobileOpen } = useSidebar()

  if (!isMobile) return null

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setMobileOpen(true)}
      aria-label="Abrir menu"
      className="lg:hidden"
    >
      <Menu className="size-5" />
    </Button>
  )
}

export { MobileSidebar, MobileMenuButton }
