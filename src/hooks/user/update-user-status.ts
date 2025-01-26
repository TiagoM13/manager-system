import { CacheKeys } from '@/enums';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UseUpdateUserStatusProps {
  updateUserStatus: (id: number, status: string) => Promise<string | undefined>;
  userId: number;
}

export const useUpdateUserStatus = ({
  updateUserStatus,
  userId,
}: UseUpdateUserStatusProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync: updateUserStatusMutation, isPending } = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) =>
      await updateUserStatus(id, status),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [CacheKeys.USER, userId] }),
  });

  return {
    updateUserStatusMutation,
    isPending,
  };
};
