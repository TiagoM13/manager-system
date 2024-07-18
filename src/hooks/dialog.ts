import { store } from '@/store/modules/modal';
import {
  closeDialog,
  openDialog,
  confirmDialog,
} from '@/store/modules/modal/actions';

const useDialog = () => {
  const { isOpenModal, config } = store.useState((s) => s);

  return {
    config,
    isOpen: isOpenModal,
    openModal: openDialog,
    closeModal: closeDialog,
    confirmDialog,
  };
};

export { useDialog };
