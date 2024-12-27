import { AxiosResponse } from 'axios';

import { IChangePasswordData, IUser } from '@/interfaces';
import { useMutation, MutationOptions } from '@tanstack/react-query';

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
    userId: number,
    data: IChangePasswordData,
  ) => Promise<AxiosResponse<IUser> | undefined>;
  userId: number;
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
