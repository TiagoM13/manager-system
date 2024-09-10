import axios from 'axios';

import { getAuthTokens, getCurrentUser } from '@/store/modules/auth/actions';

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

  return ms;
};

export const msHosp = makeMs(process.env.URL_API_HOSP || '');
