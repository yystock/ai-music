import { create } from "zustand";

interface useStripeModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useStripeModal = create<useStripeModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
