import { IHttpClient } from '@/infra/http/http-client-contract';
import { IRecoverPasswordData, ISignInData, IUser } from '@/interfaces';
import { forgotPasswordService, signInService } from '@/services/auth';
import { handleAPIErrors } from '@/utils/common';

import { initialState, useAuthStore } from '.';

export const authenticateUser = async (
  client: IHttpClient,
  values: ISignInData,
): Promise<boolean> => {
  const { setAuthTokens, setCurrentUser } = useAuthStore.getState();

  try {
    useAuthStore.setState((state) => ({
      ...state,
      user: {
        ...state.user,
        loading: true,
      },
    }));

    const response = await signInService(client, values);

    console.log(response);
    setAuthTokens(response.token!);
    setCurrentUser(response.user!);

    return true;
  } catch (error) {
    useAuthStore.setState((state) => ({
      user: {
        ...state.user,
        loadingError: true,
      },
    }));

    handleAPIErrors(error, 'Falha ao realizar login!');
    throw error;
  } finally {
    useAuthStore.setState((state) => ({
      user: {
        ...state.user,
        loading: false,
      },
    }));
  }
};

export const requestPasswordRecovery = async (
  client: IHttpClient,
  values: IRecoverPasswordData,
): Promise<boolean> => {
  try {
    useAuthStore.setState((state) => ({
      ...state,
      user: {
        ...state.user,
        loading: true,
      },
    }));

    await forgotPasswordService(client, values);

    return true;
  } catch (error) {
    useAuthStore.setState((state) => ({
      user: {
        ...state.user,
        loadingError: true,
      },
    }));

    handleAPIErrors(error, 'Falha ao enviar código de acesso!');
    throw error;
  } finally {
    useAuthStore.setState((state) => ({
      user: {
        ...state.user,
        loading: false,
      },
    }));
  }
};

export const setCurrentUser = (user: IUser) => {
  useAuthStore.setState((state) => ({
    user: {
      ...state.user,
      data: user,
    },
  }));
};

export const setAuthTokens = (token: string) => {
  useAuthStore.setState(() => ({ token }));
};

export const getAuthTokens = () => {
  return useAuthStore.getState().token;
};

export const getCurrentUser = () => {
  return useAuthStore.getState().user.data;
};

export const logout = async (): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    const accept = () => {
      try {
        useAuthStore.setState(initialState);
        localStorage.removeItem('authToken');
        resolve(true);
      } catch (error) {
        handleAPIErrors(
          error,
          'Não foi possível sair, por favor tente novamente!',
        );
        reject(false);
      }
    };

    accept();
  });
};
