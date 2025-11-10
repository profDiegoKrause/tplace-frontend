# 🛍️ TPlace - Marketplace de Comércio Local

TPlace é uma plataforma de e-commerce focada em fortalecer o comércio local, com recursos inovadores como compra just-in-time, entrega agendada e alerta de preço.

![TPlace](https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop)

## ✨ Funcionalidades

### 🎯 Principais Features
- **Compra Imediata** - Adicione produtos ao carrinho e finalize rapidamente
- **Entrega Agendada** - Escolha a data que deseja receber o produto
- **Alerta de Preço** - Seja notificado quando o produto atingir o preço desejado
- **Entrega Rápida (Just-in-Time)** - Receba produtos no mesmo dia
- **Suporte a Lojas Locais** - Fortaleça a economia da sua cidade

### 🎨 Interface
- Design moderno e responsivo
- Paleta de cores verde sustentável
- Animações suaves e feedback visual
- Alta acessibilidade (WCAG 2.1)
- Suporte a teclado completo

### 🛒 Processo de Checkout
1. **Carrinho** - Visualize e gerencie seus produtos
2. **Dados de Entrega** - Preencha informações de envio
3. **Pagamento** - Escolha entre Cartão, PIX (5% desconto) ou Boleto

## 🚀 Tecnologias

- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool rápida
- **Tailwind CSS** - Framework CSS utility-first
- **Lucide React** - Ícones modernos

## 📦 Instalação

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Passos

1. **Clone o repositório ou extraia os arquivos**
```bash
cd tplace-project
```

2. **Instale as dependências**
```bash
npm install
```

3. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

4. **Acesse no navegador**
```
http://localhost:3000
```

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview

# Lint
npm run lint
```

## 📁 Estrutura do Projeto

```
tplace-project/
├── public/              # Arquivos estáticos
├── src/
│   ├── TPlace.tsx      # Componente principal
│   ├── main.tsx        # Ponto de entrada
│   └── index.css       # Estilos globais
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## 🎨 Paleta de Cores

```css
--primary-900: #386641  /* Verde escuro */
--primary-700: #6A994E  /* Verde médio */
--primary-500: #A7C957  /* Verde claro */
--sand: #F2E8CF         /* Bege */
--ink: #1b1b1b          /* Preto suave */
```

## 🔧 Configuração

### Personalizando Cores
Edite `tailwind.config.js` para ajustar as cores do tema:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        900: '#386641',
        700: '#6A994E',
        500: '#A7C957',
      },
      // ...
    }
  }
}
```

### Adicionando Produtos
Edite o array `products` em `src/TPlace.tsx`:

```typescript
const products = [
  {
    id: 1,
    name: 'Produto Exemplo',
    brand: 'Marca',
    price: 99.90,
    oldPrice: 149.90,
    // ...
  }
]
```

## 🧪 Testes

O projeto inclui smoke tests básicos para funções utilitárias. Execute o projeto e verifique o console do navegador para ver os resultados dos testes.

## 📱 Responsividade

O layout é totalmente responsivo e otimizado para:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Wide (1280px+)

## ♿ Acessibilidade

- Skip links para navegação por teclado
- ARIA labels e roles apropriados
- Navegação por teclado completa (Tab, Enter, Setas)
- Indicadores visuais de foco
- Contraste WCAG AA
- Tamanhos mínimos de área clicável (44x44px)

## 🚀 Build para Produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

Para testar a build:
```bash
npm run preview
```

## 📄 Licença

Este projeto está sob a licença MIT.

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer um Fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abrir um Pull Request

## 📞 Suporte

Para dúvidas e suporte, abra uma issue no repositório.

## 🙏 Agradecimentos

- Unsplash pelas imagens
- Lucide pela biblioteca de ícones
- Comunidade React e Tailwind CSS

---

Desenvolvido com ❤️ para fortalecer o comércio local
