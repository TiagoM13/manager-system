import { toast } from 'react-toastify';

export const toastMessage = (msg?: string) => toast(msg);

export const toastSuccess = (msg?: string) =>
  toast.success(msg || 'Ação concluída com sucesso!');

export const toastError = (msg?: string) =>
  toast.error(msg || 'Algo deu errado! Por favor tente novamente.');

export const toastWarning = (msg?: string) =>
  toast.warning(msg || 'É necessário mais atenção!');

export const toastInfo = (msg?: string) =>
  toast.info(msg || 'è necessário mais informação!');
