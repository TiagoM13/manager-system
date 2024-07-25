import { ConfirmDialogConfig, useDialog } from '.';

export const confirmDialog = (config: ConfirmDialogConfig) => {
  useDialog.setState(() => ({ config, isOpenDialog: true }));
};

export const openDialog = () => {
  useDialog.setState(() => ({
    isOpenDialog: true,
  }));
};

export const closeDialog = () => {
  useDialog.setState(() => ({
    isOpenDialog: false,
  }));
};
