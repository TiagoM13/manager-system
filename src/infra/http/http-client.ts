import { AxiosInstance, AxiosRequestConfig } from 'axios';

import { msHosp } from '@/services';

import { HttpMethod, IHttpClient } from './http-client-contract';

export class HttpClient implements IHttpClient {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = msHosp;
  }

  async sendRequest<T>(
    method: HttpMethod,
    url: string,
    config: AxiosRequestConfig = {},
  ): Promise<T> {
    const { data } = await this.axiosInstance.request<T>({
      method,
      url,
      ...config,
    });
    return data;
  }
}
