# Gestão de Mudanças de Escopo

Este documento registra a mudança oficial de escopo do projeto TaskFlow, realizada durante a fase de homologação.

## Contexto

Durante a fase de homologação do sistema, o cliente solicitou uma revisão do escopo original. Após reuniões com a equipe de desenvolvimento, foi identificado que determinadas funcionalidades não eram necessárias para a primeira versão (MVP) do sistema.

## Mudança realizada

### Remoção da página Configurações

| Item | Detalhe |
|------|---------|
| **Funcionalidade** | Página "Configurações" (`/settings`) |
| **Data** | Fase de homologação (pré-entrega MVP) |
| **Tipo** | Redução de escopo |
| **Decisão** | Cliente |

### O que foi removido

- Página `Settings.tsx`
- Rota `/settings`
- Item "Configurações" do menu lateral (sidebar)
- Componentes exclusivos: `SettingRow.tsx`, `SettingsSection.tsx`
- Referências em navegação e títulos de página

### O que foi mantido

- Todas as funcionalidades principais de gerenciamento de tarefas
- Dashboard com estatísticas
- CRUD completo de tarefas
- Quadro Kanban com drag-and-drop
- Filtros, busca e ordenação
- Tema claro/escuro
- Testes automatizados e pipeline CI

## Motivação

A decisão do cliente baseou-se nos seguintes fatores:

1. **Foco no MVP** — concentrar esforços nas funcionalidades essenciais de gestão de tarefas
2. **Redução de complexidade** — simplificar a aplicação para entrega mais rápida
3. **Priorização de valor** — a página Configurações não agregava valor imediato ao fluxo principal
4. **Princípio ágil** — adaptar o escopo conforme feedback do cliente durante a homologação

## Impacto

### Impacto técnico

| Área | Impacto |
|------|---------|
| Código | Remoção de ~3 arquivos e referências em rotas/navegação |
| Testes | Nenhum teste removia (não havia testes para Configurações) |
| Build | Sem impacto — build continua passando |
| CI | Sem impacto — pipeline inalterada |
| Navegação | Sidebar reduzida a Dashboard e Lista de Tarefas |

### Impacto no usuário

- Usuários não terão acesso a configurações do sistema no MVP
- O menu lateral ficou mais enxuto, com foco nas funcionalidades principais
- A rota `/settings` retorna a página 404 (NotFound)

### Impacto no cronograma

- **Positivo** — tempo economizado pode ser investido em qualidade e documentação
- A Sprint 5 foi dedicada à documentação técnica em vez de implementar configurações

## Resultado

A remoção foi executada com sucesso, mantendo a integridade da aplicação:

| Verificação | Status |
|-------------|--------|
| Rotas funcionando | OK |
| Sidebar funcionando | OK |
| Build sem erros | OK |
| Testes passando (139/139) | OK |
| Imports limpos | OK |
| Código morto removido | OK |

## Processo de gestão de mudanças

O processo seguiu as práticas ágeis de adaptação de escopo:

```
1. Identificação da necessidade (homologação com cliente)
2. Análise de impacto (equipe de desenvolvimento)
3. Decisão formal (cliente)
4. Implementação (remoção de código e referências)
5. Validação (testes, build, navegação)
6. Documentação (este documento + README)
```

## Lições aprendidas

1. **Homologação antecipada** — revisar escopo com o cliente antes da entrega final evita retrabalho
2. **Arquitetura modular** — a separação em camadas facilitou a remoção sem efeitos colaterais
3. **Testes como rede de segurança** — a suíte de 139 testes confirmou que a remoção não quebrou funcionalidades existentes
4. **Documentar mudanças** — registrar decisões de escopo é essencial para entregas corporativas e acadêmicas

## Funcionalidades futuras

A página Configurações pode ser reintroduzida em versões futuras, caso o cliente solicite. A arquitetura do projeto suporta a adição de novas rotas e páginas sem refatoração significativa.
