import { create } from 'zustand';

export const useStore = create((set) => ({
    // State Awal
    selectedCategory: 'ALL',

    // Actions (Cara mengubah state)
    setCategory: (category) => set({ selectedCategory: category }),
    resetCategory: () => set({ selectedCategory: 'ALL' }),
}));
