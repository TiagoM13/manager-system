import { IAppointment } from '@/interfaces';
import { useQuery } from '@tanstack/react-query';

interface UseGetAppointmentProps {
  getAppointment: (
    patientId: string,
    appointmentId: number,
  ) => Promise<IAppointment | undefined>;
  patientId: string;
  appointmentId: number;
}

export const useGetAppointment = ({
  getAppointment,
  appointmentId,
  patientId,
}: UseGetAppointmentProps) => {
  const {
    data: appointmentResponse,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['appointment'],
    queryFn: async () => await getAppointment(patientId, appointmentId),
  });

  return {
    appointmentResponse,
    isLoading,
    isFetching,
  };
};
