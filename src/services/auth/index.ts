import { AxiosResponse } from 'axios';

import {
  IAuthData,
  IChangePasswordData,
  IRecoverPasswordData,
  ISignInData,
  IUser,
} from '@/interfaces';
import { msHosp } from '@/services';

export const signInService = (
  data: ISignInData,
): Promise<AxiosResponse<IAuthData>> => msHosp.post('/auth/sign-in', data);

export const forgotPasswordService = (
  data: IRecoverPasswordData,
): Promise<AxiosResponse<void>> => msHosp.post('/auth/forgot-password', data);

export const changePasswordService = (
  data: IChangePasswordData,
): Promise<AxiosResponse<IUser>> =>
  msHosp.patch('/users/change-password', data);
