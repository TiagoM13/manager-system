import { AxiosResponse } from 'axios';

import {
  IAuthData,
  IChangePasswordData,
  IRecoverPasswordData,
  ISignInData,
  IUser,
} from '@/interfaces';
import { msHosp } from '@/services';
import { handleAPIErrors } from '@/utils/common';

export const signInService = (
  data: ISignInData,
): Promise<AxiosResponse<IAuthData>> => msHosp.post('/auth/sign-in', data);

export const forgotPasswordService = (
  data: IRecoverPasswordData,
): Promise<AxiosResponse<void>> => msHosp.post('/auth/forgot-password', data);

export const changePasswordService = async (
  id: number,
  data: IChangePasswordData,
) => {
  try {
    return await msHosp.patch<AxiosResponse<IUser>>(
      `/users/${id}/change-password`,
      data,
    );
  } catch (error) {
    handleAPIErrors(error);
    return null;
  }
};
