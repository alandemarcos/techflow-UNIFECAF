# Metodologia Kanban no TaskFlow

Este documento explica como a metodologia Kanban foi aplicada no desenvolvimento do projeto — tanto na gestão do próprio desenvolvimento quanto na funcionalidade do sistema.

## O que é Kanban

Kanban é uma metodologia ágil de gestão visual do fluxo de trabalho. Originada no sistema de produção da Toyota, foi adaptada para desenvolvimento de software com foco em:

- **Visualização** do trabalho em andamento
- **Limitação de WIP** (Work In Progress)
- **Fluxo contínuo** de entregas
- **Melhoria contínua** do processo

No TaskFlow, o Kanban aparece em dois níveis: como metodologia de gestão do projeto e como funcionalidade da aplicação.

## Kanban no produto

### Colunas do quadro

O sistema implementa o fluxo padrão de três colunas:

```
┌──────────┐    ┌──────────────┐    ┌──────────┐
│  To Do   │ →  │ In Progress  │ →  │   Done   │
│ Pendente │    │ Em andamento │    │ Concluída│
└──────────┘    └──────────────┘    └──────────┘
```

| Coluna | Status | Significado |
|--------|--------|-------------|
| To Do | `To Do` | Tarefa criada, aguardando início |
| In Progress | `In Progress` | Tarefa em execução |
| Done | `Done` | Tarefa finalizada |

### Interação do usuário

- **Visualização**: alternar entre modo lista e modo kanban na página de tarefas
- **Drag-and-drop**: arrastar cards entre colunas para atualizar o status
- **Filtros**: busca e filtros aplicam-se também ao quadro kanban
- **Ações**: editar e excluir tarefas diretamente nos cards

### Implementação técnica

A funcionalidade utiliza a biblioteca `@dnd-kit` para drag-and-drop acessível:

- Ativação após 8px de movimento (evita cliques acidentais)
- Suporte a teclado para acessibilidade
- Detecção de colisão por `closestCorners`
- Cards podem ser soltos sobre colunas ou sobre outros cards

## Kanban no desenvolvimento

### Divisão em Sprints

O projeto foi organizado em sprints com entregas incrementais:

| Sprint | Entrega | Resultado |
|--------|---------|-----------|
| **Sprint 1** | Fundação | Estrutura Vite + React, layout (sidebar, topbar), roteamento, tema claro/escuro |
| **Sprint 2** | CRUD | Formulário com validação, tabela de tarefas, operações criar/editar/excluir |
| **Sprint 3** | Kanban e filtros | Quadro visual, drag-and-drop, busca, filtros e ordenação |
| **Sprint 4** | Qualidade | 139 testes automatizados, cobertura 80%, pipeline CI |
| **Homologação** | Revisão de escopo | Remoção da página Configurações (ver [change-management.md](change-management.md)) |
| **Sprint 5** | Documentação | Documentação técnica completa |
| **Sprint Final** | Entrega | Revisão de código, padronização, acessibilidade e validação final |

### Princípios ágeis aplicados

1. **Entrega incremental** — cada sprint produziu software funcional
2. **Adaptação de escopo** — página Configurações removida após feedback do cliente
3. **Feedback contínuo** — homologação com o cliente antes da entrega final
4. **Qualidade desde o início** — testes e CI integrados desde a Sprint 4
5. **Documentação como entrega** — Sprint 5 dedicada à documentação técnica
6. **Revisão final** — Sprint Final com foco em qualidade, padronização e estabilidade

## Organização do GitHub Projects

O backlog e o acompanhamento das sprints foram gerenciados via **GitHub Projects**, utilizando o template Kanban:

```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│   Backlog   │  │  To Do      │  │ In Progress │  │    Done     │
│             │  │             │  │             │  │             │
│ • Feature X │  │ • Layout    │  │ • Kanban    │  │ • Setup     │
│ • Feature Y │  │ • CRUD      │  │ • Testes    │  │ • Roteamento│
│             │  │             │  │             │  │ • Tema      │
└─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘
```

### Práticas adotadas

- **Issues** vinculadas a cards do projeto para rastreabilidade
- **Labels** para categorizar por sprint, tipo (feature, bug, docs) e prioridade
- **Milestones** para marcar entregas de cada sprint
- **Pull Requests** revisados antes do merge na `main`
- **CI automática** validando cada PR antes da integração

### Fluxo de trabalho

```
Issue criada → Card no Backlog → Movido para To Do (sprint planning)
  → In Progress (desenvolvimento) → PR + CI → Done (merge na main)
```

## Limitação de WIP

Embora o sistema não imponha limites numéricos de WIP nas colunas do quadro, a metodologia foi aplicada no desenvolvimento:

- Cada sprint focou em um conjunto limitado de funcionalidades
- Pull requests pequenos e focados
- Pipeline CI com fail fast para feedback rápido

## Referências

- [Kanban Guide — Agile Alliance](https://www.agilealliance.org/glossary/kanban/)
- [GitHub Projects Documentation](https://docs.github.com/pt/issues/planning-and-tracking-with-projects)
