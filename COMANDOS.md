# 🔧 Comandos Úteis - TPlace

## 📦 NPM - Gerenciamento de Pacotes

### Instalação
```bash
npm install              # Instala todas as dependências
npm install --legacy-peer-deps  # Se houver conflitos
npm ci                   # Instalação limpa (usa package-lock.json)
```

### Adicionar Pacotes
```bash
npm install <pacote>           # Adiciona dependência
npm install -D <pacote>        # Adiciona dev dependency
npm install <pacote>@<versão>  # Instala versão específica
```

### Remover Pacotes
```bash
npm uninstall <pacote>         # Remove pacote
npm prune                      # Remove dependências não usadas
```

### Atualizar Pacotes
```bash
npm update                     # Atualiza todos os pacotes
npm update <pacote>            # Atualiza pacote específico
npm outdated                   # Lista pacotes desatualizados
```

### Limpeza
```bash
npm cache clean --force        # Limpa cache do npm
rm -rf node_modules package-lock.json
npm install                    # Reinstala tudo
```

## 🚀 Scripts do Projeto

### Desenvolvimento
```bash
npm run dev                    # Inicia servidor dev (porta 3000)
npm run dev -- --port 3001     # Inicia em porta diferente
npm run dev -- --host          # Expõe para rede local
```

### Build
```bash
npm run build                  # Build para produção
npm run preview                # Preview da build
```

### Qualidade
```bash
npm run lint                   # Verifica problemas no código
npm run lint -- --fix          # Corrige problemas automaticamente
```

### Informações
```bash
npm list                       # Lista todas as dependências
npm list --depth=0             # Lista dependências diretas
npm outdated                   # Verifica atualizações disponíveis
```

## 🐛 Troubleshooting

### Erro: "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Erro: Port already in use
```bash
# Matar processo na porta 3000
lsof -ti:3000 | xargs kill -9  # macOS/Linux
netstat -ano | findstr :3000   # Windows (ver PID)
taskkill /PID <PID> /F         # Windows (matar PID)
```

### Erro: EACCES (Permission denied)
```bash
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules
```

### Erro: TypeScript
```bash
# Limpar cache do TypeScript
rm -rf node_modules/.vite
npm run dev
```

### Build falha
```bash
# Limpar e rebuildar
rm -rf dist node_modules
npm install
npm run build
```

## 🔍 Git - Controle de Versão

### Básico
```bash
git init                       # Inicializar repositório
git add .                      # Adicionar todos arquivos
git commit -m "mensagem"       # Commitar mudanças
git push origin main           # Enviar para remoto
```

### Branches
```bash
git branch                     # Listar branches
git branch <nome>              # Criar branch
git checkout <nome>            # Mudar de branch
git checkout -b <nome>         # Criar e mudar
git merge <branch>             # Merge de branch
git branch -d <nome>           # Deletar branch
```

### Histórico
```bash
git log                        # Ver histórico
git log --oneline              # Histórico resumido
git diff                       # Ver mudanças
git status                     # Ver status
```

### Desfazer
```bash
git reset --hard HEAD          # Desfazer todas mudanças
git reset --soft HEAD~1        # Voltar 1 commit
git checkout -- <arquivo>      # Descartar mudanças em arquivo
```

## 🌐 Vite - Dev Server

### Configuração
```bash
# vite.config.ts
export default defineConfig({
  server: {
    port: 3001,                # Mudar porta
    open: true,                # Abrir browser automaticamente
    host: true,                # Expor na rede
    strictPort: true,          # Falhar se porta ocupada
  }
})
```

### Limpar Cache
```bash
rm -rf node_modules/.vite
npm run dev
```

## 🎨 Tailwind CSS

### Gerar Config
```bash
npx tailwindcss init           # Criar tailwind.config.js
npx tailwindcss init -p        # Com PostCSS
```

### Build CSS
```bash
npx tailwindcss -i ./src/input.css -o ./dist/output.css
npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch
```

### Purge CSS não usado
```bash
# Já configurado automaticamente no build
npm run build
```

## 📱 TypeScript

### Verificar Tipos
```bash
npx tsc --noEmit               # Verificar sem gerar arquivos
npx tsc --watch                # Watch mode
```

### Gerar Definições
```bash
npx tsc --declaration          # Gerar .d.ts files
```

## 🔒 Segurança

### Audit
```bash
npm audit                      # Ver vulnerabilidades
npm audit fix                  # Corrigir automaticamente
npm audit fix --force          # Corrigir com breaking changes
```

### Verificar Licenças
```bash
npx license-checker            # Ver licenças dos pacotes
```

## 📊 Análise de Bundle

