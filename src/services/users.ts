import { AxiosResponse } from 'axios';

import { IUser, IUsersFilters } from '@/interfaces';

import { api, msHosp } from '.';

export type IResponseMeta = {
  page: number;
  total_pages: number;
  items_per_page: number;
  total_records: number;
  total_current_records: number;
  has_next_page: boolean;
  has_previous_page: boolean;
};

export type IMSResponse<T, PropertyName extends string> = {
  success: boolean;
  meta?: IResponseMeta;
} & { [P in PropertyName]: T };

export const getAllUsersService = async (params: IUsersFilters) => {
  const { name = '', page = 1, page_size = 10 } = params;

  const { data } = await msHosp.get<IMSResponse<IUser[], 'users'>>(`/users`, {
    params: {
      name,
      page,
      limit: page_size,
    },
  });

  // await new Promise((resolve) => setTimeout(resolve, 1000));

  return data;
};

export const getUserService = async (id: number) => {
  const { data } = await api.get<AxiosResponse<IUser>>(`/users/${id}`);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return data;
};

export const createUserService = (data: IUser) => {
  return api.post<IUser>('/users', data);
};

export const updateUserService = (id: number, data: IUser) => {
  return api.put<IUser>(`/users/${id}`, data);
};

export const deleteUserService = async (id: number) => {
  return await api.delete<IUser>(`/users/${id}`);
};
