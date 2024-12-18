import { IMSResponse, IUser, IUsersFilters } from '@/interfaces';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

type UserListModelResponse = IMSResponse<IUser[], 'users'> | undefined;

interface UseAllUsersProps {
  getAllUsers: (query: IUsersFilters) => Promise<UserListModelResponse>;
  query: IUsersFilters;
}

export const useAllUsers = ({ getAllUsers, query }: UseAllUsersProps) => {
  const {
    data: usersResponse,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['users', query],
    queryFn: async () => await getAllUsers(query),
    placeholderData: keepPreviousData,
  });

  return {
    usersResponse,
    isLoading,
    isFetching,
  };
};
