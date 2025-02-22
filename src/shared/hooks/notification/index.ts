import { Id, toast } from 'react-toastify';

interface UseNotificationReturn {
  message: (msg?: string) => Id;
  success: (msg?: string) => Id;
  error: (msg?: string) => Id;
  warning: (msg?: string) => Id;
  info: (msg?: string) => Id;
}

export const useNotification = (): UseNotificationReturn => {
  const message = (msg?: string) => toast(msg);
  const success = (msg?: string) =>
    toast.success(msg || 'Ação concluída com sucesso!');
  const error = (msg?: string) =>
    toast.error(msg || 'Algo deu errado! Por favor tente novamente.');
  const warning = (msg?: string) =>
    toast.warning(msg || 'É necessário mais atenção!');
  const info = (msg?: string) =>
    toast.info(msg || 'è necessário mais informação!');

  return {
    success,
    error,
    warning,
    info,
    message,
  };
};
