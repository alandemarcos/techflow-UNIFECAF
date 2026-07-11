import { useLocation } from 'react-router-dom'
import { PAGE_TITLES } from '@/constants/navigation'
import SearchInput from '@/components/layout/SearchInput'
import ThemeToggle from '@/components/layout/ThemeToggle'
import UserMenu from '@/components/layout/UserMenu'
import { MobileMenuButton } from '@/components/layout/MobileSidebar'
import { Separator } from '@/components/ui/separator'

function Topbar() {
  const { pathname } = useLocation()
  const pageTitle = PAGE_TITLES[pathname] ?? 'TaskFlow'

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-4 border-b border-border bg-background/95 px-4 shadow-sm backdrop-blur supports-backdrop-filter:bg-background/80 sm:px-6">
      <MobileMenuButton />

      <div className="min-w-0 flex-1">
        <h1 className="truncate text-lg font-semibold tracking-tight">
          {pageTitle}
        </h1>
      </div>

      <div className="hidden flex-1 justify-center lg:flex">
        <SearchInput />
      </div>

      <div className="flex items-center gap-1">
        <ThemeToggle />
        <Separator orientation="vertical" className="mx-1 hidden h-6 sm:block" />
        <UserMenu />
      </div>
    </header>
  )
}

export default Topbar
