import { AppointmentStatus } from '@/enums';
import { useQueryClient, useMutation } from '@tanstack/react-query';

type StatusResponse = {
  success: boolean;
  status: string;
};

interface UseUpdateAppointmentStatusProps {
  updateAppointmentStatus: (
    patientId: string,
    appointmentId: number,
    data: AppointmentStatus,
  ) => Promise<StatusResponse | undefined>;
  patientId: string;
  appointmentId: number;
}

export const useUpdateAppointmentStatus = ({
  updateAppointmentStatus,
  appointmentId,
  patientId,
}: UseUpdateAppointmentStatusProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync: updateAppointmentStatusMutation, isPending } =
    useMutation({
      mutationFn: async (status: AppointmentStatus) =>
        await updateAppointmentStatus(patientId, appointmentId, status),
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: ['appointments', appointmentId],
        }),
    });

  return {
    updateStatus: updateAppointmentStatusMutation,
    isPending,
  };
};
