import { toast } from 'react-toastify';

import axios from 'axios';

const ERRORS_MESSAGES_MAPPING: Record<string, string> = {
  'Params do not match JWT (av)': 'Dados do token inválidos',
  'Params not found': 'Dados do token inválidos',
};

let isTokenExpiredShown = false;

export const handleAPIErrors = (
  err: any = {},
  altMsg = 'Ops... Falha ao processar sua solicitação 😔',
) => {
  if (axios.isAxiosError(err)) {
    const { message } = err.response?.data;

    const messages: string[] = [];

    if (typeof message === 'string') {
      messages.push(message);
    }

    if (messages.length) {
      messages.forEach((msg) => {
        if (msg === 'O token expirou') {
          if (!isTokenExpiredShown) {
            toast.error('Sua sessão expirou. Por favor, faça login novamente.');
            isTokenExpiredShown = true;
          }
        } else {
          toast.error(ERRORS_MESSAGES_MAPPING[msg] || msg);
        }
      });
      return;
    }
  }
  if (altMsg) {
    toast.error(altMsg);
  }
};
