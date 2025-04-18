import { AxiosResponse } from 'axios';

import {
  SchemaForgotPasswordType,
  SchemaLoginType,
} from '@/pages/auth/auth.schema';
import { IChangePasswordData, IUser } from '@/shared/interfaces';
import { MutationOptions, useMutation } from '@tanstack/react-query';

interface IUseSignInProps
  extends Omit<MutationOptions<boolean, Error, SchemaLoginType>, 'mutationFn'> {
  service: (data: SchemaLoginType) => Promise<boolean>;
}

export const useSignIn = ({ service, ...mutationProps }: IUseSignInProps) => {
  return useMutation<boolean, Error, SchemaLoginType>({
    mutationFn: (data) => service(data),
    ...mutationProps,
  });
};

interface UseForgotPasswordProps
  extends Omit<
    MutationOptions<boolean, Error, SchemaForgotPasswordType>,
    'mutationFn'
  > {
  service: (data: SchemaForgotPasswordType) => Promise<boolean>;
}

export const useForgotPassword = ({
  service,
  ...mutationProps
}: UseForgotPasswordProps) => {
  return useMutation<boolean, Error, SchemaForgotPasswordType>({
    mutationFn: (data) => service(data),
    ...mutationProps,
  });
};

interface UseChangePasswordProps
  extends Omit<
    MutationOptions<
      AxiosResponse<IUser> | undefined,
      Error,
      IChangePasswordData
    >,
    'mutationFn'
  > {
  service: (
    userId: string,
    data: IChangePasswordData,
  ) => Promise<AxiosResponse<IUser> | undefined>;
  userId: string;
}

export const useChangePassword = ({
  service,
  userId,
  ...mutationOptions
}: UseChangePasswordProps) => {
  return useMutation<
    AxiosResponse<IUser> | undefined,
    Error,
    IChangePasswordData
  >({
    mutationFn: (values) => service(userId, values),
    ...mutationOptions,
  });
};
