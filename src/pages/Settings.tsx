import { Bell, Globe, Moon, Sun } from 'lucide-react'
import PageContainer from '@/components/layout/PageContainer'
import SettingRow from '@/components/settings/SettingRow'
import SettingsSection from '@/components/settings/SettingsSection'
import { useTheme } from '@/contexts/ThemeContext'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'

function Settings() {
  const { theme, setTheme } = useTheme()

  return (
    <PageContainer>
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <SettingsSection
          title="Aparência"
          description="Personalize a aparência do sistema."
        >
          <SettingRow
            label="Tema"
            description="Escolha entre modo claro ou escuro."
          >
            <div className="flex gap-2">
              <Button
                variant={theme === 'light' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTheme('light')}
              >
                <Sun className="size-4" />
                Claro
              </Button>
              <Button
                variant={theme === 'dark' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTheme('dark')}
              >
                <Moon className="size-4" />
                Escuro
              </Button>
            </div>
          </SettingRow>

          <SettingRow
            label="Idioma"
            description="Selecione o idioma da interface."
          >
            <Select defaultValue="pt-BR" disabled>
              <SelectTrigger className="w-[180px]">
                <Globe className="size-4 text-muted-foreground" />
                <SelectValue placeholder="Idioma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pt-BR">Português (BR)</SelectItem>
                <SelectItem value="en-US">English (US)</SelectItem>
                <SelectItem value="es-ES">Español</SelectItem>
              </SelectContent>
            </Select>
          </SettingRow>
        </SettingsSection>

        <SettingsSection
          title="Notificações"
          description="Configure como deseja receber alertas."
        >
          <SettingRow
            label="Notificações por e-mail"
            description="Receba atualizações de tarefas por e-mail."
          >
            <Switch defaultChecked disabled />
          </SettingRow>

          <SettingRow
            label="Notificações push"
            description="Alertas em tempo real no navegador."
          >
            <Switch disabled />
          </SettingRow>

          <SettingRow
            label="Resumo diário"
            description="Relatório diário das atividades do time."
          >
            <Switch defaultChecked disabled />
          </SettingRow>
        </SettingsSection>

        <SettingsSection
          title="Sobre"
          description="Informações sobre o sistema."
        >
          <SettingRow
            label="Versão"
            description="Versão atual instalada do TaskFlow."
          >
            <Badge variant="secondary">v0.2.0 — Sprint 2</Badge>
          </SettingRow>

          <SettingRow
            label="Ambiente"
            description="Ambiente de execução da aplicação."
          >
            <Badge variant="outline">Desenvolvimento</Badge>
          </SettingRow>

          <SettingRow
            label="Notificações do sistema"
            description="Status do serviço de notificações."
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Bell className="size-4" />
              <span>Ativo (demonstração)</span>
            </div>
          </SettingRow>
        </SettingsSection>
      </div>
    </PageContainer>
  )
}

export default Settings
