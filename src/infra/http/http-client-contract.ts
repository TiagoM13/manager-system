import { AxiosRequestConfig } from 'axios';

export enum HttpMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

export interface IHttpClient {
  sendRequest<T>(
    method: HttpMethod,
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<T>;
}
