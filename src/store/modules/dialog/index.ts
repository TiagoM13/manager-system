import { create } from 'zustand';

import { Variables } from '@/components';

import { closeDialog, confirmDialog, openDialog } from './actions';

export interface ConfirmDialogConfig {
  message: string;
  header?: string;
  icon?: React.ReactNode;
  accept: () => void;
  acceptLabel?: string;
  rejectLabel?: string;
  rejectBtnColor?: keyof typeof Variables;
  acceptBtnColor?: keyof typeof Variables;
  acceptIcon?: React.ReactNode;
  rejectIcon?: React.ReactNode;
}

interface IStateDialog {
  isOpenDialog: boolean;
  config: ConfirmDialogConfig | null;
  openDialog: () => void;
  closeDialog: () => void;
  confirmDialog: (config: ConfirmDialogConfig) => void;
}

export const useDialog = create<IStateDialog>((set) => ({
  isOpenDialog: false,
  config: null,
  openDialog: () => openDialog(),
  closeDialog: () => closeDialog(),
  confirmDialog: (config: ConfirmDialogConfig) => confirmDialog(config),
  clean: () =>
    set({
      isOpenDialog: false,
      config: null,
    }),
}));

export default { useDialog };