### Tamanho do Build
```bash
npm run build
du -sh dist                    # Ver tamanho total (Unix)
```

### Visualizar Bundle
```bash
# Instalar analyzer
npm install -D rollup-plugin-visualizer

# Adicionar em vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer'

plugins: [
  react(),
  visualizer({ open: true })
]

# Build e ver análise
npm run build
```

## 🧪 Testes (Futuro)

### Vitest
```bash
npm install -D vitest @testing-library/react
npm run test                   # Rodar testes
npm run test:watch             # Watch mode
npm run test:coverage          # Coverage report
```

### E2E com Playwright
```bash
npm install -D @playwright/test
npx playwright test            # Rodar testes E2E
npx playwright test --ui       # UI mode
npx playwright codegen         # Gravar testes
```

## 🚢 Deploy

### Vercel
```bash
npm install -g vercel
vercel                         # Deploy
vercel --prod                  # Deploy para produção
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy                 # Deploy preview
netlify deploy --prod          # Deploy produção
```

### Docker
```bash
docker build -t tplace .
docker run -p 3000:3000 tplace
```

## 💻 Comandos do Sistema

### Navegação
```bash
pwd                            # Diretório atual
ls -la                         # Listar arquivos (detalhado)
cd <pasta>                     # Mudar diretório
cd ..                          # Voltar um nível
mkdir <nome>                   # Criar pasta
```

### Arquivos
```bash
touch <arquivo>                # Criar arquivo
rm <arquivo>                   # Deletar arquivo
rm -rf <pasta>                 # Deletar pasta recursivamente
cp <origem> <destino>          # Copiar
mv <origem> <destino>          # Mover/Renomear
```

### Busca
```bash
find . -name "*.tsx"           # Buscar arquivos
grep -r "texto" .              # Buscar em conteúdo
```

### Processos
```bash
ps aux                         # Listar processos
top                            # Monitor de processos
kill <PID>                     # Matar processo
killall <nome>                 # Matar por nome
```

## 📝 VSCode - Comandos Úteis

### Atalhos
```
Ctrl/Cmd + P          # Quick Open
Ctrl/Cmd + Shift + P  # Command Palette
Ctrl/Cmd + B          # Toggle Sidebar
Ctrl/Cmd + `          # Toggle Terminal
Ctrl/Cmd + /          # Comentar linha
F2                    # Rename Symbol
Alt + ↑/↓            # Mover linha
Shift + Alt + ↑/↓    # Copiar linha
```

### Extensões Recomendadas
```bash
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension bradlc.vscode-tailwindcss
```

## 🔧 Configurações Úteis

### .npmrc
```
# Criar arquivo .npmrc na raiz
save-exact=true                # Salvar versões exatas
engine-strict=true             # Forçar versão do Node
```

### .nvmrc
```
# Definir versão do Node
18.17.0
```

## 📚 Comandos de Aprendizado

### Node/NPM
```bash
node --version                 # Versão do Node
npm --version                  # Versão do NPM
node <arquivo.js>              # Executar arquivo
```

### Package Info
```bash
npm info <pacote>              # Info sobre pacote
npm repo <pacote>              # Abrir repo do pacote
npm docs <pacote>              # Abrir documentação
```

## 🎯 Alias Úteis (Bash/Zsh)

Adicionar no `~/.bashrc` ou `~/.zshrc`:

```bash
# NPM
alias ni="npm install"
alias nid="npm install -D"
alias nu="npm uninstall"
alias nup="npm update"
alias ndev="npm run dev"
alias nbuild="npm run build"

# Git
alias gs="git status"
alias ga="git add ."
alias gc="git commit -m"
alias gp="git push"
alias gl="git log --oneline"

# Navegação
alias ..="cd .."
alias ...="cd ../.."
alias ll="ls -la"
```

## 🆘 Comandos de Emergência

### Travar/Descongelar Terminal
```
Ctrl + S    # Congela terminal
Ctrl + Q    # Descongela
```

### Interromper Processo
```
Ctrl + C    # Interromper processo atual
Ctrl + Z    # Pausar processo (background)
```

### Sair do Vim
```
:q          # Sair
:q!         # Sair sem salvar
:wq         # Salvar e sair
```

---

## 📖 Recursos Adicionais

- [NPM Docs](https://docs.npmjs.com/)
- [Vite Docs](https://vitejs.dev/)
- [React Docs](https://react.dev/)
- [Tailwind Docs](https://tailwindcss.com/)
- [TypeScript Docs](https://www.typescriptlang.org/)

---

**Dica:** Adicione este arquivo aos favoritos para consulta rápida! 📌
