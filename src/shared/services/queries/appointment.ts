import {
  IAppointment,
  IAppointmentFilters,
  IMSResponse,
} from '@/shared/interfaces';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { CacheKeys } from '../cache-keys';

type AllAppointmentsResponse =
  | IMSResponse<IAppointment[], 'get-all-appointments'>
  | undefined;

interface UseGetAllAppointmentsProps {
  getAllAppointments: (
    params: IAppointmentFilters,
  ) => Promise<AllAppointmentsResponse>;
  query: IAppointmentFilters;
}

export const useGetAllAppointments = ({
  getAllAppointments,
  query,
}: UseGetAllAppointmentsProps) => {
  const { data: allAppointmentsResponse, ...rest } = useQuery({
    queryKey: [CacheKeys.APPOINTMENTS, query],
    queryFn: () => getAllAppointments(query),
    placeholderData: keepPreviousData,
  });

  return { allAppointmentsResponse, ...rest };
};

type AppointmentsResponse =
  | IMSResponse<IAppointment[], 'appointments'>
  | undefined;

interface UseAppointmentsByPatientProps {
  getAppointmentsByPatient: (
    patientId: string,
    params: IAppointmentFilters,
  ) => Promise<AppointmentsResponse>;
  patientId: string;
  filters: IAppointmentFilters;
}

export const useAppointmentsByPatient = ({
  getAppointmentsByPatient,
  patientId,
  filters,
}: UseAppointmentsByPatientProps) => {
  const { data: appointmentsResponse, ...rest } = useQuery({
    queryKey: [CacheKeys.APPOINTMENTS_BY_PATIENT, patientId, filters],
    queryFn: () => getAppointmentsByPatient(String(patientId), filters),
    placeholderData: keepPreviousData,
  });

  return { appointmentsResponse, ...rest };
};

interface UseGetAppointmentProps {
  getAppointment: (
    patientId: string,
    appointmentId: string,
  ) => Promise<IAppointment | undefined>;
  patientId: string;
  appointmentId: string;
}

export const useGetAppointment = ({
  getAppointment,
  appointmentId,
  patientId,
}: UseGetAppointmentProps) => {
  const { data: appointmentResponse, ...rest } = useQuery({
    queryKey: [CacheKeys.APPOINTMENT, patientId, appointmentId],
    queryFn: () => getAppointment(patientId, appointmentId),
  });

  return { appointmentResponse, ...rest };
};
