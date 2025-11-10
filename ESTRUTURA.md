# 📁 Estrutura do Projeto TPlace

## Árvore de Arquivos

```
tplace-project/
│
├── 📄 .env.example              # Exemplo de variáveis de ambiente
├── 📄 .eslintrc.cjs             # Configuração do ESLint
├── 📄 .gitignore                # Arquivos ignorados pelo Git
├── 📄 index.html                # HTML principal
├── 📄 package.json              # Dependências e scripts
├── 📄 postcss.config.js         # Configuração do PostCSS
├── 📄 tailwind.config.js        # Configuração do Tailwind CSS
├── 📄 tsconfig.json             # Configuração do TypeScript
├── 📄 tsconfig.node.json        # TypeScript para configs Node
├── 📄 vite.config.ts            # Configuração do Vite
│
├── 📘 README.md                 # Documentação principal
├── 📘 SETUP.md                  # Guia rápido de instalação
├── 📘 PRODUTOS.md               # Guia para adicionar produtos
├── 📘 ESTRUTURA.md              # Este arquivo
│
└── 📂 src/
    ├── 📄 main.tsx              # Ponto de entrada da aplicação
    ├── 📄 index.css             # Estilos globais + Tailwind
    └── 📄 TPlace.tsx            # Componente principal (3500+ linhas)
```

## 📝 Descrição dos Arquivos

### Configuração

| Arquivo | Descrição |
|---------|-----------|
| `package.json` | Dependências do projeto e scripts npm |
| `vite.config.ts` | Configuração do bundler Vite |
| `tsconfig.json` | Configuração do TypeScript |
| `tailwind.config.js` | Temas e cores do Tailwind |
| `postcss.config.js` | Plugins CSS (Tailwind + Autoprefixer) |
| `.eslintrc.cjs` | Regras de linting |
| `.gitignore` | Arquivos para ignorar no Git |
| `.env.example` | Template de variáveis de ambiente |

### Código Fonte

| Arquivo | Linhas | Descrição |
|---------|--------|-----------|
| `src/main.tsx` | ~10 | Inicializa React e renderiza App |
| `src/index.css` | ~100 | Estilos globais e Tailwind directives |
| `src/TPlace.tsx` | ~3500 | Componente principal com toda lógica |

### Documentação

| Arquivo | Propósito |
|---------|-----------|
| `README.md` | Documentação completa e guia de uso |
| `SETUP.md` | Instruções rápidas de instalação |
| `PRODUTOS.md` | Como adicionar/editar produtos |
| `ESTRUTURA.md` | Visualização da estrutura (este arquivo) |

### Aplicação

| Arquivo | Função |
|---------|--------|
| `index.html` | Shell HTML da aplicação SPA |

## 🎯 Arquivos Principais por Função

### Para Iniciar o Projeto
1. `package.json` - Instalar dependências
2. `vite.config.ts` - Configurar porta e build
3. `SETUP.md` - Seguir instruções

### Para Desenvolver
1. `src/TPlace.tsx` - Lógica principal
2. `src/index.css` - Estilos globais
3. `tailwind.config.js` - Personalizar tema

### Para Personalizar
1. `src/TPlace.tsx` (produtos) - Adicionar produtos
2. `src/TPlace.tsx` (stores) - Adicionar lojas
3. `tailwind.config.js` - Mudar cores

### Para Deploy
1. `package.json` (scripts) - `npm run build`
2. `vite.config.ts` - Otimizações
3. `.env.example` - Variáveis de produção

## 📦 Após Instalação

```
tplace-project/
│
├── ... (arquivos originais)
│
├── 📂 node_modules/           # Dependências instaladas (não versionar)
│   └── ... (~200 MB)
│
└── 📂 dist/                   # Build de produção (após npm run build)
    ├── index.html
    ├── assets/
    │   ├── index-[hash].js
    │   └── index-[hash].css
    └── ...
```

## 🔧 Arquivos Gerados

Durante o desenvolvimento:
- `.vite/` - Cache do Vite
- `node_modules/` - Dependências
- `dist/` - Build de produção

## 📊 Tamanho dos Arquivos

| Arquivo | Tamanho Aprox. |
|---------|----------------|
| `TPlace.tsx` | ~140 KB |
| `index.css` | ~2 KB |
| `package.json` | ~1 KB |
| Bundle final (gzip) | ~80 KB |

## 🎨 Componentes no TPlace.tsx

O arquivo principal contém:

```typescript
TPlace.tsx (3500 linhas)
│
├── 🔧 Utilidades
│   ├── currencyBRL
│   └── computeDiscount()
│
├── 📊 Estado (useState)
│   ├── cart
│   ├── filters (search, category, store, delivery, price)
│   ├── modals (showCart, selectedProduct, quickView)
│   ├── checkout (step, data, purchaseType)
│   └── UI (toast, favorites, loading)
│
├── 💾 Dados
│   ├── stores (10 lojas)
│   ├── products (10 produtos)
│   └── categories
│
├── 🎯 Lógica (useMemo, useEffect)
│   ├── filteredProducts
│   ├── addToCart()
│   ├── removeFromCart()
│   └── getTotalPrice()
│
└── 🎨 Interface (JSX)
    ├── Header
    │   ├── Logo + Busca
    │   ├── Carrinho
    │   └── Categorias
    │
    ├── Banner
    │
    ├── Main
    │   ├── Sidebar (Filtros)
    │   └── Grid de Produtos
    │
    └── Modais
        ├── Carrinho/Checkout (3 steps)
        ├── Quick View
        └── Compra Inteligente
```

## 🚀 Fluxo de Execução

```
1. npm run dev
   ↓
2. Vite inicia servidor
   ↓
3. index.html carrega
   ↓
4. main.tsx executa
   ↓
5. TPlace.tsx renderiza
   ↓
6. Aplicação pronta! 🎉
```

## 🔍 Onde Encontrar...

### Produtos
```typescript
// src/TPlace.tsx - linha ~86
const products = [...]
```

### Lojas
```typescript
// src/TPlace.tsx - linha ~69
const stores = [...]
```

### Cores
```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {...}
  }
}
```

### Estilos Globais
```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Scripts
```json
// package.json
"scripts": {
  "dev": "vite",
  "build": "tsc && vite build",
  ...
}
```

## 📈 Crescimento do Projeto

Arquivos adicionais que você pode criar:

```
src/
├── components/           # Componentes reutilizáveis
│   ├── ProductCard.tsx
│   ├── Header.tsx
│   ├── Cart.tsx
│   └── ...
│
├── types/               # Definições TypeScript
│   ├── Product.ts
│   ├── Store.ts
│   └── ...
│
├── utils/               # Funções utilitárias
│   ├── currency.ts
│   ├── discount.ts
│   └── ...
│
├── hooks/               # Custom hooks
│   ├── useCart.ts
│   ├── useFilters.ts
│   └── ...
│
└── api/                 # Chamadas de API
    ├── products.ts
    └── checkout.ts
```

## 💡 Dicas

1. **Modularize** - Divida TPlace.tsx em componentes menores
2. **Type Safety** - Crie interfaces para Product, Store, etc
3. **Custom Hooks** - Extraia lógica repetida
4. **API** - Integre com backend real
5. **Testes** - Adicione Jest/Vitest

---

Estrutura criada para facilitar o desenvolvimento e manutenção! 🏗️
