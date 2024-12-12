import { AxiosResponse } from 'axios';

import { HttpMethod, IHttpClient } from '@/infra/http/http-client-contract';
import { IMSResponse, IUser, IUsersFilters } from '@/interfaces';
import { handleAPIErrors } from '@/utils';

export const getAllUsersService = async (
  client: IHttpClient,
  params: IUsersFilters,
) => {
  try {
    const { name = '', page = 1, page_size = 10 } = params;

    const response = await client.sendRequest<IMSResponse<IUser[], 'users'>>(
      HttpMethod.GET,
      '/users',
      {
        params: {
          name,
          page,
          page_size,
        },
      },
    );

    return response;
  } catch (error) {
    handleAPIErrors(error);
    return;
  }
};

export const getUserService = async (client: IHttpClient, id: number) => {
  try {
    const { user } = await client.sendRequest<IMSResponse<IUser, 'user'>>(
      HttpMethod.GET,
      `/users/${id}`,
    );

    return user;
  } catch (error) {
    handleAPIErrors(error);
    return;
  }
};

export const createUserService = async (client: IHttpClient, data: IUser) => {
  try {
    return await client.sendRequest<IMSResponse<IUser, 'user'>>(
      HttpMethod.POST,
      '/users',
      { data },
    );
  } catch (error) {
    handleAPIErrors(error);
    return;
  }
};

export const updateUserService = async (
  client: IHttpClient,
  id: number,
  data: IUser,
) => {
  try {
    return await client.sendRequest<IMSResponse<IUser, 'user'>>(
      HttpMethod.PUT,
      `/users/${id}`,
      { data },
    );
  } catch (error) {
    handleAPIErrors(error);
    return;
  }
};

export const updateUserStatusService = async (
  client: IHttpClient,
  id: number,
  status: string,
): Promise<string | undefined> => {
  try {
    const response = await client.sendRequest<AxiosResponse<string>>(
      HttpMethod.PATCH,
      `/users/${id}/status`,
      {
        data: { status },
      },
    );

    return response.data;
  } catch (error) {
    handleAPIErrors(error);
    return;
  }
};

export const deleteUserService = async (client: IHttpClient, id: number) => {
  try {
    return await client.sendRequest<IMSResponse<IUser, 'user'>>(
      HttpMethod.DELETE,
      `/users/${id}`,
    );
  } catch (error) {
    handleAPIErrors(error);
    return;
  }
};
