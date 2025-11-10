import React, { useState, useMemo, useEffect, useRef } from 'react'
import {
  ShoppingCart,
  Search,
  Clock,
  Store,
  Filter,
  X,
  Star,
  Truck,
  Calendar,
  AlertCircle,
  Package,
  Tag,
  CreditCard,
  Eye,
  Heart,
  Check,
  Plus,
  Minus,
  Zap,
} from 'lucide-react'

/**
 * TPlace - Marketplace de comércio local
 * Plataforma focada em fortalecer o comércio local com recursos como:
 * - Compra just-in-time
 * - Compra condicional (entrega agendada e alerta de preço)
 * - Suporte a lojas locais
 */

// === Utilidades puras (facilitam testes) ===
const currencyBRL = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
})

function computeDiscount(oldPrice?: number, price?: number) {
  if (!oldPrice || !price || oldPrice <= 0) return 0
  return Math.max(0, Math.round(((oldPrice - price) / oldPrice) * 100))
}

const TPlace = () => {
  const [cart, setCart] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStore, setSelectedStore] = useState('all')
  const [deliveryFilter, setDeliveryFilter] = useState('all')
  const [showCart, setShowCart] = useState(false)
  // selectedProduct modal removed; selections now happen inside quickViewProduct modal
  const [quickViewProduct, setQuickViewProduct] = useState<any | null>(null)
  const [sortBy, setSortBy] = useState('relevance')
  const [priceRange, setPriceRange] = useState('all')
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' as 'success' | 'error' | 'info' })
  const [favorites, setFavorites] = useState<number[]>([])
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [selectedStorage, setSelectedStorage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [checkoutStep, setCheckoutStep] = useState(1)
  const [purchaseType, setPurchaseType] = useState<'immediate' | 'scheduled' | 'priceAlert'>('immediate')
  const [conditionalDate, setConditionalDate] = useState('')
  const [conditionalPrice, setConditionalPrice] = useState('')
  const [checkoutData, setCheckoutData] = useState({
    name: '',
    email: '',
    phone: '',
    cep: '',
    address: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    paymentMethod: 'credit' as 'credit' | 'pix' | 'boleto',
  })

  const firstModalFocusable = useRef<HTMLButtonElement | null>(null)

  // Lojas
  const stores = [
  { id: 1, name: 'Calçados Mara Toledo',        category: 'Esportes',     rating: 4.9, deliveryTime: '1-2 dias',   address: 'Rua Dom Pedro II – Centro',        justInTime: false, freeShipping: true },
  { id: 2, name: 'Yellow Boutique Shopping Panambi', category: 'Moda',      rating: 4.8, deliveryTime: '24h',       address: 'Rua Haroldo Hamilton, 478 – Shopping Panambi', justInTime: true,  freeShipping: true },
  { id: 3, name: 'Magazine Luiza – Centro',     category: 'Eletrônicos', rating: 4.9, deliveryTime: '2-4 horas', address: 'Rua Barão do Rio Branco, 1145 – Centro', justInTime: true, freeShipping: false },
  { id: 4, name: 'Papelaria Barão & Casa Conforto', category: 'Casa',       rating: 4.7, deliveryTime: '1-3 dias', address: 'Rua Guarani, 1408 – Centro',        justInTime: false, freeShipping: true },
  { id: 5, name: 'Lojas G – Utilidades Diversas', category: 'Diversos',    rating: 4.6, deliveryTime: '1-2 dias', address: 'Av. Parigot de Souza, 992 – Jardim Porto Alegre', justInTime: false, freeShipping: true },
  { id: 6, name: 'Mundial Calçados – Eletrônicos & Cia', category: 'Eletrônicos', rating: 4.8, deliveryTime: '4-6 horas', address: 'Rua Barão do Rio Branco, 1333 – Centro', justInTime: true, freeShipping: false },
  { id: 7, name: 'Rio Fashion – Moda Feminina',   category: 'Moda',        rating: 4.9, deliveryTime: '24h',       address: 'Rua Haroldo Hamilton, 478 – Shopping Panambi', justInTime: true, freeShipping: true },
  { id: 8, name: 'Calcebel Sports & Fitness',   category: 'Esportes',     rating: 4.7, deliveryTime: '1-2 dias',   address: 'Avenida Tiradentes, 1045 – Centro',         justInTime: false, freeShipping: true },
  { id: 9, name: 'Kids Bella Senhorita – Infantil', category: 'Infantil', rating: 4.8, deliveryTime: '24h',       address: 'Rua Haroldo Hamilton, 478 – Shopping Panambi', justInTime: true,  freeShipping: true },
  { id:10, name: 'Bonita Cosméticos – Beauty Store', category: 'Beleza',   rating: 4.9, deliveryTime: '2-4 horas', address: 'Rua Barão do Rio Branco, 1333 – Centro',        justInTime: true,  freeShipping: false },
];


  // Produtos (amostra)
  const products = [
    { id: 1, name: 'Nike Air Max 90 Essential', brand: 'Nike', price: 699.9, oldPrice: 899.9, store: 1, category: 'Esportes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop', stock: 25, justInTime: false, freeShipping: true, installments: 10, condition: 'new', sales: 847, description: 'Tênis Nike Air Max 90 com design clássico e conforto excepcional', sizes: Array.from({length:10},(_,i)=>String(35+i)), colors: ['#000000','#ffffff','#f97316'] },
    { id: 2, name: 'Nike Air Force 1 Branco', brand: 'Nike', price: 599.9, oldPrice: 799.9, store: 1, category: 'Esportes', image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&h=400&fit=crop', stock: 30, justInTime: false, freeShipping: true, installments: 10, condition: 'new', sales: 1234, description: 'Icônico Nike Air Force 1 branco, perfeito para qualquer ocasião', sizes: Array.from({length:10},(_,i)=>String(35+i)), colors: ['#ffffff','#000000','#ef4444'] },
    { id: 3, name: 'Adidas Ultraboost 22', brand: 'Adidas', price: 799.9, oldPrice: 999.9, store: 1, category: 'Esportes', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop', stock: 18, justInTime: false, freeShipping: true, installments: 10, condition: 'new', sales: 623, description: 'Adidas Ultraboost com tecnologia Boost para máximo conforto', sizes: Array.from({length:10},(_,i)=>String(35+i)), colors: ['#111827','#94a3b8','#10b981'] },
    { id: 4, name: 'Adidas Superstar Clássico', brand: 'Adidas', price: 449.9, store: 8, category: 'Esportes', image: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=400&h=400&fit=crop', stock: 40, justInTime: false, freeShipping: true, installments: 8, condition: 'new', sales: 1567, description: 'O clássico Adidas Superstar que nunca sai de moda', sizes: Array.from({length:10},(_,i)=>String(35+i)), colors: ['#ffffff','#000000'] },
    { id: 5, name: 'Puma RS-X Colorido', brand: 'Puma', price: 549.9, oldPrice: 699.9, store: 8, category: 'Esportes', image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&h=400&fit=crop', stock: 22, justInTime: false, freeShipping: true, installments: 9, condition: 'new', sales: 445, description: 'Puma RS-X com design moderno e colorido', sizes: Array.from({length:10},(_,i)=>String(35+i)), colors: ['#f97316','#06b6d4','#a78bfa'] },
    { id: 6, name: 'Camiseta Nike Dri-Fit Training', brand: 'Nike', price: 129.9, oldPrice: 179.9, store: 2, category: 'Moda', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop', stock: 50, justInTime: true, freeShipping: true, installments: 3, condition: 'new', sales: 2145, description: 'Camiseta Nike com tecnologia Dri-Fit para treinos intensos', sizes: ['P','M','G','GG'], colors: ['#111827','#ef4444','#06b6d4'] },
    { id: 7, name: 'Moletom Nike Sportswear', brand: 'Nike', price: 299.9, oldPrice: 399.9, store: 2, category: 'Moda', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop', stock: 35, justInTime: true, freeShipping: true, installments: 6, condition: 'new', sales: 876, description: 'Moletom Nike confortável para o dia a dia', sizes: ['P','M','G','GG'], colors: ['#111827','#64748b'] },
    { id: 8, name: 'Jaqueta Adidas Corta-Vento', brand: 'Adidas', price: 349.9, oldPrice: 499.9, store: 7, category: 'Moda', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop', stock: 22, justInTime: true, freeShipping: true, installments: 7, condition: 'new', sales: 543, description: 'Jaqueta Adidas impermeável e respirável', sizes: ['P','M','G','GG'], colors: ['#0f172a','#0ea5a9'] },
    { id: 9, name: 'Samsung Galaxy S24 Ultra 256GB', brand: 'Samsung', price: 5499.9, oldPrice: 6499.9, store: 3, category: 'Eletrônicos', image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop', stock: 12, justInTime: true, freeShipping: false, installments: 12, condition: 'new', sales: 234, description: 'Top de linha Samsung com câmera profissional e S Pen', storageVariants: ['256GB','512GB'], colors: ['#0f172a','#ffffff','#94a3b8'] },
    { id: 10, name: 'Samsung Galaxy Buds2 Pro', brand: 'Samsung', price: 899.9, oldPrice: 1299.9, store: 3, category: 'Eletrônicos', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop', stock: 30, justInTime: true, freeShipping: false, installments: 10, condition: 'new', sales: 678, description: 'Fones Samsung com cancelamento de ruído ativo', colors: ['#111827','#f97316'] },
  ]

  const categories = ['all', 'Moda', 'Esportes', 'Eletrônicos', 'Casa']

  // Navegação por teclado nas abas de categorias
  const onTabsKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const idx = categories.indexOf(selectedCategory)
    if (e.key === 'ArrowRight') setSelectedCategory(categories[(idx + 1) % categories.length])
    else if (e.key === 'ArrowLeft') setSelectedCategory(categories[(idx - 1 + categories.length) % categories.length])
  }

  // Filtro + ordenação
  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
      const matchesStore = selectedStore === 'all' || product.store === parseInt(String(selectedStore))
      const matchesDelivery =
        deliveryFilter === 'all' ||
        (deliveryFilter === 'fast' && product.justInTime) ||
        (deliveryFilter === 'standard' && !product.justInTime)

      let matchesPrice = true
      if (priceRange === 'under100') matchesPrice = product.price < 100
      else if (priceRange === '100to500') matchesPrice = product.price >= 100 && product.price < 500
      else if (priceRange === '500to1000') matchesPrice = product.price >= 500 && product.price < 1000
      else if (priceRange === 'over1000') matchesPrice = product.price >= 1000

      return matchesSearch && matchesCategory && matchesStore && matchesDelivery && matchesPrice
    })

    if (sortBy === 'price_asc') filtered.sort((a, b) => a.price - b.price)
    else if (sortBy === 'price_desc') filtered.sort((a, b) => b.price - a.price)
    else if (sortBy === 'sales') filtered.sort((a, b) => b.sales - a.sales)

    return filtered
  }, [searchTerm, selectedCategory, selectedStore, deliveryFilter, priceRange, sortBy])

  // Toast
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ show: true, message, type })
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000)
  }

  // Carrinho
  const addToCart = (product: any, type: 'immediate' | 'scheduled' | 'priceAlert' = 'immediate', conditions: any = {}, qty = 1) => {
    const store = stores.find((s) => s.id === product.store)!
    const items = Array.from({ length: qty }).map((_, i) => ({
      ...product,
      storeName: store.name,
      purchaseType: type,
      conditions,
      cartId: Date.now() + i,
    }))
    setCart((prev) => [...prev, ...items])
    showToast(`${qty} ${qty === 1 ? 'produto adicionado' : 'produtos adicionados'} ao carrinho!`)
  }

  const removeFromCart = (cartId: number) => {
    setCart((c) => c.filter((item) => item.cartId !== cartId))
    showToast('Produto removido do carrinho', 'info')
  }

  const getTotalPrice = () => cart.reduce((sum, item) => sum + item.price, 0)

  // Simular loading ao mudar filtros
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 300)
    return () => clearTimeout(timer)
  }, [selectedCategory, selectedStore, deliveryFilter, priceRange, sortBy])

  // Trava scroll do body quando há modal
  useEffect(() => {
  const modalOpen = showCart || !!quickViewProduct
    if (typeof document !== 'undefined') {
      document.body.style.overflow = modalOpen ? 'hidden' : ''
    }
  }, [showCart, quickViewProduct])

  // Foco inicial nos modais
  useEffect(() => {
    if (firstModalFocusable.current) firstModalFocusable.current.focus()
  }, [showCart, quickViewProduct])

  // Quando abrir quick view, inicializa seleções de tamanho/cor/storage
  useEffect(() => {
    if (quickViewProduct) {
      setSelectedSize(quickViewProduct.sizes ? String(quickViewProduct.sizes[0]) : null)
      setSelectedColor(quickViewProduct.colors ? quickViewProduct.colors[0] : null)
      setSelectedStorage(quickViewProduct.storageVariants ? quickViewProduct.storageVariants[0] : null)
      setQuantity(1)
      setPurchaseType('immediate')
      setConditionalDate('')
      setConditionalPrice('')
    }
  }, [quickViewProduct])

  return (
    <div className="min-h-screen bg-sand text-ink">
      {/* Skip link */}
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:bg-white focus:text-ink focus:px-4 focus:py-2 focus:rounded-md focus:shadow-xl focus:z-[70]">Ir para o conteúdo</a>

      {/* Toast */}
      {toast.show && (
        <div className="fixed top-4 right-4 z-[60] animate-slide-in" role="status" aria-live="polite">
          <div
            className={`flex items-center gap-3 px-6 py-4 rounded-lg shadow-2xl text-white ${
              toast.type === 'success' ? 'bg-primary-700' : toast.type === 'error' ? 'bg-error' : 'bg-primary-500'
            }`}
          >
            <Check size={24} className="flex-shrink-0" />
            <p className="font-semibold">{toast.message}</p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-primary-900 text-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          {/* Header separated in two rows: top (logo + cart) and bottom (search). Search is 100% on mobile and 70% centered on desktop */}
          <div className="flex flex-col gap-3">
            {/* Top row: logo left, cart right */}
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* optional logo */}
                {/*<div className="bg-white text-primary-900 p-2 rounded-lg shadow-md" aria-hidden>
                  <img src="logo.png" alt="Logo TPlace" className="w-8 h-8"/>
                </div>*/}
                <div>
                  <h1 className="text-2xl md:text-3xl font-black leading-tight">TPlace</h1>
                  <p className="text-xs/5 font-medium opacity-90 hidden sm:block">Comércio local na palma da sua mão</p>
                </div>
              </div>

              <button
                onClick={() => setShowCart(true)}
                className="relative bg-white text-ink px-4 py-2 rounded-md hover:bg-sand transition flex items-center gap-2 shadow-md min-h-[40px] focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-500/40"
                aria-haspopup="dialog"
                aria-expanded={showCart}
              >
                <ShoppingCart size={20} />
                <span className="font-semibold text-sm hidden sm:inline">Carrinho</span>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary-700 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>

            {/* Bottom row: centered search bar. Mobile: full width; Desktop (md+): 70% width and centered */}
            <div className="w-full">
              <form role="search" aria-label="Buscar produtos" className="relative mt-3 sm:mt-0 w-full md:w-[100%] mx-auto" onSubmit={(e)=>{e.preventDefault()}}>
                <label htmlFor="busca" className="sr-only">Buscar produtos</label>
                <input
                  id="busca"
                  type="search"
                  placeholder="Buscar produtos, marcas e muito mais"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoComplete="off"
                  aria-controls="resultados"
                  className="w-full pl-4 pr-24 py-3 rounded-md text-ink placeholder:opacity-70 focus:outline-none focus:ring-4 focus:ring-primary-500/40 shadow-md"
                />
                <button type="submit" aria-label="Pesquisar" className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary-500 hover:bg-primary-700 px-3 py-2 rounded-md transition min-h-[40px]">
                  <Search size={18} className="text-ink" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Categorias */}
        <div className="bg-primary-900/95 border-t border-primary-700/40 backdrop-blur supports-[backdrop-filter]:bg-primary-900/80">
          <div className="container mx-auto px-4">
            <nav aria-label="Categorias">
              <div role="tablist" aria-orientation="horizontal" className="flex gap-3 overflow-x-auto py-3 text-sm">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    role="tab"
                    onKeyDown={onTabsKeyDown}
                    aria-selected={selectedCategory === cat}
                    aria-controls="resultados"
                    onClick={() => setSelectedCategory(cat)}
                    className={`whitespace-nowrap font-semibold rounded-full px-3 py-2 min-h-[36px] focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-500/40 ${
                      selectedCategory === cat ? 'bg-primary-700 text-white' : 'text-sand-ink hover:bg-primary-700/20 text-white'
                    }`}
                  >
                    {cat === 'all' ? 'Todos' : cat}
                  </button>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Banner */}
      <div className="bg-primary-700 text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Tag size={28} />
              <div>
                <h2 className="font-bold text-xl">Ofertas do dia</h2>
                <p className="text-sm opacity-90">Descontos de até 50% em produtos selecionados</p>
              </div>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-sm opacity-90">Entrega rápida</p>
              <p className="font-bold text-lg">Receba hoje mesmo</p>
            </div>
          </div>
        </div>
      </div>

      <div id="conteudo" className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full lg:w-72 space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-sand-strong p-4">
              <div className="flex items-center gap-2 mb-4">
                <Filter size={18} className="text-primary-700" />
                <h3 className="font-bold">Filtrar</h3>
              </div>

              {/* Preço */}
              <fieldset className="mb-6">
                <legend className="block text-sm font-bold mb-3">Preço</legend>
                <div className="space-y-2">
                  {[
                    { id: 'all', label: 'Todos os preços' },
                    { id: 'under100', label: 'Até R$ 100' },
                    { id: '100to500', label: 'R$ 100 a R$ 500' },
                    { id: '500to1000', label: 'R$ 500 a R$ 1.000' },
                    { id: 'over1000', label: 'Mais de R$ 1.000' },
                  ].map((opt) => (
                    <label key={opt.id} className="flex items-center gap-2 cursor-pointer text-sm">
                      <input
                        type="radio"
                        value={opt.id}
                        checked={priceRange === opt.id}
                        onChange={(e) => setPriceRange(e.target.value)}
                        className="accent-primary-700 w-4 h-4"
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="border-t border-sand-strong my-6" />

              {/* Loja */}
              <div className="mb-6">
                <label
                  htmlFor="select-loja"
                  className="block text-sm font-bold mb-3"
                >
                  Loja
                </label>

                <div className="relative">
                  <select
                    id="select-loja"
                    value={selectedStore}
                    onChange={(e) => setSelectedStore(e.target.value)}
                    className="w-full px-3 py-2 pr-10 border border-sand-strong rounded-md focus:outline-none focus:ring-4 focus:ring-primary-500/30 appearance-none"
                  >
                    <option value="all">Todas as lojas</option>
                    {stores.map((store) => (
                      <option key={store.id} value={store.id}>
                        {store.name}
                      </option>
                    ))}
                  </select>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>


              <div className="border-t border-sand-strong my-6" />

              {/* Entrega */}
              <fieldset>
                <legend className="block text-sm font-bold mb-3">Entrega</legend>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <input
                      type="radio"
                      value="all"
                      checked={deliveryFilter === 'all'}
                      onChange={(e) => setDeliveryFilter(e.target.value)}
                      className="accent-primary-700 w-4 h-4"
                    />
                    <span>Todas</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <input
                      type="radio"
                      value="fast"
                      checked={deliveryFilter === 'fast'}
                      onChange={(e) => setDeliveryFilter(e.target.value)}
                      className="accent-primary-700 w-4 h-4"
                    />
                    <span className="flex items-center gap-1">
                      Entrega rápida <Clock size={14} className="text-primary-700" />
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <input
                      type="radio"
                      value="standard"
                      checked={deliveryFilter === 'standard'}
                      onChange={(e) => setDeliveryFilter(e.target.value)}
                      className="accent-primary-700 w-4 h-4"
                    />
                    <span>Entrega padrão</span>
                  </label>
                </div>
              </fieldset>
            </div>

            <div className="bg-primary-900 text-white rounded-xl shadow-sm p-4">
              <div className="flex items-start gap-3">
                <Package size={24} />
                <div>
                  <h4 className="font-bold mb-1">Apoie o local</h4>
                  <p className="text-sm opacity-90">Fortaleça os comerciantes da sua cidade e impulsione a economia local.</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Lista de produtos */}
          <main className="flex-1 min-w-0">
            {/* Ordenação */}
            <div className="mb-4 bg-white rounded-xl shadow-sm border border-sand-strong p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between">
              <h2 className="text-lg md:text-xl font-bold grow">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'resultado' : 'resultados'}
              </h2>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <label htmlFor="ordenar" className="text-sm font-medium whitespace-nowrap">
                  Ordenar por
                </label>

                <div className="relative w-full sm:w-auto">
                  <select
                    id="ordenar"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 pr-10 border border-sand-strong rounded-md focus:outline-none focus:ring-4 focus:ring-primary-500/30 text-sm font-medium min-w-[220px] appearance-none"
                  >
                    <option value="relevance">Mais relevantes</option>
                    <option value="sales">Mais vendidos</option>
                    <option value="price_asc">Menor preço</option>
                    <option value="price_desc">Maior preço</option>
                  </select>

                  {/* Chevron manual */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>


            {/* Grid */}
            <div id="resultados" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4" aria-busy={isLoading} aria-live="polite">
              {isLoading
                ? [...Array(9)].map((_, i) => (
                    <div key={i} className="bg-white rounded-xl shadow-sm border border-sand-strong overflow-hidden" aria-hidden>
                      <div className="animate-pulse">
                        <div className="bg-sand-strong h-64 w-full" />
                        <div className="p-4 space-y-3">
                          <div className="h-4 bg-sand-strong rounded w-3/4" />
                          <div className="h-4 bg-sand-strong rounded w-1/2" />
                          <div className="h-6 bg-sand-strong rounded w-1/3" />
                        </div>
                      </div>
                    </div>
                  ))
                : filteredProducts.map((product) => {
                    const store = stores.find((s) => s.id === product.store)!
                    const discountPercentage = computeDiscount(product.oldPrice, product.price)
                    const isFavorite = favorites.includes(product.id)

                    return (
                      <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition border border-sand-strong overflow-hidden group relative">
                        {/* Ações rápidas */}
                        <div className="absolute top-2 right-2 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => setQuickViewProduct(product)}
                            className="bg-white p-2 rounded-full shadow-lg hover:bg-sand transition min-h-[40px] min-w-[40px]"
                            title="Visualização rápida"
                            aria-label={`Visualizar rapidamente ${product.name}`}
                          >
                            <Eye size={18} className="text-primary-700" />
                          </button>
                          <button
                            onClick={() => setFavorites((prev) => (isFavorite ? prev.filter((id) => id !== product.id) : [...prev, product.id]))}
                            className={`p-2 rounded-full shadow-lg transition min-h-[40px] min-w-[40px] ${
                              isFavorite ? 'bg-primary-700' : 'bg-white hover:bg-sand'
                            }`}
                            aria-pressed={isFavorite}
                            aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                          >
                            <Heart size={18} className={isFavorite ? 'text-white fill-white' : 'text-primary-700'} />
                          </button>
                        </div>

                        <div className="p-4">
                          <div className="relative mb-4 overflow-hidden rounded-lg bg-sand">
                            <div 
                              className="relative aspect-square cursor-pointer"
                              onClick={() => setQuickViewProduct(product)}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => e.key === 'Enter' && setQuickViewProduct(product)}
                              aria-label={`Ver detalhes de ${product.name}`}
                            >
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            {/* Badges */}
                            <div className="absolute top-2 left-2 flex flex-col gap-2">
                              {discountPercentage > 0 && (
                                <span className="bg-primary-700 text-white text-xs font-bold px-2 py-1 rounded shadow-lg">
                                  {discountPercentage}% OFF
                                </span>
                              )}
                              {product.justInTime && (
                                <span className="bg-primary-500 text-ink text-xs font-bold px-2 py-1 rounded flex items-center gap-1 shadow-lg">
                                  <Zap size={12} /> ENTREGA HOJE
                                </span>
                              )}
                            </div>
                          </div>

                          <p className="text-xs text-ink/70 font-semibold mb-1 uppercase tracking-wide">{product.brand}</p>

                          <h3 className="font-medium text-sm text-ink mb-2 line-clamp-2 h-10">
                            {product.name}
                          </h3>

                          {/* Preços */}
                          <div className="mb-3">
                            {product.oldPrice && (
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs text-ink/60 line-through">
                                  {currencyBRL.format(product.oldPrice)}
                                </span>
                              </div>
                            )}
                            <div className="flex items-baseline gap-2 mb-1">
                              <span className="text-2xl font-semibold text-ink">{currencyBRL.format(product.price)}</span>
                            </div>
                            {product.installments && (
                              <p className="text-xs text-primary-700 font-medium">
                                em até {product.installments}x de {currencyBRL.format(product.price / product.installments)}
                              </p>
                            )}
                          </div>

                          {store.freeShipping && (
                            <div className="mb-3">
                              <span className="inline-flex items-center gap-1 text-xs font-bold text-primary-700 bg-primary-500/30 px-2 py-1 rounded">
                                <Truck size={12} /> Frete grátis
                              </span>
                            </div>
                          )}

                          {/* Cores visíveis no card */}
                          {product.colors && product.colors.length > 0 && (
                            <div className="mb-3 flex items-center gap-2">
                              {product.colors.slice(0, 4).map((c: string, idx: number) => (
                                <span key={idx} className="w-4 h-4 rounded-full border border-sand-strong" style={{ backgroundColor: c }} aria-hidden />
                              ))}
                              {product.colors.length > 4 && <span className="text-xs text-ink/70">+{product.colors.length - 4}</span>}
                            </div>
                          )}

                          <div className="border-t border-sand-strong pt-3 mt-3">
                            <div className="flex items-center justify-between text-xs mb-2">
                              <span className="text-ink/80 flex items-center gap-1 truncate">
                                <Store size={12} className="flex-shrink-0" />
                                <span className="truncate">{store.name}</span>
                              </span>
                              <div className="flex items-center gap-1 flex-shrink-0">
                                <Star size={12} className="text-amber-500 fill-amber-500" />
                                <span className="text-ink font-semibold">{store.rating}</span>
                              </div>
                            </div>
                            <p className="text-xs text-ink/70">{product.sales.toLocaleString('pt-BR')} vendidos</p>
                          </div>

                          {/* Ações */}
                          <div className="space-y-2 mt-4">
                            <button
                              onClick={() => addToCart(product, 'immediate', {}, 1)}
                              className="w-full bg-primary-700 text-white py-3 rounded-lg hover:bg-primary-900 active:scale-[.98] transition font-semibold text-sm focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-500/30 min-h-[44px]"
                            >
                              Adicionar ao carrinho
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
            </div>

            {filteredProducts.length === 0 && !isLoading && (
              <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-sand-strong">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-ink mb-2">Nenhum produto encontrado</h3>
                <p className="text-ink/70">Tente ajustar os filtros ou buscar por outros termos.</p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Modal Carrinho / Checkout */}
      {showCart && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => {
            setShowCart(false)
            setCheckoutStep(1)
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="titulo-checkout"
        >
          <div
            className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b bg-primary-700 text-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 id="titulo-checkout" className="text-xl md:text-2xl font-bold">
                    {checkoutStep === 1 ? 'Carrinho de compras' : checkoutStep === 2 ? 'Dados de entrega' : 'Pagamento'}
                  </h2>
                  <p className="text-sm opacity-90">{cart.length} {cart.length === 1 ? 'produto' : 'produtos'}</p>
                </div>
                <button
                  ref={firstModalFocusable}
                  onClick={() => {
                    setShowCart(false)
                    setCheckoutStep(1)
                  }}
                  className="p-2 hover:bg-white/20 rounded-lg transition"
                  aria-label="Fechar"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Steps */}
              <div className="flex items-center justify-center gap-4" aria-label="Progresso do checkout">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
                      step === checkoutStep ? 'bg-primary-700 ring-2 ring-white' : step < checkoutStep ? 'bg-primary-500' : 'bg-white text-ink'
                    }`}>
                      {step < checkoutStep ? <Check size={20} className={step < checkoutStep ? 'text-white' : 'text-ink'} /> : step}
                    </div>
                    {step < 3 && <div className={`w-16 h-1 mx-2 ${step < checkoutStep ? 'bg-primary-500' : 'bg-white/70'}`} />}
                  </div>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Step 1: Carrinho */}
              {checkoutStep === 1 && (
                <>
                  {cart.length === 0 ? (
                    <div className="text-center py-16">
                      <ShoppingCart size={80} className="mx-auto text-sand-strong mb-4" />
                      <p className="text-xl text-ink font-semibold mb-2">Seu carrinho está vazio</p>
                      <p className="text-ink/70">Adicione produtos e eles aparecerão aqui</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div key={item.cartId} className="flex gap-4 p-4 bg-sand rounded-lg border border-sand-strong hover:border-primary-500/50 transition">
                          <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                          <div className="flex-1">
                            <p className="text-xs text-ink/70 font-semibold uppercase">{item.brand}</p>
                            <h4 className="font-bold text-ink mb-1">{item.name}</h4>
                            <p className="text-sm text-ink/80 flex items-center gap-1 mb-2">
                              <Store size={12} /> {item.storeName}
                            </p>
                            {item.freeShipping && (
                              <span className="inline-flex items-center gap-1 text-xs font-bold text-primary-700 bg-primary-500/20 px-2 py-1 rounded mb-2">
                                <Truck size={12} /> Frete grátis
                              </span>
                            )}
                            {item.purchaseType !== 'immediate' && (
                              <div className="mt-2 bg-primary-500/15 border border-primary-500/30 rounded p-2 text-xs">
                                {item.purchaseType === 'scheduled' && (
                                  <span className="flex items-center gap-1 text-primary-900 font-semibold">
                                    <Calendar size={12} /> Entrega agendada: {new Date(item.conditions.deliveryDate).toLocaleDateString('pt-BR')}
                                  </span>
                                )}
                                {item.purchaseType === 'priceAlert' && (
                                  <span className="flex items-center gap-1 text-primary-900 font-semibold">
                                    <AlertCircle size={12} /> Alerta de preço: {currencyBRL.format(item.conditions.targetPrice)}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                          <div className="text-right flex flex-col justify-between">
                            <div>
                              {item.oldPrice && (
                                <p className="text-xs text-ink/60 line-through mb-1">{currencyBRL.format(item.oldPrice)}</p>
                              )}
                              <p className="font-bold text-xl text-ink mb-1">{currencyBRL.format(item.price)}</p>
                              {item.installments && (
                                <p className="text-xs text-primary-700 font-medium">{item.installments}x {currencyBRL.format(item.price / item.installments)}</p>
                              )}
                            </div>
                            <button onClick={() => removeFromCart(item.cartId)} className="text-error hover:underline text-sm font-semibold mt-2">Remover</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* Step 2: Entrega */}
              {checkoutStep === 2 && (
                <div className="max-w-2xl mx-auto space-y-4">
                  <h3 className="text-lg font-bold text-ink mb-4">Informações de entrega</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Nome completo" value={checkoutData.name} onChange={(e)=>setCheckoutData({...checkoutData, name: e.target.value})} className="px-4 py-3 border-2 border-sand-strong rounded-lg focus:outline-none focus:ring-4 focus:ring-primary-500/30" />
                    <input type="email" placeholder="E-mail" value={checkoutData.email} onChange={(e)=>setCheckoutData({...checkoutData, email: e.target.value})} className="px-4 py-3 border-2 border-sand-strong rounded-lg focus:outline-none focus:ring-4 focus:ring-primary-500/30" />
                  </div>
                  <input type="tel" placeholder="Telefone/WhatsApp" value={checkoutData.phone} onChange={(e)=>setCheckoutData({...checkoutData, phone: e.target.value})} className="w-full px-4 py-3 border-2 border-sand-strong rounded-lg focus:outline-none focus:ring-4 focus:ring-primary-500/30" />
                  <div className="border-t pt-4 mt-4">
                    <h4 className="font-semibold text-ink mb-3">Endereço de entrega</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <input type="text" placeholder="CEP" value={checkoutData.cep} onChange={(e)=>setCheckoutData({...checkoutData, cep: e.target.value})} className="px-4 py-3 border-2 border-sand-strong rounded-lg focus:outline-none focus:ring-4 focus:ring-primary-500/30" />
                    </div>
                    <input type="text" placeholder="Endereço" value={checkoutData.address} onChange={(e)=>setCheckoutData({...checkoutData, address: e.target.value})} className="w-full px-4 py-3 border-2 border-sand-strong rounded-lg focus:outline-none focus:ring-4 focus:ring-primary-500/30 mb-4" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <input type="text" placeholder="Número" value={checkoutData.number} onChange={(e)=>setCheckoutData({...checkoutData, number: e.target.value})} className="px-4 py-3 border-2 border-sand-strong rounded-lg focus:outline-none focus:ring-4 focus:ring-primary-500/30" />
                      <input type="text" placeholder="Complemento (opcional)" value={checkoutData.complement} onChange={(e)=>setCheckoutData({...checkoutData, complement: e.target.value})} className="px-4 py-3 border-2 border-sand-strong rounded-lg focus:outline-none focus:ring-4 focus:ring-primary-500/30" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <input type="text" placeholder="Bairro" value={checkoutData.neighborhood} onChange={(e)=>setCheckoutData({...checkoutData, neighborhood: e.target.value})} className="px-4 py-3 border-2 border-sand-strong rounded-lg focus:outline-none focus:ring-4 focus:ring-primary-500/30" />
                      <input type="text" placeholder="Cidade" value={checkoutData.city} onChange={(e)=>setCheckoutData({...checkoutData, city: e.target.value})} className="px-4 py-3 border-2 border-sand-strong rounded-lg focus:outline-none focus:ring-4 focus:ring-primary-500/30" />
                      <input type="text" placeholder="Estado" value={checkoutData.state} onChange={(e)=>setCheckoutData({...checkoutData, state: e.target.value})} className="px-4 py-3 border-2 border-sand-strong rounded-lg focus:outline-none focus:ring-4 focus:ring-primary-500/30" />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Pagamento */}
              {checkoutStep === 3 && (
                <div className="max-w-2xl mx-auto space-y-4">
                  <h3 className="text-lg font-bold text-ink mb-4">Forma de pagamento</h3>
                  <div className="space-y-3">
                    <label className={`flex items-start gap-4 p-5 border-2 rounded-xl cursor-pointer transition ${checkoutData.paymentMethod === 'credit' ? 'border-primary-700 bg-primary-500/15' : 'border-sand-strong hover:border-primary-500/50'}`}>
                      <input type="radio" value="credit" checked={checkoutData.paymentMethod === 'credit'} onChange={(e)=>setCheckoutData({...checkoutData, paymentMethod: e.target.value as any})} className="mt-1 accent-primary-700" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <CreditCard size={20} className="text-primary-700" />
                          <div className="font-bold text-ink">Cartão de Crédito</div>
                        </div>
                        <div className="text-sm text-ink/80">Parcelamento em até 12x sem juros</div>
                      </div>
                    </label>
                    <label className={`flex items-start gap-4 p-5 border-2 rounded-xl cursor-pointer transition ${checkoutData.paymentMethod === 'pix' ? 'border-primary-700 bg-primary-500/15' : 'border-sand-strong hover:border-primary-500/50'}`}>
                      <input type="radio" value="pix" checked={checkoutData.paymentMethod === 'pix'} onChange={(e)=>setCheckoutData({...checkoutData, paymentMethod: e.target.value as any})} className="mt-1 accent-primary-700" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Zap size={20} className="text-primary-700" />
                          <div className="font-bold text-ink">PIX</div>
                        </div>
                        <div className="text-sm text-ink/80">Pagamento instantâneo com 5% de desconto</div>
                        {checkoutData.paymentMethod === 'pix' && (
                          <div className="mt-3 bg-primary-500/15 p-3 rounded-lg text-sm font-semibold text-primary-900">
                            💰 Total com desconto: {currencyBRL.format(getTotalPrice() * 0.95)}
                          </div>
                        )}
                      </div>
                    </label>
                    <label className={`flex items-start gap-4 p-5 border-2 rounded-xl cursor-pointer transition ${checkoutData.paymentMethod === 'boleto' ? 'border-primary-700 bg-primary-500/15' : 'border-sand-strong hover:border-primary-500/50'}`}>
                      <input type="radio" value="boleto" checked={checkoutData.paymentMethod === 'boleto'} onChange={(e)=>setCheckoutData({...checkoutData, paymentMethod: e.target.value as any})} className="mt-1 accent-primary-700" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Package size={20} className="text-primary-700" />
                          <div className="font-bold text-ink">Boleto Bancário</div>
                        </div>
                        <div className="text-sm text-ink/80">Vencimento em 3 dias úteis</div>
                      </div>
                    </label>
                  </div>

                  {/* Resumo */}
                  <div className="bg-sand rounded-xl p-6 mt-6 border border-sand-strong">
                    <h4 className="font-bold text-ink mb-4">Resumo do pedido</h4>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-ink/90">
                        <span>Subtotal ({cart.length} {cart.length === 1 ? 'item' : 'itens'})</span>
                        <span>{currencyBRL.format(getTotalPrice())}</span>
                      </div>
                      <div className="flex justify-between text-primary-900 font-semibold">
                        <span>Frete</span>
                        <span>Grátis</span>
                      </div>
                      {checkoutData.paymentMethod === 'pix' && (
                        <div className="flex justify-between text-primary-900 font-semibold">
                          <span>Desconto PIX (5%)</span>
                          <span>- {currencyBRL.format(getTotalPrice() * 0.05)}</span>
                        </div>
                      )}
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-ink">Total</span>
                        <span className="text-3xl font-bold text-primary-900">
                          {currencyBRL.format(checkoutData.paymentMethod === 'pix' ? getTotalPrice() * 0.95 : getTotalPrice())}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer do modal */}
            {cart.length > 0 && (
              <div className="p-6 border-t bg-sand">
                <div className="flex items-center justify-between gap-4">
                  {checkoutStep > 1 && (
                    <button onClick={() => setCheckoutStep(checkoutStep - 1)} className="px-6 py-3 border-2 border-sand-strong text-ink rounded-lg hover:bg-white transition font-semibold min-h-[44px]">
                      Voltar
                    </button>
                  )}
                  <div className="flex-1 text-right">
                    <p className="text-sm text-ink/70 mb-1">Total</p>
                    <p className="text-2xl font-bold text-primary-900">{currencyBRL.format(getTotalPrice())}</p>
                  </div>
                  <button
                    onClick={() => {
                      if (checkoutStep < 3) {
                        setCheckoutStep(checkoutStep + 1)
                      } else {
                        showToast('Pedido finalizado com sucesso! 🎉')
                        setCart([])
                        setShowCart(false)
                        setCheckoutStep(1)
                      }
                    }}
                    className="px-8 py-4 bg-primary-700 text-white rounded-lg hover:bg-primary-900 transition font-bold text-lg shadow-lg min-h-[44px]"
                  >
                    {checkoutStep === 1 ? 'Continuar' : checkoutStep === 2 ? 'Ir para pagamento' : 'Finalizar pedido'}
                  </button>
                </div>
                <p className="text-center text-xs text-ink/70 mt-3">Pagamento seguro • Compra protegida • Entrega garantida</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal Quick View */}
      {quickViewProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setQuickViewProduct(null)} role="dialog" aria-modal="true" aria-label={`Pré-visualização de ${quickViewProduct.name}`}>
          <div className="bg-white rounded-2xl w-full md:min-w-[900px] max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col md:flex-row max-h-[90vh] overflow-y-auto">
              <div className="md:w-1/2 bg-sand p-6 md:p-8 flex items-center justify-center relative">
                <button onClick={() => setQuickViewProduct(null)} className="absolute top-4 right-4 p-2 hover:bg-white/50 rounded-lg transition" aria-label="Fechar">
                  <X size={24} className="text-ink" />
                </button>
                <img src={quickViewProduct.image} alt={quickViewProduct.name} className="w-full object-cover rounded-lg shadow-lg" />
              </div>
              <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto">
                <p className="text-xs text-ink/70 font-semibold mb-2 uppercase tracking-wide">{quickViewProduct.brand}</p>
                <h2 className="text-xl md:text-2xl font-bold text-ink mb-3">{quickViewProduct.name}</h2>
                <p className="text-ink/80 mb-4 text-sm">{quickViewProduct.description}</p>
                <div className="flex items-center gap-4 mb-4 pb-4 border-b border-sand-strong">
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-amber-500 fill-amber-500" />
                    <span className="font-semibold text-ink text-sm">{stores.find(s=>s.id===quickViewProduct.store)?.rating}</span>
                    <span className="text-ink/70 text-xs">(124 avaliações)</span>
                  </div>
                  <div className="text-ink/80 text-xs">
                    <span className="font-semibold text-ink">{quickViewProduct.sales.toLocaleString('pt-BR')}</span> vendidos
                  </div>
                </div>
                <div className="mb-4">
                  {quickViewProduct.oldPrice && (
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm text-ink/60 line-through">{currencyBRL.format(quickViewProduct.oldPrice)}</span>
                      <span className="bg-primary-700 text-white text-xs font-bold px-2 py-1 rounded">
                        {computeDiscount(quickViewProduct.oldPrice, quickViewProduct.price)}% OFF
                      </span>
                    </div>
                  )}
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl md:text-4xl font-bold text-primary-900">{currencyBRL.format(quickViewProduct.price)}</span>
                  </div>
                  {quickViewProduct.installments && (
                    <p className="text-primary-900 font-semibold text-sm">ou em até {quickViewProduct.installments}x de {currencyBRL.format(quickViewProduct.price / quickViewProduct.installments)} sem juros</p>
                  )}
                </div>
                <div className="bg-primary-500/15 rounded-lg p-3 mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Truck size={16} className="text-primary-700" />
                    <span className="font-semibold text-ink text-sm">Informações de entrega</span>
                  </div>
                  {stores.find(s=>s.id===quickViewProduct.store)?.freeShipping && (
                    <p className="text-primary-900 font-semibold mb-1 text-sm">✓ Frete grátis</p>
                  )}
                  <p className="text-ink/80 text-xs">Entrega: {stores.find(s=>s.id===quickViewProduct.store)?.deliveryTime}</p>
                  {quickViewProduct.justInTime && (
                    <p className="text-primary-900 font-semibold text-xs mt-1 flex items-center gap-1"><Zap size={12} /> Disponível para entrega hoje!</p>
                  )}
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <Package size={16} className="text-ink/70" />
                  <span className="text-ink text-sm">{quickViewProduct.stock > 10 ? 'Estoque disponível' : `Últimas ${quickViewProduct.stock} unidades!`}</span>
                </div>
                <div className="space-y-4">
                  {/* Seleção de tamanhos (calçados / roupas) */}
                  {quickViewProduct.sizes && (
                    <div>
                      <label className="block text-sm font-bold mb-2">Tamanhos</label>
                      <div className="flex flex-wrap gap-2">
                        {quickViewProduct.sizes.map((s: any) => (
                          <button
                            key={s}
                            onClick={() => setSelectedSize(String(s))}
                            className={`px-3 py-2 border rounded-md text-sm ${selectedSize === String(s) ? 'border-primary-700 bg-primary-500/10' : 'border-sand-strong'}`}
                            aria-pressed={selectedSize === String(s)}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Storage (celulares) */}
                  {quickViewProduct.storageVariants && (
                    <div>
                      <label className="block text-sm font-bold mb-2">Armazenamento</label>
                      <div className="flex gap-2 flex-wrap">
                        {quickViewProduct.storageVariants.map((sv: any) => (
                          <button
                            key={sv}
                            onClick={() => setSelectedStorage(String(sv))}
                            className={`px-3 py-2 border rounded-md text-sm ${selectedStorage === String(sv) ? 'border-primary-700 bg-primary-500/10' : 'border-sand-strong'}`}
                            aria-pressed={selectedStorage === String(sv)}
                          >
                            {sv}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Cores */}
                  {quickViewProduct.colors && (
                    <div>
                      <label className="block text-sm font-bold mb-2">Cores</label>
                      <div className="flex items-center gap-3">
                        {quickViewProduct.colors.map((c: string, idx: number) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedColor(c)}
                            className={`w-8 h-8 rounded-full border-2 ${selectedColor === c ? 'ring-2 ring-primary-700' : 'border-sand-strong'}`}
                            style={{ backgroundColor: c }}
                            aria-label={`Selecionar cor ${c}`}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quantidade */}
                  <div className="flex items-center gap-4">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="bg-white border-2 border-sand-strong text-ink p-2 rounded-lg hover:bg-sand active:scale-[.98] transition min-h-[44px] min-w-[44px]">
                      <Minus size={20} />
                    </button>
                    <input type="number" min={1} max={quickViewProduct.stock} value={quantity} onChange={(e) => setQuantity(Math.min(quickViewProduct.stock, Math.max(1, parseInt(e.target.value) || 1)))} className="w-20 text-center text-lg font-bold border-2 border-sand-strong rounded-lg py-2 focus:outline-none focus:ring-4 focus:ring-primary-500/30" />
                    <button onClick={() => setQuantity(Math.min(quickViewProduct.stock, quantity + 1))} className="bg-white border-2 border-sand-strong text-ink p-2 rounded-lg hover:bg-sand active:scale-[.98] transition min-h-[44px] min-w-[44px]">
                      <Plus size={20} />
                    </button>
                    <span className="text-sm text-ink/80">({quickViewProduct.stock} disponíveis)</span>
                  </div>

                  {/* Tipo de compra (compacto) }
                  <div>
                    <label className="block text-sm font-bold mb-2">Como deseja adquirir?</label>
                    <div className="flex gap-2 flex-col sm:flex-row">
                      <label className={`flex items-center gap-2 p-3 rounded-md border ${purchaseType === 'immediate' ? 'border-primary-700 bg-primary-500/15' : 'border-sand-strong'}`}>
                        <input type="radio" name="purchaseType" value="immediate" checked={purchaseType === 'immediate'} onChange={(e) => setPurchaseType(e.target.value as any)} className="accent-primary-700" />
                        <span className="font-semibold">Compra imediata</span>
                      </label>

                      <label className={`flex items-center gap-2 p-3 rounded-md border ${purchaseType === 'scheduled' ? 'border-primary-700 bg-primary-500/15' : 'border-sand-strong'}`}>
                        <input type="radio" name="purchaseType" value="scheduled" checked={purchaseType === 'scheduled'} onChange={(e) => setPurchaseType(e.target.value as any)} className="accent-primary-700" />
                        <span className="font-semibold">Entrega agendada</span>
                      </label>

                      <label className={`flex items-center gap-2 p-3 rounded-md border ${purchaseType === 'priceAlert' ? 'border-primary-700 bg-primary-500/15' : 'border-sand-strong'}`}>
                        <input type="radio" name="purchaseType" value="priceAlert" checked={purchaseType === 'priceAlert'} onChange={(e) => setPurchaseType(e.target.value as any)} className="accent-primary-700" />
                        <span className="font-semibold">Alerta de preço</span>
                      </label>
                    </div>

                    {purchaseType === 'scheduled' && (
                      <div className="mt-3">
                        <label className="block text-xs font-semibold mb-1">Data desejada</label>
                        <input type="date" value={conditionalDate} onChange={(e) => setConditionalDate(e.target.value)} min={new Date().toISOString().split('T')[0]} className="w-full px-4 py-3 border-2 border-sand-strong rounded-lg focus:outline-none focus:ring-4 focus:ring-primary-500/30" />
                      </div>
                    )}

                    {purchaseType === 'priceAlert' && (
                      <div className="mt-3">
                        <label className="block text-xs font-semibold mb-1">Preço desejado</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/70 font-semibold">R$</span>
                          <input type="number" step="0.01" placeholder="0,00" value={conditionalPrice} onChange={(e) => setConditionalPrice(e.target.value)} className="w-full pl-12 pr-4 py-3 border-2 border-sand-strong rounded-lg focus:outline-none focus:ring-4 focus:ring-primary-500/30" />
                        </div>
                      </div>
                    )}
                  </div>*/}

                  {/* Ações finais */}
                  <div className="pt-2 flex gap-3">
                    <button
                      onClick={() => {
                        const conditions: any = { size: selectedSize, color: selectedColor, storage: selectedStorage }
                        if (purchaseType === 'scheduled') conditions.deliveryDate = conditionalDate
                        if (purchaseType === 'priceAlert') conditions.targetPrice = parseFloat(conditionalPrice || '0')
                        addToCart(quickViewProduct, purchaseType, conditions, quantity)
                        setQuickViewProduct(null)
                      }}
                      disabled={(purchaseType === 'scheduled' && !conditionalDate) || (purchaseType === 'priceAlert' && (!conditionalPrice || parseFloat(conditionalPrice) >= quickViewProduct.price))}
                      className="flex-1 bg-primary-700 text-white py-3 rounded-lg hover:bg-primary-900 transition font-bold disabled:bg-sand-strong disabled:text-ink/50"
                    >
                      Adicionar ao carrinho
                    </button>
                    <button onClick={() => setQuickViewProduct(null)} className="flex-1 border-2 border-sand-strong text-ink py-3 rounded-lg hover:bg-sand transition font-semibold">Cancelar</button>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-sand-strong">
                  <div className="flex items-center gap-3">
                    <div className="bg-sand p-2 rounded-lg"><Store size={20} className="text-ink" /></div>
                    <div>
                      <p className="text-xs text-ink/70">Vendido por</p>
                      <p className="font-semibold text-ink text-sm">{stores.find(s=>s.id===quickViewProduct.store)?.name}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de opções unificada: o modal separado de compra foi removido e a seleção agora acontece no Quick View */}
    </div>
  )
}

export default TPlace

// === Smoke tests (não alteram UI; visíveis no console) ===
;(() => {
  try {
    console.assert(computeDiscount(200, 100) === 50, 'computeDiscount 50%')
    console.assert(computeDiscount(100, 100) === 0, 'computeDiscount 0%')
    console.assert(computeDiscount(undefined as any, 100) === 0, 'computeDiscount input inválido')
    console.assert(currencyBRL.format(1234.56) === new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(1234.56), 'currencyBRL BR padrão')
  } catch (e) {
    console.warn('Smoke tests falharam:', e)
  }
})()
