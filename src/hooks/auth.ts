import { IUser } from '@/interfaces';
import { useAuthStore } from '@/store';

export const useAuth = () => {
  const { token, user, getAuthTokens, getCurrentUser, logout } =
    useAuthStore.getState();
  const { loading, loadingError, data } = user;

  return {
    token,
    data,
    loading,
    loadingError,
    getAuthTokens,
    getCurrentUser,
    logout,
  };
};

export const useCurrentUser = (): IUser => {
  const { user } = useAuthStore.getState();

  return user.data || ({} as IUser);
};

export const useIsAuthenticated = () => {
  const { token } = useAuthStore.getState();

  return !!token;
};
