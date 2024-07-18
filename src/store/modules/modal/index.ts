import { Store } from 'pullstate';

export interface ConfirmDialogConfig {
  message: string;
  header?: string;
  icon?: React.ReactNode;
  accept: () => void;
  acceptLabel?: string;
  rejectLabel?: string;
}

interface IStateModal {
  isOpenModal: boolean;
  config: ConfirmDialogConfig | null;
}

const defaultState: IStateModal = {
  isOpenModal: false,
  config: null,
};

export const store = new Store(defaultState);

export const clean = () => store.replace(defaultState);

export default { store, clean, key: '@modal' };
