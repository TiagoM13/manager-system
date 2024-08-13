import { IUser, IUsersFilters } from '@/interfaces';
import { handleAPIErrors } from '@/utils/common';

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
  try {
    const { name = '', page = 1, page_size = 10 } = params;

    const { data } = await msHosp.get<IMSResponse<IUser[], 'users'>>(`/users`, {
      params: {
        name,
        page,
        limit: page_size,
      },
    });

    return data;
  } catch (error) {
    handleAPIErrors(error);
  }
};

export const getUserService = async (id: number) => {
  try {
    const { data } = await msHosp.get<IMSResponse<IUser, 'user'>>(
      `/users/${id}`,
    );

    return data.user;
  } catch (error) {
    handleAPIErrors(error);
    return null;
  }
};

export const createUserService = (data: IUser) => {
  return api.post<IUser>('/users', data);
};

export const updateUserService = (id: number, data: IUser) => {
  return api.put<IUser>(`/users/${id}`, data);
};

export const deleteUserService = async (id: number) => {
  try {
    return await msHosp.delete<IMSResponse<IUser, 'user'>>(`/users/${id}`);
  } catch (error) {
    handleAPIErrors(error);
    return;
  }
};
