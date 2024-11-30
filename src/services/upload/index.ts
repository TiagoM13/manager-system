import { HttpMethod, IHttpClient } from '@/infra/http/http-client-contract';
import { IUploadFile } from '@/interfaces';
import { handleAPIErrors } from '@/utils/common';

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
