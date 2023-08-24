import { create } from "zustand";

interface useStripeModalStore {
  isOpen: boolean;
  quantity: number;
  onOpen: () => void;
  onClose: () => void;
  setPrice: (quantity: number) => void;
}

export const useStripeModal = create<useStripeModalStore>((set) => ({
  quantity: 1,
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false, quantity: 1 }),
  setPrice: (quantity) => set({ quantity }),
}));
