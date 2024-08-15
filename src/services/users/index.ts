import { IMSResponse, IUser, IUsersFilters } from '@/interfaces';
import { handleAPIErrors } from '@/utils/common';

import { api, msHosp } from '../api';

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

export const createUserService = async (data: IUser) => {
  try {
    return await msHosp.post<IMSResponse<IUser, 'user'>>('/users', data);
  } catch (error) {
    handleAPIErrors(error);
    return;
  }
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
