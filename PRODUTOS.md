# 📦 Guia para Adicionar Produtos

## Estrutura de um Produto

Cada produto no TPlace segue esta estrutura:

```typescript
{
  id: number,              // ID único do produto
  name: string,            // Nome do produto
  brand: string,           // Marca
  price: number,           // Preço atual
  oldPrice?: number,       // Preço anterior (opcional - para desconto)
  store: number,           // ID da loja (1-10)
  category: string,        // 'Moda' | 'Esportes' | 'Eletrônicos' | 'Casa'
  image: string,           // URL da imagem
  stock: number,           // Quantidade em estoque
  justInTime: boolean,     // Entrega rápida (hoje mesmo)
  freeShipping: boolean,   // Frete grátis
  installments: number,    // Número de parcelas
  condition: string,       // 'new' | 'used'
  sales: number,           // Número de vendas
  description: string      // Descrição do produto
}
```

## Exemplo Completo

```typescript
{
  id: 11,
  name: 'Notebook Dell Inspiron 15',
  brand: 'Dell',
  price: 3499.90,
  oldPrice: 4299.90,
  store: 3,
  category: 'Eletrônicos',
  image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop',
  stock: 8,
  justInTime: true,
  freeShipping: true,
  installments: 12,
  condition: 'new',
  sales: 156,
  description: 'Notebook Dell Inspiron 15 com Intel Core i5, 8GB RAM, SSD 256GB'
}
```

## Como Adicionar

1. Abra o arquivo `src/TPlace.tsx`
2. Localize o array `products` (linha ~86)
3. Adicione seu novo produto ao final do array:

```typescript
const products = [
  // ... produtos existentes ...
  {
    id: 11, // Próximo ID disponível
    name: 'Seu Produto',
    brand: 'Marca',
    price: 99.90,
    // ... resto das propriedades
  }
]
```

## Dicas de URLs de Imagens

Use o Unsplash para imagens de alta qualidade:

```
https://images.unsplash.com/photo-{ID}?w=400&h=400&fit=crop
```

### Categorias Sugeridas no Unsplash:

**Esportes:**
- Tênis: `photo-1542291026-7eec264c27ff`
- Equipamentos: `photo-1517466787929-bc90951d0974`

**Moda:**
- Roupas: `photo-1523381210434-271e8be1f52b`
- Acessórios: `photo-1523359346063-d879354c0ea5`

**Eletrônicos:**
- Smartphones: `photo-1511707171634-5f897ff02aa9`
- Laptops: `photo-1588872657578-7efd1f1555ed`
- Fones: `photo-1590658268037-6bf12165a8df`

**Casa:**
- Decoração: `photo-1513506003901-1e6a229e2d15`
- Móveis: `photo-1555041469-a586c61ea9bc`

## IDs das Lojas

```typescript
1 - Loja Esportiva Pro (Esportes)
2 - Moda & Estilo (Moda)
3 - Tech Store Local (Eletrônicos)
4 - Casa & Conforto (Casa)
5 - Magazine Popular (Diversos)
6 - Eletrônicos & Cia (Eletrônicos)
7 - Fashion Wear (Moda)
8 - Sports & Fitness (Esportes)
9 - Kids World (Infantil)
10 - Beauty Store (Beleza)
```

## Categorias Disponíveis

- `'Moda'`
- `'Esportes'`
- `'Eletrônicos'`
- `'Casa'`

## Exemplo com Desconto

Para produtos em promoção, defina `oldPrice`:

```typescript
{
  price: 599.90,      // Preço atual
  oldPrice: 799.90,   // Preço anterior
  // O desconto será calculado automaticamente (25% OFF)
}
```

## Produtos com Entrega Rápida

Para produtos com entrega no mesmo dia:

```typescript
{
  justInTime: true,
  store: 3  // Escolha uma loja que suporte (2, 3, 6, 7, 9, 10)
}
```

## Checklist ao Adicionar Produto

- [ ] ID único e sequencial
- [ ] Nome descritivo
- [ ] Marca definida
- [ ] Preço em formato decimal (ex: 99.90)
- [ ] Loja válida (1-10)
- [ ] Categoria correta
- [ ] URL de imagem válida
- [ ] Estoque > 0
- [ ] Número de parcelas razoável (3-12)
- [ ] Descrição clara e objetiva

## Validação Rápida

Após adicionar, teste:

1. ✅ Produto aparece na listagem
2. ✅ Imagem carrega corretamente
3. ✅ Preço formatado em BRL
4. ✅ Badge de desconto aparece (se oldPrice definido)
5. ✅ Filtros funcionam (categoria, loja, entrega)
6. ✅ Adicionar ao carrinho funciona
7. ✅ Opções de compra aparecem

## Template Rápido

Copie e cole este template para adicionar rapidamente:

```typescript
{
  id: 11,
  name: '',
  brand: '',
  price: 0,
  oldPrice: undefined,
  store: 1,
  category: 'Esportes',
  image: 'https://images.unsplash.com/photo-ID?w=400&h=400&fit=crop',
  stock: 10,
  justInTime: false,
  freeShipping: true,
  installments: 6,
  condition: 'new',
  sales: 0,
  description: ''
}
```

## Automatizando

Para adicionar muitos produtos, considere:

1. Criar um script que leia de um CSV
2. Usar uma API para buscar produtos
3. Integrar com um CMS ou admin panel

---

Pronto para adicionar seus produtos! 🛍️
