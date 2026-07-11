# TaskFlow

Sistema Web de Gerenciamento de Tarefas

## Objetivo

Desenvolver um sistema para gerenciamento de tarefas baseado em metodologias ágeis.

O TaskFlow organiza o trabalho em fluxos visuais, permitindo acompanhar o progresso das atividades de forma clara e estruturada, seguindo práticas de desenvolvimento iterativo e entrega contínua.

## Tecnologias

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Lucide React
- React Router DOM
- GitHub Actions
- Vitest

## Estrutura

```
src/
├── assets/       # Arquivos estáticos (imagens, ícones, fontes)
├── components/   # Componentes reutilizáveis da interface
│   └── layout/   # Componentes estruturais (Sidebar, Topbar, etc.)
├── hooks/        # Hooks customizados do React
├── lib/          # Utilitários de bibliotecas (ex.: shadcn/ui)
├── pages/        # Páginas da aplicação (rotas)
├── services/     # Camada de serviços e integrações com APIs
├── types/        # Definições de tipos TypeScript
└── utils/        # Funções utilitárias compartilhadas
```

### Pastas

| Pasta | Descrição |
|-------|-----------|
| `assets/` | Recursos estáticos utilizados na interface |
| `components/` | Componentes React reutilizáveis |
| `components/layout/` | Layout base da aplicação (Sidebar, Topbar, PageContainer, Logo) |
| `hooks/` | Lógica reutilizável encapsulada em hooks |
| `lib/` | Configurações e helpers de bibliotecas externas |
| `pages/` | Páginas vinculadas às rotas do React Router |
| `services/` | Comunicação com APIs e regras de acesso a dados |
| `types/` | Interfaces e tipos compartilhados |
| `utils/` | Funções auxiliares puras |

## Metodologia

Kanban

O projeto adota a metodologia Kanban para visualização e gestão do fluxo de trabalho, priorizando entregas incrementais e limitação de trabalho em progresso (WIP).

## Fluxo

To Do → In Progress → Done

| Coluna | Descrição |
|--------|-----------|
| **To Do** | Tarefas pendentes, ainda não iniciadas |
| **In Progress** | Tarefas em andamento |
| **Done** | Tarefas concluídas |

## Rotas

| Rota | Página |
|------|--------|
| `/` | Dashboard |
| `/tasks` | Tarefas |
| `/settings` | Configurações |

## Como executar

```bash
npm install
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

### Outros comandos

```bash
npm run build    # Gera build de produção
npm run preview  # Visualiza o build localmente
npm run lint     # Executa o linter
```

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
