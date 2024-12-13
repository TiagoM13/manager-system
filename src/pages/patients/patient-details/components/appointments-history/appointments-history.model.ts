import { useLocation, useParams } from 'react-router-dom';

import { useAppNavigation } from '@/hooks';
import { IAppointment } from '@/interfaces';

export const useAppointmentsHistoryModel = ({
  appointments,
}: {
  appointments?: IAppointment[];
}) => {
  const MAX_DISPLAY = 3;
  const location = useLocation();
  const { patientId } = useParams<{ patientId: string }>();
  const { navigateTo } = useAppNavigation();
  const isNotHaveAppointments = appointments?.length === 0;
  const isHaveMinimalAppointments =
    appointments && appointments?.length > MAX_DISPLAY;

  const navigateToAppointmentForm = (patientId?: string) => {
    const route = patientId
      ? `/appointments/${patientId}`
      : '/appointments/new';

    navigateTo({
      route,
      state: location.state,
    });
  };

  return {
    patientId,
    MAX_DISPLAY,
    navigateToAppointmentForm,
    isNotHaveAppointments,
    isHaveMinimalAppointments,
    location,
  };
};
