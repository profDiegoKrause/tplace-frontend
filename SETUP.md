# 🚀 Guia Rápido de Instalação - TPlace

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:
- **Node.js** versão 18 ou superior ([Download](https://nodejs.org/))
- **npm** (já vem com o Node.js) ou **yarn**

Para verificar se já tem instalado:
```bash
node --version
npm --version
```

## Passo a Passo

### 1️⃣ Navegue até a pasta do projeto
```bash
cd tplace-project
```

### 2️⃣ Instale as dependências
```bash
npm install
```

Aguarde alguns minutos enquanto todas as dependências são baixadas.

### 3️⃣ Inicie o servidor de desenvolvimento
```bash
npm run dev
```

### 4️⃣ Acesse no navegador
Abra seu navegador e acesse:
```
http://localhost:3000
```

🎉 Pronto! O TPlace está rodando localmente.

## ⚡ Comandos Úteis

### Desenvolvimento
```bash
npm run dev          # Inicia servidor de desenvolvimento
```

### Build
```bash
npm run build        # Cria versão otimizada para produção
npm run preview      # Visualiza a versão de produção localmente
```

### Qualidade de Código
```bash
npm run lint         # Verifica problemas no código
```

## 🔧 Resolução de Problemas

### Erro: "Cannot find module"
```bash
# Limpe o cache e reinstale
rm -rf node_modules package-lock.json
npm install
```

### Porta 3000 já está em uso
Edite `vite.config.ts` e altere a porta:
```typescript
server: {
  port: 3001,  // Altere para outra porta
  open: true
}
```

### Problemas com TypeScript
```bash
# Limpe o cache do TypeScript
rm -rf node_modules/.vite
npm run dev
```

## 📝 Próximos Passos

1. ✅ Explore os produtos disponíveis
2. ✅ Teste o carrinho de compras
3. ✅ Experimente as opções de compra inteligente
4. ✅ Configure seu checkout
5. ✅ Personalize cores e produtos

## 🎨 Personalizando

### Alterar Cores
Edite `tailwind.config.js` na seção `colors`.

### Adicionar Produtos
Edite `src/TPlace.tsx` no array `products`.

### Modificar Lojas
Edite `src/TPlace.tsx` no array `stores`.

## 📚 Documentação Completa

Consulte o arquivo `README.md` para documentação detalhada.

## 💡 Dicas

- Use **Chrome DevTools** (F12) para debugar
- O Hot Reload está ativado - suas mudanças aparecem automaticamente
- Verifique o console para ver os smoke tests rodando

## 🆘 Precisa de Ajuda?

1. Verifique a documentação no `README.md`
2. Consulte os erros no console do navegador (F12)
3. Verifique os logs no terminal

---

Bom desenvolvimento! 🚀
