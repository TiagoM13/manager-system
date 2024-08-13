import axios from 'axios';

import { getAuthTokens, getCurrentUser } from '@/store/modules/auth/actions';

export const api = axios.create({
  baseURL: process.env.VITE_BASE_URL_API,
});

export const makeMs = (baseURL: string) => {
  const ms = axios.create({
    baseURL,
    params: (params: any): string => {
      return new URLSearchParams(params as any).toString();
    },
  });

  ms.interceptors.request.use((oldConfigs) => {
    const config = { ...oldConfigs };

    const token = getAuthTokens();

    if (token) {
      const bearerToken = `Bearer ${token}`.replace(/['"]+/g, '');
      config.headers.Authorization = token;
    }

    const user = getCurrentUser();

    if (typeof user?.user_type !== 'undefined') {
      config.headers.role = user.user_type;
    }

    return config;
  });

  return ms;
};

export const msHosp = makeMs(process.env.URL_API_HOSP || '');
