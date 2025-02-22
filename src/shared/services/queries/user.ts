import { IMSResponse, IUser, IUsersFilters } from '@/shared/interfaces';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { CacheKeys } from '../cache-keys';

type UserListModelResponse = IMSResponse<IUser[], 'users'> | undefined;

interface UseGetAllUsersProps {
  getAllUsers: (query: IUsersFilters) => Promise<UserListModelResponse>;
  query: IUsersFilters;
}

export const useGetAllUsers = ({ getAllUsers, query }: UseGetAllUsersProps) => {
  const { data: usersResponse, ...rest } = useQuery({
    queryKey: [CacheKeys.USERS, query],
    queryFn: async () => await getAllUsers(query),
    placeholderData: keepPreviousData,
  });

  return {
    usersResponse,
    ...rest,
  };
};

interface UseGetUserProps {
  getUser: (id: number) => Promise<IUser | undefined>;
  userId: number;
  isEnabled?: boolean;
}

export const useGetUser = ({ getUser, userId, isEnabled }: UseGetUserProps) => {
  const { data: userResponse, ...rest } = useQuery({
    queryKey: [CacheKeys.USER, userId],
    queryFn: async () => await getUser(userId),
    enabled: isEnabled,
  });

  return {
    userResponse,
    ...rest,
  };
};
