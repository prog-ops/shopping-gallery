import { create } from 'zustand';

export const useStore = create((set) => ({
    // State Awal Kategori
    selectedCategory: 'ALL',

    // Actions Kategori
    setCategory: (category) => set({ selectedCategory: category }),
    resetCategory: () => set({ selectedCategory: 'ALL' }),

    // State Cart
    cart: [],

    // Actions Cart
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

    // State Favorites
    favorites: [],

    // Actions Favorites
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

    // State Modal Detail Produk
    selectedProduct: null,

    // Actions Modal
    setSelectedProduct: (product) => set({ selectedProduct: product }),
    clearSelectedProduct: () => set({ selectedProduct: null }),

    // State Pencarian
    searchQuery: '',

    // Actions Pencarian
    setSearchQuery: (query) => set({ searchQuery: query }),

    // State Checkout
    isCheckoutOpen: false,

    // Actions Checkout
    setCheckoutOpen: (isOpen) => set({ isCheckoutOpen: isOpen }),
    clearCart: () => set({ cart: [] }),
}));
