import { IUser, IUsersFilters } from '@/interfaces';

import { api } from '.';

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

export const getAllUsersService = async ({ name }: IUsersFilters) => {
  const allUsers = await api.get<IUser[]>(`/users`);

  let users = allUsers.data;
  if (name) {
    const formatedQuery = name.toLowerCase();
    users = users.filter((user: IUser) =>
      user.name.toLowerCase().includes(formatedQuery),
    );
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return users;
};

export const getUserService = async (id: number) => {
  const { data } = await api.get<IUser>(`/users/${id}`);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return data;
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
