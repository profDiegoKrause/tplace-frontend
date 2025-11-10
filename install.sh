#!/bin/bash

echo "🚀 Instalando TPlace..."
echo ""

# Verifica se Node.js está instalado
if ! command -v node &> /dev/null
then
    echo "❌ Node.js não encontrado!"
    echo "Por favor, instale Node.js em: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js encontrado: $(node --version)"
echo "✅ npm encontrado: $(npm --version)"
echo ""

# Instala dependências
echo "📦 Instalando dependências..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Instalação concluída!"
    echo ""
    echo "Para iniciar o projeto, execute:"
    echo "  npm run dev"
    echo ""
    echo "O navegador abrirá automaticamente em http://localhost:3000"
    echo ""
else
    echo ""
    echo "❌ Erro na instalação. Tente novamente com:"
    echo "  npm install --legacy-peer-deps"
    exit 1
fi
