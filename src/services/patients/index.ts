import { IMSResponse, IPatient, IPatientFilters } from '@/interfaces';
import { handleAPIErrors } from '@/utils/common';

import { msHosp } from '../api';

export const getAllPatientsService = async (params: IPatientFilters) => {
  const { name = '', page = 1, page_size = 10 } = params;

  const { data } = await msHosp.get<IMSResponse<IPatient[], 'patients'>>(
    '/patients',
    {
      params: {
        name,
        page,
        page_size,
      },
    },
  );

  return data;
};

export const getPatientService = async (id: string) => {
  const { data } = await msHosp.get<IMSResponse<IPatient, 'patient'>>(
    `/patients/${id}`,
  );
  return data.patient;
};

export const createPatientService = async (values: IPatient) => {
  try {
    return await msHosp.post<IMSResponse<IPatient, 'patient'>>(
      '/patients',
      values,
    );
  } catch (error) {
    handleAPIErrors(error);
    return;
  }
};

export const updatePatientService = async (id: string, values: IPatient) => {
  try {
    return await msHosp.post<IMSResponse<IPatient, 'patient'>>(
      `/patients/${id}`,
      values,
    );
  } catch (error) {
    handleAPIErrors(error);
    return;
  }
};
