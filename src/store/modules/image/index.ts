import { create } from 'zustand';

interface IState {
  imageUrl: string | null;
  setImageUrl: (imageUrl?: string | null) => void;
}

export const useImageUrl = create<IState>((set) => ({
  imageUrl: null,
  setImageUrl(imageUrl) {
    set({ imageUrl });
  },
}));

export default { useImageUrl };
