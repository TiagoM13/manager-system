import { HttpMethod, IHttpClient } from '@/infra/http/http-client-contract';
import { IDoctor, IMSResponse } from '@/interfaces';
import { handleAPIErrors } from '@/utils';

export const getAllDoctorsPaginatedService = async (client: IHttpClient) => {
  try {
    const pageSize = 50;
    let totalPages = 1;
    let currentPage = 1;
    let allDoctors: IDoctor[] = [];

    do {
      const response = await client.sendRequest<
        IMSResponse<IDoctor[], 'doctors'>
      >(HttpMethod.GET, '/doctors', {
        params: {
          page: currentPage,
          items_per_page: pageSize,
        },
      });

      if (response?.doctors?.length) {
        allDoctors = [...allDoctors, ...response.doctors];
      }

      totalPages = response?.meta?.total_pages || 1;
      currentPage += 1;
    } while (currentPage <= totalPages);

    return allDoctors;
  } catch (error) {
    handleAPIErrors(error);
    return;
  }
};
