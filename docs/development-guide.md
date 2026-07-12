# Guia de Desenvolvimento

Este documento orienta contribuidores sobre padrões de código, convenções e boas práticas adotadas no TaskFlow.

## Como contribuir

### Pré-requisitos

- Node.js LTS
- npm
- Editor com suporte a TypeScript (recomendado: VS Code / Cursor)

### Fluxo de trabalho

1. Crie uma branch a partir da `main`
2. Implemente a alteração seguindo os padrões deste guia
3. Execute as verificações locais antes de enviar
4. Abra um Pull Request para a `main`
5. Aguarde a pipeline CI passar
6. Solicite revisão de código

### Verificações locais obrigatórias

Execute os mesmos comandos da pipeline CI antes de cada PR:

```bash
npm ci
npm run type-check
npm run lint
npm test
npm run coverage
npm run build
```

## Padrões de código

### TypeScript

- **Strict mode** habilitado (`noUnusedLocals`, `noUnusedParameters`)
- Tipos explícitos em interfaces públicas
- Evitar `any` — preferir tipos específicos ou `unknown`
- Usar `type` para unions e `interface` para objetos extensíveis

### React

- Componentes funcionais com `function` (não arrow functions para componentes)
- Props tipadas com interfaces
- Estado global via Context API (`TasksProvider`, `ThemeProvider`, `SidebarProvider`)
- Lógica reativa em custom hooks
- Minimizar `useEffect` — preferir derivação via `useMemo`
- Componentes de UI em `components/ui/` (shadcn/ui) — não editar manualmente

### Imports

- Usar alias `@/` para imports absolutos a partir de `src/`
- Ordem: bibliotecas externas → alias internos → tipos
- Importar tipos com `import type` quando possível

```typescript
import { useMemo } from 'react'
import { useTasks } from '@/hooks/useTasks'
import type { Task } from '@/types/task'
```

### Estilização

- Tailwind CSS com abordagem mobile-first
- Usar `cn()` de `@/lib/utils` para classes condicionais
- Seguir tokens do design system (shadcn/ui)
- Suporte a tema claro e escuro via classes `dark:`

## Convenções de nomenclatura

| Elemento | Convenção | Exemplo |
|----------|-----------|---------|
| Componentes | PascalCase | `TaskForm`, `KanbanBoard` |
| Hooks | camelCase com prefixo `use` | `useTaskList`, `useKanban` |
| Utils | camelCase | `validateTaskForm`, `filterTasksBySearch` |
| Tipos/Interfaces | PascalCase | `Task`, `TaskFormData` |
| Constantes | UPPER_SNAKE_CASE ou PascalCase | `TASK_STATUSES`, `KANBAN_COLUMNS` |
| Arquivos de componente | PascalCase.tsx | `TaskTable.tsx` |
| Arquivos de hook/util | camelCase.ts | `useTasks.tsx`, `validation.ts` |
| Pastas | kebab-case ou domínio | `components/tasks/`, `components/kanban/` |

## Organização de arquivos

### Onde colocar código novo

| Tipo | Localização |
|------|-------------|
| Nova página | `src/pages/` + rota em `App.tsx` |
| Componente de domínio | `src/components/{domínio}/` |
| Componente genérico de UI | `src/components/ui/` (via shadcn CLI) |
| Hook customizado | `src/hooks/` |
| Função pura de negócio | `src/utils/` |
| Tipo/interface | `src/types/` |
| Constante da aplicação | `src/constants/` |
| Teste de componente | `tests/components/` |
| Teste de hook | `tests/hooks/` |
| Teste de util | `tests/utils/` |

### Tamanho de arquivos

- Manter arquivos abaixo de **200–300 linhas**
- Quando um arquivo crescer, dividir em módulos menores
- Uma responsabilidade por hook/função

## Boas práticas

### Estado e dados

- Estado de tarefas centralizado no `TasksProvider`
- Funções puras em `utils/` para lógica testável
- Dados iniciais em `data/initial-tasks.ts`
- Integrações futuras em `services/` (reservado)

### Componentes

- Props mínimas e bem tipadas
- Componentes pequenos e focados
- Separar lógica (hooks) de apresentação (JSX)
- Usar `stopPropagation` em ações dentro de elementos draggable

### Testes

- Testar comportamento visível ao usuário
- Usar `renderWithProviders` para componentes que dependem de contexto
- Fixtures reutilizáveis em `tests/helpers/fixtures.ts`
- Um `describe` por componente/hook, `it` por comportamento

### Acessibilidade

- Usar roles e labels semânticos
- Botões com `aria-label` quando o texto não é visível
- Suporte a navegação por teclado no kanban
- Contraste adequado em ambos os temas

### Performance

- `useMemo` para computações derivadas custosas
- `useCallback` para handlers passados a componentes filhos
- Paginação na listagem (não renderizar todas as tarefas)
- Lazy loading pode ser adotado para rotas futuras

## O que evitar

- Lógica de negócio dentro de componentes JSX
- Estado duplicado entre contexto e componentes
- Imports relativos longos (`../../../`)
- Componentes com mais de uma responsabilidade
- Dados mockados em dev ou prod (apenas em testes)
- Commits diretos na `main` sem PR
- Ignorar falhas da pipeline CI

## Estrutura de commit

Mensagens claras e focadas no "porquê":

```
feat: adiciona filtro por responsável na listagem
fix: corrige validação de data no formulário
docs: atualiza guia de arquitetura
test: adiciona testes para useKanban
refactor: extrai lógica de paginação para hook
```

## Referências

- [architecture.md](architecture.md) — arquitetura do projeto
- [testing.md](testing.md) — estratégia de testes
- [continuous-integration.md](continuous-integration.md) — pipeline CI
- [change-management.md](change-management.md) — gestão de mudanças
- [kanban.md](kanban.md) — metodologia e sprints do projeto
