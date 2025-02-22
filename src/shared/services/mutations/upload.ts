import { ERROR_PROCESSING_IMAGE } from '@/shared/constants/messages';
import { useNotification } from '@/shared/hooks';
import { IUploadFile } from '@/shared/interfaces';
import { invalidateRelatedQueries } from '@/shared/utils/invalidate-queries';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UseUploadFileProps {
  uploadFile: (data: FormData) => Promise<IUploadFile | undefined>;
  queryKeys?: string[];
}

export const useUploadFile = ({
  uploadFile,
  queryKeys,
}: UseUploadFileProps) => {
  const queryClient = useQueryClient();
  const notify = useNotification();

  const { mutateAsync: uploadFileMutation, ...rest } = useMutation({
    mutationFn: uploadFile,
    onSuccess: invalidateRelatedQueries({ queryKeys, queryClient }),
    onError: () => notify.error(ERROR_PROCESSING_IMAGE),
  });

  return {
    uploadFileMutation,
    ...rest,
  };
};
