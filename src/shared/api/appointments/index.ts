import { HttpMethod, IHttpClient } from '@/infra/http/http-client-contract';
import { AppointmentStatus } from '@/shared/enums';
import {
  IAppointment,
  IAppointmentFilters,
  IAppointmentFiltersWithoutName,
  IMSResponse,
} from '@/shared/interfaces';
import { delayPromise, handleAPIErrors } from '@/shared/utils';

export const getAllAppointmentsService = async (
  client: IHttpClient,
  params: IAppointmentFilters,
) => {
  const { name = '', page = 1, page_size = 10 } = params;

  try {
    const response = await client.sendRequest<
      IMSResponse<IAppointment[], 'get-all-appointments'>
    >(HttpMethod.GET, '/appointments', {
      params: {
        ...params,
        name,
        page,
        page_size,
      },
    });

    // TO-DO
    await delayPromise(2000);

    return response;
  } catch (error) {
    handleAPIErrors(error);
    return;
  }
};

export const getAppointmentsByPatientService = async (
  client: IHttpClient,
  patientId: string,
  params: IAppointmentFiltersWithoutName,
) => {
  const { page = 1, page_size = 10 } = params;

  try {
    const response = await client.sendRequest<
      IMSResponse<IAppointment[], 'appointments'>
    >(HttpMethod.GET, `/appointments/${patientId}/list`, {
      params: {
        ...params,
        page,
        page_size,
      },
    });

    // TO-DO
    await delayPromise(2000);

    return response;
  } catch (error) {
    handleAPIErrors(error);
    return;
  }
};

export const getAppointmentService = async (
  client: IHttpClient,
  patientId: string,
  appointmentId: number,
) => {
  try {
    const response = await client.sendRequest<
      IMSResponse<IAppointment, 'appointment'>
    >(
      HttpMethod.GET,
      `/appointments/${patientId}/appointment/${appointmentId}`,
    );

    // TO-DO
    await delayPromise(2000);

    return response.appointment;
  } catch (error) {
    handleAPIErrors(error);
    return;
  }
};

export const createAppointmentService = async (
  client: IHttpClient,
  patientId: string,
  data: IAppointment,
) => {
  try {
    const response = await client.sendRequest<
      IMSResponse<IAppointment, 'appointment'>
    >(HttpMethod.POST, `/appointments/${patientId}`, {
      data,
    });

    // TO-DO
    await delayPromise(2000);

    return response;
  } catch (error) {
    handleAPIErrors(error);
    return;
  }
};

export const updateAppointmentService = async (
  client: IHttpClient,
  patientId: string,
  appointmentId: number,
  data: IAppointment,
) => {
  try {
    const response = await client.sendRequest<
      IMSResponse<IAppointment, 'appointment'>
    >(
      HttpMethod.PUT,
      `/appointments/${patientId}/appointment/${appointmentId}`,
      {
        data,
      },
    );

    // TO-DO
    await delayPromise(2000);

    return response;
  } catch (error) {
    handleAPIErrors(error);
    return;
  }
};

export const updateAppointmentStatusService = async (
  client: IHttpClient,
  patientId: string,
  appointmentId: number,
  status: AppointmentStatus,
) => {
  try {
    const response = await client.sendRequest<
      Promise<{
        success: boolean;
        status: string;
      }>
    >(
      HttpMethod.PATCH,
      `/appointments/${patientId}/appointment/${appointmentId}/status`,
      {
        data: { status },
      },
    );

    // TO-DO
    await delayPromise(2000);

    return response;
  } catch (error) {
    handleAPIErrors(error);
    return;
  }
};
