# 🤝 Guia de Contribuição - TPlace

Obrigado por considerar contribuir com o TPlace! Este documento vai te ajudar a começar.

## 📋 Índice

1. [Como Posso Contribuir?](#como-posso-contribuir)
2. [Código de Conduta](#código-de-conduta)
3. [Primeiros Passos](#primeiros-passos)
4. [Fluxo de Trabalho](#fluxo-de-trabalho)
5. [Padrões de Código](#padrões-de-código)
6. [Commits](#commits)
7. [Pull Requests](#pull-requests)
8. [Reportando Bugs](#reportando-bugs)
9. [Sugerindo Features](#sugerindo-features)

## 🎯 Como Posso Contribuir?

Existem várias formas de contribuir:

### 💻 Código
- Implementar features do [ROADMAP.md](ROADMAP.md)
- Corrigir bugs
- Melhorar performance
- Adicionar testes
- Refatorar código

### 📝 Documentação
- Melhorar documentação existente
- Adicionar exemplos
- Traduzir documentação
- Criar tutoriais em vídeo

### 🎨 Design
- Propor melhorias de UX/UI
- Criar mockups
- Desenhar ícones
- Melhorar acessibilidade

### 🐛 Testes
- Reportar bugs
- Testar novas features
- Melhorar cobertura de testes

### 💡 Ideias
- Sugerir novas features
- Participar de discussões
- Revisar PRs

## 📜 Código de Conduta

### Nossos Valores

- **Respeito:** Trate todos com respeito e empatia
- **Inclusão:** Seja acolhedor com todos os níveis de experiência
- **Colaboração:** Trabalhe junto, não contra
- **Construtividade:** Críticas devem ser construtivas
- **Transparência:** Seja honesto e direto

### Comportamentos Inaceitáveis

- Linguagem ofensiva ou discriminatória
- Assédio de qualquer tipo
- Trolling ou comentários insultuosos
- Ataques pessoais ou políticos
- Publicar informações privadas de outros

## 🚀 Primeiros Passos

### 1. Setup do Ambiente

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/tplace.git
cd tplace

# Instale as dependências
npm install

# Execute o projeto
npm run dev
```

Consulte [SETUP.md](SETUP.md) para detalhes.

### 2. Explore o Código

- Leia [ESTRUTURA.md](ESTRUTURA.md) para entender a arquitetura
- Navegue pelo código em `src/TPlace.tsx`
- Teste a aplicação localmente

### 3. Escolha uma Issue

- Veja as [issues abertas](https://github.com/seu-usuario/tplace/issues)
- Issues marcadas com `good first issue` são ótimas para começar
- Issues com `help wanted` precisam de ajuda

### 4. Faça um Fork

- Clique em "Fork" no GitHub
- Clone seu fork localmente
- Configure o remote upstream

```bash
git remote add upstream https://github.com/seu-usuario/tplace.git
```

## 🔄 Fluxo de Trabalho

### 1. Crie uma Branch

```bash
# Atualize main
git checkout main
git pull upstream main

# Crie branch para sua feature
git checkout -b feature/minha-feature
# ou
git checkout -b fix/meu-bug
```

### 2. Faça suas Mudanças

- Escreva código limpo e bem documentado
- Siga os [Padrões de Código](#padrões-de-código)
- Adicione testes se aplicável
- Teste suas mudanças

### 3. Commit suas Mudanças

```bash
git add .
git commit -m "feat: adiciona nova funcionalidade"
```

Veja [Commits](#commits) para padrões de mensagens.

### 4. Push para seu Fork

```bash
git push origin feature/minha-feature
```

### 5. Abra um Pull Request

- Vá para seu fork no GitHub
- Clique em "Pull Request"
- Descreva suas mudanças
- Aguarde review

## 📝 Padrões de Código

### TypeScript

```typescript
// ✅ Bom
interface Product {
  id: number
  name: string
  price: number
}

function calculateDiscount(oldPrice: number, price: number): number {
  return Math.round(((oldPrice - price) / oldPrice) * 100)
}

// ❌ Evite
function calc(a, b) {
  return Math.round(((a - b) / a) * 100)
}
```

### React

```tsx
// ✅ Bom - Componente funcional com TypeScript
interface ButtonProps {
  onClick: () => void
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className="btn-primary">
      {children}
    </button>
  )
}

// ❌ Evite - Sem tipos
const Button = ({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>
}
```

### Tailwind CSS

```tsx
// ✅ Bom - Classes ordenadas e legíveis
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">

// ❌ Evite - Classes desordenadas
<div className="bg-white p-4 shadow-md flex rounded-lg items-center justify-between">
```

### Nomenclatura

```typescript
// Variáveis: camelCase
const userName = 'João'
const isLoading = true

// Constantes: UPPER_SNAKE_CASE
const MAX_RETRIES = 3
const API_URL = 'https://api.example.com'

// Componentes: PascalCase
const ProductCard = () => {}
const ShoppingCart = () => {}

// Funções: camelCase com verbo
function fetchProducts() {}
function calculateTotal() {}
```

### Formatação

- Use 2 espaços para indentação
- Sempre use ponto e vírgula
- Use aspas simples para strings
- Máximo de 100 caracteres por linha

O ESLint vai ajudar com isso automaticamente!

## 💬 Commits

### Conventional Commits

Usamos o padrão [Conventional Commits](https://www.conventionalcommits.org/):

```
<tipo>(<escopo>): <descrição>

[corpo opcional]

[rodapé opcional]
```

### Tipos

- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Mudanças na documentação
- `style`: Formatação, ponto e vírgula, etc
- `refactor`: Refatoração de código
- `test`: Adicionar ou modificar testes
- `chore`: Tarefas de manutenção

### Exemplos

```bash
# Feature
git commit -m "feat: adiciona filtro por preço"
git commit -m "feat(cart): implementa sistema de cupons"

# Bug fix
git commit -m "fix: corrige cálculo de desconto"
git commit -m "fix(checkout): resolve erro no pagamento PIX"

# Documentação
git commit -m "docs: atualiza README com novas instruções"
git commit -m "docs(api): adiciona exemplos de uso"

# Refatoração
git commit -m "refactor: simplifica lógica de filtros"
git commit -m "refactor(products): extrai componente ProductCard"

# Estilo
git commit -m "style: formata código com prettier"

# Testes
git commit -m "test: adiciona testes para carrinho"

# Manutenção
git commit -m "chore: atualiza dependências"
git commit -m "chore: configura CI/CD"
```

### Corpo do Commit

Para mudanças complexas, adicione um corpo:

```bash
git commit -m "feat: adiciona sistema de avaliações

- Adiciona modelo de Review
- Implementa UI para avaliações
- Adiciona validação de formulário
- Atualiza API endpoints

Closes #123"
```

## 🔍 Pull Requests

### Checklist

Antes de abrir um PR, certifique-se:

- [ ] O código compila sem erros (`npm run build`)
- [ ] Os testes passam (`npm run test` - se aplicável)
- [ ] O lint passa (`npm run lint`)
- [ ] A documentação foi atualizada (se necessário)
- [ ] Os commits seguem o padrão Conventional Commits
- [ ] A descrição do PR é clara e completa

### Template de PR

```markdown
## Descrição
Breve descrição das mudanças

## Tipo de Mudança
- [ ] Bug fix
- [ ] Nova feature
- [ ] Breaking change
- [ ] Documentação

## Como Testar
1. Passo 1
2. Passo 2
3. Passo 3

## Screenshots (se aplicável)
Cole aqui

## Checklist
- [ ] Código testado localmente
- [ ] Documentação atualizada
- [ ] Commits seguem padrão
- [ ] Lint passa sem erros

## Issues Relacionadas
Closes #123
```

### Review

- Responda aos comentários de forma construtiva
- Faça as mudanças solicitadas
- Seja paciente - reviews podem demorar
- Aprenda com o feedback

## 🐛 Reportando Bugs

### Antes de Reportar

1. Verifique se o bug já foi reportado
2. Tente reproduzir em versão mais recente
3. Verifique a documentação

### Template de Bug Report

```markdown
## Descrição do Bug
Descrição clara e concisa do bug

## Como Reproduzir
1. Vá para '...'
2. Clique em '...'
3. Role até '...'
4. Veja o erro

## Comportamento Esperado
O que deveria acontecer

## Comportamento Atual
O que está acontecendo

## Screenshots
Se aplicável, adicione screenshots

## Ambiente
- OS: [ex: macOS 13.0]
- Browser: [ex: Chrome 120]
- Node: [ex: 18.17.0]
- Versão do TPlace: [ex: 1.0.0]

## Informações Adicionais
Qualquer outro contexto sobre o problema
```

## 💡 Sugerindo Features

### Template de Feature Request

```markdown
## Descrição da Feature
Descrição clara e concisa da feature

## Problema que Resolve
Por que essa feature é necessária?

## Solução Proposta
Como você imagina que funcione?

## Alternativas Consideradas
Outras formas de resolver o problema

## Informações Adicionais
Mockups, referências, etc
```

## 📚 Recursos

- [React Docs](https://react.dev/)
- [TypeScript Docs](https://www.typescriptlang.org/)
- [Tailwind Docs](https://tailwindcss.com/)
- [Conventional Commits](https://www.conventionalcommits.org/)

## ❓ Perguntas?

- Abra uma [Discussion](https://github.com/seu-usuario/tplace/discussions)
- Mande um email para contato@tplace.com
- Entre no nosso Discord

## 🙏 Agradecimentos

Obrigado por contribuir! Toda contribuição é valiosa, seja código, documentação, design ou ideias.

### Hall of Contributors

Todos os contribuidores serão listados aqui! 🌟

---

**Lembre-se:** Este é um projeto colaborativo. Seja gentil, paciente e colaborativo!

Happy coding! 🚀
