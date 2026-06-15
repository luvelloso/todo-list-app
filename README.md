# Minimal Todo List App

Frontend da aplicação de lista de tarefas com autenticação de usuário, desenvolvido com React, TypeScript, Vite e Tailwind CSS.

## Funcionalidades

- Cadastro de usuário
- Login com token JWT
- Recuperação da sessão ao recarregar a página
- Listagem de tarefas por data
- Criação de tarefas com categoria
- Marcação de tarefas como pendentes ou concluídas
- Exclusão de tarefas
- Logout do usuário autenticado

## Requisitos

- Node.js 20+
- npm
- Backend FastAPI em execução em `http://127.0.0.1:8000`

## Como executar

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Acesse a aplicação no navegador pelo endereço exibido no terminal. Por padrão, o Vite usa:

```bash
http://localhost:5173
```

## Scripts disponíveis

```bash
npm run dev
```

Executa o frontend em modo de desenvolvimento.

```bash
npm run build
```

Gera a versão de produção e valida os tipos TypeScript.

```bash
npm run lint
```

Executa a análise estática do código.

```bash
npm run preview
```

Serve localmente a versão gerada pelo build.

## Integração com a API

O frontend consome a API configurada em:

```ts
http://127.0.0.1:8000
```

Esse valor está definido em `src/services/api.ts`.

## Estrutura principal

- `src/pages/login.tsx` - tela de login e cadastro
- `src/pages/tasklist-page.tsx` - tela principal da lista de tarefas
- `src/services/api.ts` - integração com os endpoints do backend
- `src/hooks/use-auth.tsx` - controle de autenticação
- `src/hooks/use-tasks.tsx` - controle de tarefas
- `src/components/` - componentes reutilizáveis da interface
