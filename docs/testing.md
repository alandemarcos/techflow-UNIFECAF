# Estratégia de Testes

Este documento descreve a estratégia de testes do TaskFlow, ferramentas utilizadas, tipos de testes e configuração de cobertura.

## Objetivo

Garantir a confiabilidade do sistema através de testes automatizados que validem comportamentos críticos — CRUD de tarefas, filtros, kanban, validações e componentes de interface — sem depender de testes manuais.

## Ferramentas utilizadas

| Ferramenta | Função |
|------------|--------|
| **Vitest** | Framework de testes (integrado ao Vite) |
| **@testing-library/react** | Renderização e queries de componentes |
| **@testing-library/user-event** | Simulação de interações do usuário |
| **@testing-library/jest-dom** | Matchers adicionais (`toBeInTheDocument`, etc.) |
| **@vitest/coverage-v8** | Relatório de cobertura com engine V8 |
| **jsdom** | Ambiente DOM simulado para testes |

## Tipos de testes

### Testes unitários (utils)

Funções puras em `src/utils/` são testadas isoladamente, sem dependência de React:

| Arquivo de teste | Escopo |
|------------------|--------|
| `tests/utils/task.test.ts` | Criação, atualização e transformação de tarefas |
| `tests/utils/task-list.test.ts` | Filtragem, ordenação e estatísticas |
| `tests/utils/validation.test.ts` | Validação do formulário |
| `tests/utils/date.test.ts` | Formatação e validação de datas |

### Testes de hooks

Hooks customizados são testados com `renderHook` e providers:

| Arquivo de teste | Escopo |
|------------------|--------|
| `tests/hooks/useTasks.test.tsx` | CRUD e estatísticas via contexto |
| `tests/hooks/useTaskList.test.ts` | Orquestração de busca, filtros e paginação |
| `tests/hooks/useTaskSearch.test.ts` | Busca por texto |
| `tests/hooks/useTaskFilters.test.ts` | Filtros por status, prioridade e responsável |
| `tests/hooks/useTaskSort.test.ts` | Ordenação por campo |
| `tests/hooks/usePagination.test.ts` | Paginação |
| `tests/hooks/useKanban.test.ts` | Agrupamento e drag-and-drop |

### Testes de componentes

Componentes são renderizados com providers e verificados via queries acessíveis:

| Arquivo de teste | Escopo |
|------------------|--------|
| `tests/components/TaskForm.test.tsx` | Formulário e validação |
| `tests/components/TaskTable.test.tsx` | Tabela e ações |
| `tests/components/KanbanBoard.test.tsx` | Quadro kanban |
| `tests/components/KanbanColumn.test.tsx` | Colunas droppable |
| `tests/components/KanbanCard.test.tsx` | Cards draggable |
| `tests/components/Dashboard.test.tsx` | Painel e estatísticas |
| `tests/components/Sidebar.test.tsx` | Navegação lateral |
| `tests/components/Topbar.test.tsx` | Barra superior |
| `tests/components/ViewSwitcher.test.tsx` | Alternância lista/kanban |
| `tests/components/TaskCard.test.tsx` | Card de tarefa |
| `tests/components/TaskPagination.test.tsx` | Paginação |
| `tests/components/DeleteDialog.test.tsx` | Diálogo de exclusão |

### Testes de páginas

| Arquivo de teste | Escopo |
|------------------|--------|
| `tests/pages/Tasks.test.tsx` | Integração da página de tarefas |

## Estrutura de testes

```
tests/
├── setup.ts              # Configuração global (mocks, cleanup)
├── helpers/
│   ├── render.tsx        # renderWithProviders, renderWithRouter
│   ├── fixtures.ts       # createMockTask, createMockTasks
│   ├── dnd.tsx           # Helpers para testes de drag-and-drop
│   └── task-form.ts      # Helpers para formulário
├── components/           # 13 arquivos
├── hooks/                # 7 arquivos
├── pages/                # 1 arquivo
└── utils/                # 4 arquivos
```

## Configuração

A configuração de testes está integrada ao `vite.config.ts`:

```typescript
test: {
  globals: true,
  environment: 'jsdom',
  setupFiles: ['./tests/setup.ts'],
  include: ['tests/**/*.{test,spec}.{ts,tsx}'],
  testTimeout: 15000,
}
```

### Setup global (`tests/setup.ts`)

- Importa matchers do `@testing-library/jest-dom`
- Limpa DOM e `localStorage` após cada teste
- Mock de `matchMedia`, `innerWidth` e `crypto.randomUUID`

### Helpers de renderização

O helper `renderWithProviders` encapsula os providers necessários:

```typescript
renderWithProviders(<Component />, {
  withTasks: true,      // TasksProvider
  withSidebar: true,     // SidebarProvider
  withTheme: true,       // ThemeProvider
  routerProps: { initialEntries: ['/tasks'] },
})
```

## Cobertura

### Thresholds mínimos

| Métrica | Threshold |
|---------|-----------|
| Statements | 80% |
| Branches | 70% |
| Functions | 80% |
| Lines | 80% |

### Escopo da cobertura

**Incluído:** `src/**/*.{ts,tsx}`

**Excluído:**

| Caminho | Motivo |
|---------|--------|
| `src/main.tsx` | Ponto de entrada |
| `src/App.tsx` | Configuração de rotas |
| `src/**/*.d.ts` | Declarações de tipo |
| `src/components/ui/**` | Componentes shadcn/ui (biblioteca externa) |

### Gerar relatório

```bash
npm run coverage
```

Relatórios gerados:

- **Terminal** — resumo textual
- **HTML** — `coverage/index.html` (navegável)
- **LCOV** — `coverage/lcov.info` (integração com ferramentas externas)

## Métricas atuais

| Métrica | Valor |
|---------|-------|
| Arquivos de teste | 24 |
| Testes | 139 |
| Blocos describe | 40 |

## Boas práticas adotadas

1. **Testar comportamento, não implementação** — queries por role, label e texto visível
2. **Funções puras testadas isoladamente** — utils sem dependência de React
3. **Fixtures reutilizáveis** — `createMockTask()` para dados consistentes
4. **Cleanup automático** — DOM e localStorage limpos após cada teste
5. **Providers encapsulados** — `renderWithProviders` evita boilerplate
6. **Sem waits artificiais** — uso de `waitFor` e `findBy` quando necessário
7. **Cobertura com thresholds** — CI falha se cobertura cair abaixo do mínimo

## Executar localmente

```bash
# Todos os testes
npm test

# Modo watch (desenvolvimento)
npm run test:watch

# Com cobertura
npm run coverage
```

## Integração com CI

Os testes são executados automaticamente na pipeline de CI a cada push ou pull request na branch `main`. A cobertura também é verificada. Consulte [continuous-integration.md](continuous-integration.md).
