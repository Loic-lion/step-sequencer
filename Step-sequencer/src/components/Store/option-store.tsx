import { create } from "zustand";

const useOptionStore = create((set) => ({
  active: false,
  toggleActive: () =>
    set((state: { active: boolean }) => ({ active: !state.active })),
}));

export default useOptionStore;
