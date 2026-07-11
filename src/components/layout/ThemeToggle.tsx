import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Tooltip>
      <TooltipTrigger>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label={
            theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'
          }
        >
          {theme === 'light' ? (
            <Moon className="size-4" />
          ) : (
            <Sun className="size-4" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {theme === 'light' ? 'Modo escuro' : 'Modo claro'}
      </TooltipContent>
    </Tooltip>
  )
}

export default ThemeToggle
