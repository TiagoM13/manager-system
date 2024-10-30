import { AxiosResponse } from 'axios';

import { HttpMethod, IHttpClient } from '@/infra/http/http-client-contract';
import {
  IAuthData,
  IChangePasswordData,
  IRecoverPasswordData,
  ISignInData,
  IUser,
} from '@/interfaces';
import { handleAPIErrors } from '@/utils/common';

export const signInService = (
  client: IHttpClient,
  data: ISignInData,
): Promise<IAuthData> =>
  client.sendRequest(HttpMethod.POST, '/auth/sign-in', { data });

export const forgotPasswordService = (
  client: IHttpClient,
  data: IRecoverPasswordData,
): Promise<AxiosResponse> =>
  client.sendRequest(HttpMethod.POST, '/auth/forgot-password', { data });

export const changePasswordService = async (
  client: IHttpClient,
  id: number,
  data: IChangePasswordData,
) => {
  try {
    return await client.sendRequest<AxiosResponse<IUser>>(
      HttpMethod.PATCH,
      `/users/${id}/change-password`,
      { data },
    );
  } catch (error) {
    handleAPIErrors(error);
    return;
  }
};
