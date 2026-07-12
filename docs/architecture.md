# Arquitetura do TaskFlow

Este documento descreve a arquitetura técnica do TaskFlow, suas camadas, organização de componentes e fluxo de dados.

## Visão geral

O TaskFlow é uma **Single Page Application (SPA)** construída com React e TypeScript. No MVP atual, toda a persistência de dados ocorre em memória — não há backend nem banco de dados. Essa decisão simplifica a entrega inicial e permite focar na experiência do usuário e na qualidade do front-end.

```
┌──────────────────────────────────────────────────────────┐
│                        Browser                           │
├──────────────────────────────────────────────────────────┤
│  React Router (rotas)                                    │
│    ├── /          → Dashboard                            │
│    ├── /tasks     → Tasks (lista + kanban)               │
│    └── *          → NotFound                             │
├──────────────────────────────────────────────────────────┤
│  AppLayout (providers + shell)                           │
│    ThemeProvider → SidebarProvider → TasksProvider       │
├──────────────────────────────────────────────────────────┤
│  Pages                                                   │
│    Dashboard.tsx          Tasks.tsx                      │
├──────────────────────────────────────────────────────────┤
│  Components                                              │
│    layout/  dashboard/  tasks/  kanban/  ui/             │
├──────────────────────────────────────────────────────────┤
│  Hooks + Contexts                                        │
│    useTasks, useTaskList, useKanban, usePagination...    │
├──────────────────────────────────────────────────────────┤
│  Utils (funções puras)                                   │
│    task.ts, task-list.ts, validation.ts, date.ts         │
├──────────────────────────────────────────────────────────┤
│  Data                                                    │
│    initial-tasks.ts (seed em memória)                    │
└──────────────────────────────────────────────────────────┘
```

## Padrões arquiteturais

### Component-Based Architecture

A interface é construída a partir de componentes React funcionais, organizados por domínio de negócio (`tasks/`, `kanban/`, `dashboard/`, `layout/`). Componentes genéricos de UI ficam em `components/ui/` (shadcn/ui).

### Context API para estado global

Três contextos gerenciam estado compartilhado:

| Contexto | Responsabilidade | Persistência |
|----------|------------------|--------------|
| `TasksProvider` | CRUD de tarefas e estatísticas | Memória (reinicia ao recarregar) |
| `ThemeProvider` | Tema claro/escuro | `localStorage` (`taskflow-theme`) |
| `SidebarProvider` | Estado da sidebar (aberta/fechada) | Sessão |

O `TasksProvider` é o núcleo da aplicação — todas as operações de tarefas passam por ele.

### Custom Hooks com responsabilidade única

A lógica de listagem é decomposta em hooks especializados, compostos pelo `useTaskList`:

```
useTaskList
├── useTaskSearch    → busca por texto
├── useTaskFilters   → filtros (status, prioridade, responsável)
├── useTaskSort      → ordenação por campo
└── usePagination    → paginação da lista
```

O hook `useKanban` encapsula toda a lógica de drag-and-drop, separada da listagem paginada.

### Funções puras em Utils

Regras de negócio testáveis ficam em `src/utils/`:

- `task.ts` — criação, atualização e transformação de tarefas
- `task-list.ts` — filtragem, ordenação e estatísticas
- `validation.ts` — validação do formulário
- `date.ts` — formatação e validação de datas

Essas funções não dependem de React, facilitando testes unitários isolados.

## Organização dos componentes

### Layout (`components/layout/`)

Estrutura visual da aplicação:

| Componente | Função |
|------------|--------|
| `AppLayout` | Shell principal com providers e `<Outlet />` |
| `Sidebar` / `SidebarNav` | Navegação lateral |
| `MobileSidebar` | Menu mobile via Sheet |
| `Topbar` | Barra superior com título dinâmico |
| `PageContainer` | Container de conteúdo com padding |
| `ThemeToggle` | Alternância de tema |
| `UserMenu` | Menu do usuário (placeholder no MVP) |

### Tarefas (`components/tasks/`)

| Componente | Função |
|------------|--------|
| `TaskForm` | Formulário de criação/edição |
| `TaskTable` | Tabela paginada |
| `TaskFiltersBar` | Barra de filtros |
| `TaskSearchBar` | Campo de busca |
| `TaskSortControls` | Controles de ordenação |
| `TaskPagination` | Navegação entre páginas |
| `DeleteDialog` | Confirmação de exclusão |
| `TaskStatusBadge` / `TaskPriorityBadge` | Indicadores visuais |

### Kanban (`components/kanban/`)

| Componente | Função |
|------------|--------|
| `KanbanBoard` | Contexto DnD e colunas |
| `KanbanColumn` | Coluna droppable |
| `KanbanCard` | Card draggable |
| `KanbanHeader` | Cabeçalho da coluna |
| `ViewSwitcher` | Alternância lista/kanban |

### Dashboard (`components/dashboard/`)

| Componente | Função |
|------------|--------|
| `WelcomePanel` | Mensagem de boas-vindas |
| `StatsGrid` / `StatCard` | Cards de estatísticas |

## Fluxo da aplicação

### Fluxo de criação de tarefa

```
Usuário preenche TaskForm
  → validateTaskForm() (utils/validation)
  → addTask() (TasksProvider)
  → createTaskFromForm() (utils/task)
  → Estado atualizado → re-render de lista/kanban/dashboard
```

### Fluxo de listagem com filtros

```
TasksProvider.tasks
  → useTaskList()
    → useTaskSearch.applySearch()
    → useTaskFilters.applyFilters()
    → useTaskSort.applySort()
    → usePagination.paginatedItems
  → TaskTable renderiza página atual
```

### Fluxo Kanban (drag-and-drop)

```
Usuário arrasta card
  → useKanban.handleDragEnd()
  → resolveTargetStatus() identifica coluna alvo
  → updateTaskStatus() (TasksProvider)
  → Card move para nova coluna
```

## Responsabilidades das pastas

| Pasta | Responsabilidade |
|-------|------------------|
| `src/pages/` | Composição de telas; uma página por rota |
| `src/components/` | Componentes reutilizáveis por domínio |
| `src/hooks/` | Lógica reativa encapsulada |
| `src/contexts/` | Providers de estado global |
| `src/utils/` | Funções puras de negócio |
| `src/types/` | Interfaces e tipos TypeScript |
| `src/constants/` | Constantes da aplicação |
| `src/data/` | Dados iniciais (seed) |
| `src/services/` | Reservado para integrações com API (futuro) |
| `src/lib/` | Utilitários de bibliotecas (`cn()`) |
| `tests/` | Testes automatizados |
| `docs/` | Documentação técnica |

## Decisões técnicas

| Decisão | Justificativa |
|---------|---------------|
| Estado em memória | Simplifica MVP; backend pode ser adicionado via `services/` |
| Alias `@/` | Imports absolutos mais legíveis |
| shadcn/ui | Componentes acessíveis e customizáveis |
| @dnd-kit | Biblioteca moderna e acessível para drag-and-drop |
| Oxlint | Linter rápido com baixo overhead |
| Vitest | Integração nativa com Vite, mesma configuração |

## Evolução futura

A camada `services/` está reservada para integrações com API REST ou GraphQL. A migração do estado em memória para persistência remota pode ser feita substituindo as operações do `TasksProvider` por chamadas assíncronas, sem alterar a interface dos componentes.
