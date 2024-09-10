import { Role } from '@/enums';
import { IUser } from '@/interfaces';
import { useAuthStore } from '@/store';

export const useAuth = () => {
  const {
    token,
    user,
    getAuthTokens,
    getCurrentUser,
    logout,
    setCurrentUser,
    setAuthTokens,
  } = useAuthStore.getState();
  const { loading, loadingError, data } = user;

  return {
    token,
    data,
    loading,
    loadingError,
    getAuthTokens,
    getCurrentUser,
    setCurrentUser,
    setAuthTokens,
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

export const usePermissions = () => {
  const user = useCurrentUser();

  const isAdmin = user.role === Role.ADMIN;
  const isEdit = user.role === Role.EDITOR;
  const isDoctor = user.role === Role.CLINICAL;

  return { isAdmin, isEdit, isDoctor };
};
