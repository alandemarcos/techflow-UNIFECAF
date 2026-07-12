# TaskFlow

[![Build](https://github.com/alandemarcos/techflow-UNIFECAF/actions/workflows/ci.yml/badge.svg)](https://github.com/alandemarcos/techflow-UNIFECAF/actions/workflows/ci.yml)

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

## Mudança de Escopo

Durante a fase de homologação do sistema, o cliente optou por remover a página **Configurações** para simplificar a primeira versão (MVP) do TaskFlow.

Essa decisão permitiu concentrar os esforços nas funcionalidades essenciais de gerenciamento de tarefas, seguindo os princípios das metodologias ágeis, nas quais o escopo pode ser adaptado conforme as necessidades do cliente.

## Como executar

```bash
npm install
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

### Outros comandos

```bash
npm run build       # Gera build de produção
npm run preview     # Visualiza o build localmente
npm run lint        # Executa o linter
npm run type-check  # Verifica tipos TypeScript
npm test            # Executa os testes
npm run coverage    # Executa testes com cobertura
```

## Integração Contínua

O TaskFlow utiliza [GitHub Actions](https://docs.github.com/pt/actions) para automatizar a validação de qualidade do código. A cada **push** ou **pull request** direcionado à branch `main`, os testes e verificações são executados automaticamente.

A pipeline **TaskFlow CI Pipeline** realiza as seguintes etapas em sequência:

1. Verificação de tipos TypeScript
2. Análise de lint
3. Execução de testes e cobertura
4. Build de produção

Se qualquer etapa falhar, o pipeline é interrompido imediatamente, sinalizando que a alteração precisa ser corrigida antes da integração.

Para mais detalhes, consulte a [documentação de CI](docs/continuous-integration.md).

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
