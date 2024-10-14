import { IMSResponse, IUser, IUsersFilters } from '@/interfaces';
import { handleAPIErrors } from '@/utils/common';

import { msHosp } from '../api';

export const getAllUsersService = async (params: IUsersFilters) => {
  const { name = '', page = 1, page_size = 10 } = params;

  const { data } = await msHosp.get<IMSResponse<IUser[], 'users'>>(`/users`, {
    params: {
      name,
      page,
      page_size,
    },
  });

  return data;
};

export const getUserService = async (id: number) => {
  const { data } = await msHosp.get<IMSResponse<IUser, 'user'>>(`/users/${id}`);
  return data.user;
};

export const createUserService = async (data: IUser) => {
  try {
    return await msHosp.post<IMSResponse<IUser, 'user'>>('/users', data);
  } catch (error) {
    handleAPIErrors(error);
    return;
  }
};

export const updateUserService = async (id: number, data: IUser) => {
  return await msHosp.put<IMSResponse<IUser, 'user'>>(`/users/${id}`, data);
};

export const deleteUserService = async (id: number) => {
  try {
    return await msHosp.delete<IMSResponse<IUser, 'user'>>(`/users/${id}`);
  } catch (error) {
    handleAPIErrors(error);
    return;
  }
};
