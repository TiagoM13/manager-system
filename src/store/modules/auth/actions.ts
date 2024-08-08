import { ISignInData, IUser } from '@/interfaces';
import { signInService } from '@/services/auth';
import { toastError } from '@/utils';
import { handleAPIErrors } from '@/utils/common';

import { initialState, useAuthStore } from '.';

export const signIn = async (values: ISignInData) => {
  const { setAuthTokens, setCurrentUser } = useAuthStore.getState();

  try {
    useAuthStore.setState((state) => ({
      ...state,
      user: {
        ...state.user,
        loading: true,
      },
    }));

    const { data } = await signInService(values);

    setAuthTokens(data.token!);
    setCurrentUser(data.user!);

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
  return useAuthStore.getState().user;
};

export const logout = () => {
  new Promise<boolean>((resolve) => {
    try {
      useAuthStore.setState(initialState);
      localStorage.removeItem('authToken');
      resolve(true);
    } catch (error) {
      toastError('Não foi possivel sair, tente novamente.');
    }
  });
};
