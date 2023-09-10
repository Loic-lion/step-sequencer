import { create } from 'zustand';

const useButtonStore = create((set) => ({
  active: false,
  toggleActive: () => set((state: { active: boolean }) => ({ active: !state.active })),
}));

export default useButtonStore;
