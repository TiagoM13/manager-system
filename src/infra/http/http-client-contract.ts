import { AxiosRequestConfig } from 'axios';

export enum HttpMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
  PATCH = 'patch',
}

export interface IHttpClient {
  sendRequest<T>(
    method: HttpMethod,
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<T>;
}
