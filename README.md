# RegressionTest — QAZando

![CI](https://github.com/DoglasBSB/RegressionTest-cypress/actions/workflows/ci.yml/badge.svg)
![Cypress](https://img.shields.io/badge/Cypress-13.17.0-04C38E?logo=cypress)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2015+-F7DF1E?logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/license-MIT-blue)

Suite de testes de regressão E2E para a aplicação [automationpratice.com.br](https://automationpratice.com.br), cobrindo os principais fluxos de uma loja virtual — autenticação, navegação de produtos, carrinho e checkout.

---

## Funcionalidades testadas

| Spec | Cenários |
|---|---|
| `login.cy.js` | Login com credenciais válidas, credenciais inválidas e campos vazios |
| `logout.cy.js` | Logout com sucesso |
| `productSearch.cy.js` | Busca de produto por termo |
| `productSelect.cy.js` | Navegação para a página de detalhe do produto |
| `addCart.cy.js` | Adição de produto ao carrinho |
| `checkout.cy.js` | Preenchimento do formulário e finalização de pedido |

---

## Stack

- **[Cypress](https://www.cypress.io/)** 13.17.0 — framework de testes E2E
- **GitHub Actions** — pipeline de CI/CD
- **ESLint** + **eslint-plugin-cypress** — qualidade de código

---

## Pré-requisitos

- Node.js 18+
- npm 9+

---

## Instalação

```bash
# Clone o repositório
git clone https://github.com/DoglasBSB/RegressionTest-cypress.git
cd RegressionTest-QAZando

# Instale as dependências
npm install

# Instale o binário do Cypress
npx cypress install
```

---

## Configuração

Crie o arquivo `cypress.env.json` na raiz do projeto com suas credenciais:

```bash
cp cypress.env.example.json cypress.env.json
```

```json
{
  "USER_EMAIL": "seu-email@exemplo.com",
  "USER_PASSWORD": "sua-senha"
}
```

> `cypress.env.json` está no `.gitignore` — suas credenciais nunca serão commitadas.

---

## Executando os testes

```bash
# Modo headless (CI)
npm test

# Modo interativo (Cypress App)
npm run cy:open
```

---

## Estrutura do projeto

```
├── .github/
│   └── workflows/
│       └── ci.yml              # Pipeline de CI (GitHub Actions)
├── cypress/
│   ├── e2e/
│   │   ├── login.cy.js
│   │   ├── logout.cy.js
│   │   ├── productSearch.cy.js
│   │   ├── productSelect.cy.js
│   │   ├── addCart.cy.js
│   │   └── checkout.cy.js
│   ├── fixtures/
│   │   └── checkout.json       # Dados do formulário de checkout
│   └── support/
│       ├── commands.js         # Custom commands
│       └── e2e.js              # Setup global
├── cypress.config.js
├── cypress.env.example.json
└── package.json
```

---

## Decisões técnicas

### `cy.session()` com `cacheAcrossSpecs`
A autenticação usa `cy.session()` com `cacheAcrossSpecs: true`, o que garante que o login via UI seja executado **uma única vez** em toda a suite. As demais specs restauram a sessão do cache, reduzindo o tempo total de execução.

### Custom commands
Toda a lógica de interação com a UI está encapsulada em custom commands (`commands.js`), mantendo os arquivos de spec limpos e focados em **o que** está sendo testado, não em **como**.

### Fixtures para dados de teste
Dados do formulário de checkout estão em `cypress/fixtures/checkout.json`, separando configuração de comportamento e facilitando manutenção.

### Supressão seletiva de exceções
Em vez de suprimir todos os erros JavaScript da aplicação globalmente, apenas exceções conhecidas de bibliotecas de terceiros são ignoradas, preservando a detecção de bugs reais.

---

## CI/CD

O pipeline executa automaticamente em todo push e pull request para a branch `main`.

Configure os seguintes secrets no repositório (**Settings → Secrets and variables → Actions**):

| Secret | Descrição |
|---|---|
| `CYPRESS_USER_EMAIL` | E-mail do usuário de teste |
| `CYPRESS_USER_PASSWORD` | Senha do usuário de teste |

Em caso de falha, screenshots são enviados como artefatos. Vídeos são sempre retidos para facilitar o debug.

---

## Licença

MIT © [Francisco Dôglas](https://github.com/DoglasBSB)
