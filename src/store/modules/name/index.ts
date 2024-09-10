import { create } from 'zustand';

interface IState {
  name: string;
  setName: (name?: string) => void;
}

export const useName = create<IState>((set) => ({
  name: '',
  setName(name) {
    set({ name });
  },
}));

export default { useName };
