import { create } from 'zustand';

export const useStore = create((set) => ({
    // Initial Category State
    selectedCategory: 'ALL',

    // Category Actions
    setCategory: (category) => set({ selectedCategory: category }),
    resetCategory: () => set({ selectedCategory: 'ALL' }),

    // Cart State
    cart: [],

    // Cart Actions
    addToCart: (product) => set((state) => {
        const existing = state.cart.find(item => item.id === product.id);
        if (existing) {
            return {
                cart: state.cart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            };
        }
        return { cart: [...state.cart, { ...product, quantity: 1 }] };
    }),

    removeFromCart: (productId) => set((state) => ({
        cart: state.cart.filter(item => item.id !== productId)
    })),

    updateQuantity: (productId, amount) => set((state) => ({
        cart: state.cart.map(item => {
            if (item.id === productId) {
                const newQuantity = item.quantity + amount;
                return { ...item, quantity: Math.max(1, newQuantity) };
            }
            return item;
        })
    })),

    // Favorites State
    favorites: [],

    // Favorites Actions
    toggleFavorite: (product) => set((state) => {
        const isFavorite = state.favorites.some(item => item.id === product.id);
        if (isFavorite) {
            return { favorites: state.favorites.filter(item => item.id !== product.id) };
        }
        return { favorites: [...state.favorites, product] };
    }),

    removeFromFavorites: (productId) => set((state) => ({
        favorites: state.favorites.filter(item => item.id !== productId)
    })),

    // Product Detail Modal State
    selectedProduct: null,

    // Modal Actions
    setSelectedProduct: (product) => set({ selectedProduct: product }),
    clearSelectedProduct: () => set({ selectedProduct: null }),

    // Search State
    searchQuery: '',

    // Search Actions
    setSearchQuery: (query) => set({ searchQuery: query }),

    // Checkout State
    isCheckoutOpen: false,

    // Checkout Actions
    setCheckoutOpen: (isOpen) => set({ isCheckoutOpen: isOpen }),
    clearCart: () => set({ cart: [] }),

    // Page Navigation State
    activePage: 'HOME', // 'HOME' or 'TRANSACTIONS'

    // Navigation Actions
    setActivePage: (page) => set({ activePage: page }),

    // Transaction History State
    transactions: [],

    // Transaction Actions
    addTransaction: (transactionData) => set((state) => ({
        transactions: [{ id: Date.now(), date: new Date().toISOString(), ...transactionData }, ...state.transactions]
    })),
}));
