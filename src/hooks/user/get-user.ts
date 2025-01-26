import { CacheKeys } from '@/enums';
import { IUser } from '@/interfaces';
import { useQuery } from '@tanstack/react-query';

interface UseGetUserProps {
  getUser: (id: number) => Promise<IUser | undefined>;
  userId: number;
  isEnabled?: boolean;
}

export const useGetUser = ({ getUser, userId, isEnabled }: UseGetUserProps) => {
  const {
    data: userResponse,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: [CacheKeys.USER],
    queryFn: async () => await getUser(userId),
    enabled: isEnabled,
  });

  return {
    userResponse,
    isLoading,
    isFetching,
  };
};
