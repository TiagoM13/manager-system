import { ConfirmDialogConfig, store } from '.';

export const confirmDialog = (config: ConfirmDialogConfig) => {
  store.update((state) => {
    state.config = config;
  });

  openDialog();
};

export const openDialog = () => {
  store.update((state) => {
    state.isOpenModal = true;
  });
};

export const closeDialog = () => {
  store.update((s) => {
    s.isOpenModal = false;
  });
};
