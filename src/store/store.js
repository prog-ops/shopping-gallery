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
}));
