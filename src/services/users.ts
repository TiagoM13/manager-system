import { IUser, IUsersFilters } from '@/interfaces';

import { api, fetchdata } from '.';

export type IResponseMeta = {
  current_page: number;
  current_page_records: number;
  first_page: boolean;
  last_page: boolean;
  total_pages: number;
  total_records: number;
};

export type IMSResponse<T, PropertyName extends string> = {
  success: boolean;
  meta?: IResponseMeta;
} & { [P in PropertyName]: T };

export const getAllUsersAPI = async ({
  name,
}: IUsersFilters): Promise<IUser[]> => {
  let users = await fetchdata('users');

  if (name) {
    const formatedQuery = name.toLowerCase();
    users = users.filter((user: IUser) =>
      user.name.toLowerCase().includes(formatedQuery),
    );
  }

  return users;
};

export const getUserAPI = (id: number) => {
  return api.get<IUser>(`/users/${id}`);
};

export const createUserService = (data: IUser) => {
  return api.post<IUser>('/users', data);
};

export const updateUserService = (id: number, data: IUser) => {
  return api.put<IUser>(`/users/${id}`, data);
};

export const deleteUserService = (id: number) => {
  return api.delete<IUser>(`/users/${id}`);
};
