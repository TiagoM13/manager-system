import { HttpMethod, IHttpClient } from '@/infra/http/http-client-contract';
import { IAppointment, IAppointmentFilters, IMSResponse } from '@/interfaces';
import { handleAPIErrors } from '@/utils/common';
import { delayPromise } from '@/utils/resolver';

export const listAllAppointmentsService = async (
  client: IHttpClient,
  params: IAppointmentFilters,
) => {
  const { name = '', page = 1, page_size = 10 } = params;

  try {
    const response = await client.sendRequest<
      IMSResponse<IAppointment[], 'list-all-appointments'>
    >(HttpMethod.GET, '/appointments', {
      params: {
        ...params,
        name,
        page,
        page_size,
      },
    });

    await delayPromise(2000);

    return response;
  } catch (error) {
    handleAPIErrors(error);
    return;
  }
};
