import { IMSResponse, IPatient, IPatientFilters } from '@/interfaces';

import { msHosp } from '../api';

export const getAllPatientsService = async (params: IPatientFilters) => {
  const { search = '', page = 1, page_size = 10 } = params;

  const { data } = await msHosp.get<IMSResponse<IPatient[], 'patients'>>(
    '/patients',
    {
      params: {
        search,
        page,
        page_size,
      },
    },
  );

  return data;
};
