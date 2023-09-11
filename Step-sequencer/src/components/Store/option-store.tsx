import { create } from "zustand";

const useOptionStore = create((set) => ({
  active: false,
  toggleActive: () =>
    set((state: { active: boolean }) => ({ active: !state.active })),

  activeSequencer: false,
  toggleActiveSequencer: () =>
    set((state: { activeSequencer: boolean }) => ({
      activeSequencer: !state.activeSequencer,
    })),

  activeSynth: false,
  toggleActiveSynth: () =>
    set((state: { activeSynth: boolean }) => ({
      activeSynth: !state.activeSynth,
    })),

    activeReadingTrack: false,
    toggleActiveReadingTrack: () =>
      set((state: { activeReadingTrack: boolean }) => ({
        activeReadingTrack: !state.activeReadingTrack,
      })),

}));

export default useOptionStore;
