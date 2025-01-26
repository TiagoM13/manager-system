import { CacheKeys } from '@/enums';
import { IMSResponse, IUser, IUsersFilters } from '@/interfaces';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

type UserListModelResponse = IMSResponse<IUser[], 'users'> | undefined;

interface UseGetAllUsersProps {
  getAllUsers: (query: IUsersFilters) => Promise<UserListModelResponse>;
  query: IUsersFilters;
}

export const useGetAllUsers = ({ getAllUsers, query }: UseGetAllUsersProps) => {
  const {
    data: usersResponse,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: [CacheKeys.USERS, query],
    queryFn: async () => await getAllUsers(query),
    placeholderData: keepPreviousData,
  });

  return {
    usersResponse,
    isLoading,
    isFetching,
  };
};
