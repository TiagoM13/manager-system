import { handleAPIErrors } from '@/utils/common';

import { msHosp } from '../api';

export const upladFileService = async (upload: FormData) => {
  try {
    return await msHosp.post('/upload', upload);
  } catch (error) {
    handleAPIErrors(error);
    return;
  }
};
