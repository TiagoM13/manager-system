import { HttpMethod, IHttpClient } from '@/infra/http/http-client-contract';
import { IUploadFile } from '@/shared/interfaces';
import { handleAPIErrors } from '@/shared/utils';

export const uploadFileService = async (
  client: IHttpClient,
  upload: FormData,
): Promise<IUploadFile | undefined> => {
  try {
    return await client.sendRequest(HttpMethod.POST, '/upload', {
      data: upload,
    });
  } catch (error) {
    handleAPIErrors(error);
    return;
  }
};
