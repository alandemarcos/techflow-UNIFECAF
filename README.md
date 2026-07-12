# TaskFlow

[![Build](https://github.com/alandemarcos/techflow-UNIFECAF/actions/workflows/ci.yml/badge.svg)](https://github.com/alandemarcos/techflow-UNIFECAF/actions/workflows/ci.yml)

Sistema web de gerenciamento de tarefas desenvolvido para ambientes corporativos e acadêmicos. O TaskFlow organiza o trabalho em fluxos visuais, permitindo acompanhar atividades de forma clara e estruturada com base na metodologia Kanban.

## Objetivo

Desenvolver uma aplicação moderna para gestão de tarefas que demonstre boas práticas de engenharia de software: arquitetura em camadas, componentização, testes automatizados, integração contínua e documentação técnica profissional.

O projeto prioriza entregas incrementais, qualidade de código e adaptação de escopo conforme as necessidades do cliente — princípios fundamentais das metodologias ágeis.

## Principais funcionalidades

| Funcionalidade | Descrição |
|----------------|-----------|
| **Dashboard** | Visão geral com estatísticas de tarefas (total, pendentes, em andamento, concluídas) |
| **Lista de Tarefas** | Tabela paginada com busca, filtros, ordenação e CRUD completo |
| **Kanban** | Quadro visual com três colunas e drag-and-drop para alteração de status |
| **Formulário de Tarefas** | Criação e edição com validação de campos obrigatórios |
| **Tema claro/escuro** | Alternância de tema com persistência em `localStorage` |
| **Layout responsivo** | Sidebar colapsável, menu mobile e navegação adaptável |

## Tecnologias utilizadas

| Categoria | Tecnologia |
|-----------|------------|
| Framework | React 19 |
| Linguagem | TypeScript 6 |
| Build | Vite 8 |
| Estilização | Tailwind CSS 4 |
| Componentes UI | shadcn/ui (Base UI) |
| Roteamento | React Router DOM 7 |
| Drag and Drop | @dnd-kit |
| Ícones | Lucide React |
| Testes | Vitest + Testing Library |
| Lint | Oxlint |
| CI/CD | GitHub Actions |

## Arquitetura do projeto

O TaskFlow segue uma arquitetura em camadas com separação clara de responsabilidades:

```
Pages → Components → Hooks / Contexts → Utils → Data
```

- **Pages** — composição de telas e orquestração de componentes
- **Components** — interface reutilizável (layout, tarefas, kanban, dashboard)
- **Hooks / Contexts** — estado e lógica reativa (tarefas, tema, sidebar)
- **Utils** — funções puras de negócio e validação
- **Data** — dados iniciais em memória (MVP sem backend)

Para detalhes completos, consulte [docs/architecture.md](docs/architecture.md).

## Estrutura de diretórios

```
src/
├── assets/          # Recursos estáticos
├── components/      # Componentes React reutilizáveis
│   ├── dashboard/   # Painel e estatísticas
│   ├── kanban/      # Quadro Kanban e drag-and-drop
│   ├── layout/      # Sidebar, Topbar, AppLayout
│   ├── tasks/       # CRUD, tabela, filtros e formulários
│   └── ui/          # Componentes shadcn/ui
├── constants/       # Constantes da aplicação (navegação)
├── contexts/        # Providers de tema e sidebar
├── data/            # Dados iniciais (seed)
├── hooks/           # Hooks customizados
├── lib/             # Utilitários de bibliotecas (cn)
├── pages/           # Páginas vinculadas às rotas
├── services/        # Camada reservada para integrações futuras
├── types/           # Tipos e interfaces TypeScript
└── utils/           # Funções puras (validação, tarefas, datas)

tests/               # Suíte de testes automatizados
docs/                # Documentação técnica
.github/workflows/   # Pipeline de Integração Contínua
```

## Como executar

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

### Outros comandos

```bash
npm run lint         # Análise estática com Oxlint
npm run build        # Gera build de produção
npm run preview      # Visualiza o build localmente
npm run type-check   # Verifica tipos TypeScript
npm run coverage     # Executa testes com relatório de cobertura
```

## Como rodar os testes

```bash
# Executar todos os testes uma vez
npm test

# Executar testes em modo watch (desenvolvimento)
npm run test:watch
```

A suíte contém **139 testes** distribuídos em componentes, hooks, utilitários e páginas. Para detalhes da estratégia, consulte [docs/testing.md](docs/testing.md).

## Como executar o lint

```bash
npm run lint
```

O projeto utiliza **Oxlint** para análise estática de código. A mesma verificação é executada automaticamente na pipeline de CI.

## Como executar a cobertura de testes

```bash
npm run coverage
```

Gera relatório de cobertura com os seguintes thresholds mínimos:

| Métrica | Threshold |
|---------|-----------|
| Statements | 80% |
| Branches | 70% |
| Functions | 80% |
| Lines | 80% |

O relatório HTML é gerado em `coverage/index.html` (pasta ignorada pelo Git).

## Como funciona a Integração Contínua

A cada **push** ou **pull request** na branch `main`, a pipeline **TaskFlow CI Pipeline** executa automaticamente:

1. Verificação de tipos TypeScript
2. Análise de lint (Oxlint)
3. Execução de testes
4. Relatório de cobertura
5. Build de produção

Se qualquer etapa falhar, o pipeline é interrompido imediatamente (**fail fast**).

Para documentação completa, consulte [docs/continuous-integration.md](docs/continuous-integration.md).

## Metodologia Kanban

O TaskFlow adota a metodologia **Kanban** para visualização e gestão do fluxo de trabalho:

```
To Do → In Progress → Done
```

| Coluna | Descrição |
|--------|-----------|
| **To Do** | Tarefas pendentes, ainda não iniciadas |
| **In Progress** | Tarefas em andamento |
| **Done** | Tarefas concluídas |

O quadro Kanban permite arrastar cards entre colunas para atualizar o status. Para detalhes da implementação, consulte [docs/kanban.md](docs/kanban.md).

## Fluxo de desenvolvimento por Sprints

O projeto foi desenvolvido de forma iterativa, com entregas incrementais organizadas em sprints:

| Sprint | Foco principal |
|--------|----------------|
| **Sprint 1** | Estrutura do projeto, layout base, roteamento e navegação |
| **Sprint 2** | CRUD de tarefas, formulário com validação e listagem |
| **Sprint 3** | Quadro Kanban com drag-and-drop, filtros e busca |
| **Sprint 4** | Testes automatizados, cobertura e Integração Contínua |
| **Homologação** | Revisão de escopo com o cliente |
| **Sprint 5** | Documentação técnica |
| **Sprint Final** | Revisão de qualidade, padronização e preparação para entrega |

O acompanhamento do backlog foi realizado via **GitHub Projects**, com cards organizados por colunas Kanban. Detalhes em [docs/kanban.md](docs/kanban.md).

## Mudança de escopo realizada

Durante a fase de homologação, o cliente optou por **remover a página Configurações** para simplificar o MVP. Essa decisão permitiu concentrar os esforços nas funcionalidades essenciais de gerenciamento de tarefas.

A documentação completa da mudança está em [docs/change-management.md](docs/change-management.md).

## Documentação técnica

| Documento | Conteúdo |
|-----------|----------|
| [architecture.md](docs/architecture.md) | Arquitetura, camadas e fluxo da aplicação |
| [kanban.md](docs/kanban.md) | Metodologia Kanban e organização por sprints |
| [testing.md](docs/testing.md) | Estratégia e ferramentas de testes |
| [change-management.md](docs/change-management.md) | Gestão de mudanças de escopo |
| [development-guide.md](docs/development-guide.md) | Guia de contribuição e padrões de código |
| [continuous-integration.md](docs/continuous-integration.md) | Pipeline CI com GitHub Actions |

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
