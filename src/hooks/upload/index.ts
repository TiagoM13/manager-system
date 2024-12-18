import { ERROR_PROCESSING_IMAGE } from '@/constants/messages';
import { IUploadFile } from '@/interfaces';
import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query';

import { useNotification } from '../notification';

interface UseUploadFileProps {
  uploadFile: (data: FormData) => Promise<IUploadFile | undefined>;
  queryKeys?: QueryKey;
}

export const useUploadFile = ({
  uploadFile,
  queryKeys,
}: UseUploadFileProps) => {
  const queryClient = useQueryClient();
  const notify = useNotification();

  const { mutateAsync: uploadFileMutation, isPending } = useMutation({
    mutationFn: uploadFile,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys }),
    onError: () => notify.error(ERROR_PROCESSING_IMAGE),
  });

  return {
    uploadFileMutation,
    isPending,
  };
};
