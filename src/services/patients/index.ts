import { HttpMethod, IHttpClient } from '@/infra/http/http-client-contract';
import { IMSResponse, IPatient, IPatientFilters } from '@/interfaces';
import { handleAPIErrors } from '@/utils/common';

export const getAllPatientsService = async (
  client: IHttpClient,
  params: IPatientFilters,
) => {
  try {
    const { name = '', page = 1, page_size = 10 } = params;

    const response = await client.sendRequest<
      IMSResponse<IPatient[], 'patients'>
    >(HttpMethod.GET, '/patients', {
      params: {
        name,
        page,
        page_size,
      },
    });

    return response;
  } catch (error) {
    handleAPIErrors(error);
    return;
  }
};

export const getPatientService = async (client: IHttpClient, id: string) => {
  try {
    const response = await client.sendRequest<IMSResponse<IPatient, 'patient'>>(
      HttpMethod.GET,
      `/patients/${id}`,
    );

    return response.patient;
  } catch (error) {
    handleAPIErrors(error);
    return;
  }
};

export const createPatientService = async (
  client: IHttpClient,
  data: IPatient,
) => {
  try {
    return await client.sendRequest<IMSResponse<IPatient, 'patient'>>(
      HttpMethod.POST,
      '/patients',
      { data },
    );
  } catch (error) {
    handleAPIErrors(error);
    return;
  }
};

export const updatePatientService = async (
  client: IHttpClient,
  id: string,
  data: IPatient,
) => {
  try {
    return await client.sendRequest<IMSResponse<IPatient, 'patient'>>(
      HttpMethod.PUT,
      `/patients/${id}`,
      { data },
    );
  } catch (error) {
    handleAPIErrors(error);
    return;
  }
};
