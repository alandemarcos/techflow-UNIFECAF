import { Outlet } from 'react-router-dom'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { SidebarProvider } from '@/contexts/SidebarContext'
import { TasksProvider } from '@/hooks/useTasks'
import { TooltipProvider } from '@/components/ui/tooltip'
import Sidebar from '@/components/layout/Sidebar'
import Topbar from '@/components/layout/Topbar'
import { MobileSidebar } from '@/components/layout/MobileSidebar'

function AppLayout() {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <TasksProvider>
          <TooltipProvider>
            <div className="flex min-h-screen bg-background">
              <Sidebar />
              <MobileSidebar />

              <div className="flex min-w-0 flex-1 flex-col">
                <Topbar />
                <main className="flex flex-1 flex-col overflow-auto">
                  <Outlet />
                </main>
              </div>
            </div>
          </TooltipProvider>
        </TasksProvider>
      </SidebarProvider>
    </ThemeProvider>
  )
}

export default AppLayout
