import axios from 'axios';

import {
  getAuthTokens,
  getCurrentUser,
  logout,
} from '@/store/modules/auth/actions';

export const createApiClient = (baseURL: string) => {
  const apiClient = axios.create({
    baseURL,
    paramsSerializer: (params) => {
      return new URLSearchParams(params).toString();
    },
  });

  apiClient.interceptors.request.use((oldConfigs) => {
    const config = { ...oldConfigs };

    const token = getAuthTokens();

    if (token) {
      const bearerToken = `Bearer ${token}`.replace(/['"]+/g, '');
      config.headers.Authorization = bearerToken;
    }

    const currentUser = getCurrentUser();

    if (typeof currentUser?.role !== 'undefined') {
      config.headers.role = currentUser.role;
    }

    return config;
  });

  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (
        error?.response?.status === 401 &&
        ![
          '/auth/sign-in',
          '/auth/forgot-password',
          '/users/:userId/change-password',
        ].includes(error.response?.config?.url!)
      ) {
        setTimeout(async () => {
          await logout();
        }, 1000);
      }
      return Promise.reject(error);
    },
  );

  return apiClient;
};

export const hospitalServiceClient = createApiClient(
  process.env.VITE_BASE_URL_API || '',
);
