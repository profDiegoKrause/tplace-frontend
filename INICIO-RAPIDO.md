# 🚀 INÍCIO RÁPIDO - TPlace

## Para Usuários Windows

1. **Duplo clique** em `install.bat`
2. Aguarde a instalação concluir
3. Execute o comando:
   ```
   npm run dev
   ```
4. Acesse: http://localhost:3000

---

## Para Usuários Mac/Linux

1. Abra o terminal nesta pasta
2. Execute:
   ```bash
   ./install.sh
   ```
3. Depois execute:
   ```bash
   npm run dev
   ```
4. Acesse: http://localhost:3000

---

## Instalação Manual

Se os scripts automáticos não funcionarem:

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor de desenvolvimento
npm run dev
```

---

## ⚠️ Problemas Comuns

### "Node.js não encontrado"
- Instale Node.js: https://nodejs.org/
- Versão mínima: 16.0

### "Porta 3000 já em uso"
- O navegador abrirá em outra porta automaticamente
- OU edite `vite.config.ts` e mude a porta

### "Erro ao instalar dependências"
```bash
npm install --legacy-peer-deps
```

---

## 📖 Documentação Completa

Veja o arquivo `README.md` para informações detalhadas sobre:
- Estrutura do projeto
- Personalização
- Funcionalidades
- Deploy em produção

---

## 🎯 Principais Comandos

```bash
npm run dev      # Desenvolvimento
npm run build    # Build de produção
npm run preview  # Testar build localmente
npm run lint     # Verificar código
```

---

**Dúvidas?** Consulte o README.md completo!
