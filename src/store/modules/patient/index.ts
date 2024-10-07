import { create } from 'zustand';

import { ModalSection } from '@/pages/patients/patient-details/types/modal';

interface IPatientFormDialogState {
  activeModal: ModalSection | null;
  openModal: (section: ModalSection) => void;
  closeModal: () => void;
}

export const usePatientFormDialog = create<IPatientFormDialogState>()(
  (set) => ({
    activeModal: null,
    openModal: (section: ModalSection) => {
      set({ activeModal: section });
    },
    closeModal: () => {
      set({ activeModal: null });
    },
  }),
);
