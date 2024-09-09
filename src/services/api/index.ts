import { toast } from 'react-toastify';

import axios from 'axios';

import {
  getAuthTokens,
  getCurrentUser,
  logout,
} from '@/store/modules/auth/actions';

export const makeMs = (baseURL: string) => {
  const ms = axios.create({
    baseURL,
    paramsSerializer: (params) => {
      return new URLSearchParams(params).toString();
    },
  });

  ms.interceptors.request.use((oldConfigs) => {
    const config = { ...oldConfigs };

    const token = getAuthTokens();

    if (token) {
      const bearerToken = `Bearer ${token}`.replace(/['"]+/g, '');
      config.headers.Authorization = bearerToken;
    }

    const user = getCurrentUser();

    if (typeof user?.role !== 'undefined') {
      config.headers.role = user.role;
    }

    return config;
  });

  ms.interceptors.response.use(
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

  return ms;
};

export const msHosp = makeMs(process.env.URL_API_HOSP || '');
