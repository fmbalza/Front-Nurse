import { create } from "zustand";

const useManagedStore = create((set) => ({
  managed: null,
  setManaged: (managed) => set({ managed }),
}));

export default useManagedStore;
