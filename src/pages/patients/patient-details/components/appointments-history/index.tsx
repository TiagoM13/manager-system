import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

import { Plus } from '@phosphor-icons/react';

import { Button, Card } from '@/components';
import { useAppNavigation } from '@/hooks';
import { IAppointment } from '@/interfaces';

import { AppointmentInfoCard } from '../appointment-info-card';

interface AppointmentsHistoryProps {
  appointments?: IAppointment[];
  loading?: boolean;
}

export const AppointmentsHistory: React.FC<AppointmentsHistoryProps> = ({
  appointments,
}) => {
  const MAX_DISPLAY = 3;
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const { navigateTo } = useAppNavigation();
  const isNotHaveAppointments = appointments?.length === 0;

  const handleRedirectCreateAppointment = (id?: string) => {
    navigateTo({
      route: `/appointments/${!id ? 'new' : id}`,
      state: location.state,
    });
  };

  return (
    <Card title="Histórico de consultas" className="px-6 space-y-2 h-full">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          {!isNotHaveAppointments && (
            <span className="text-sm">
              total de consultas: {appointments?.length}
            </span>
          )}
        </div>

        <div className="flex flex-col items-center space-y-4">
          {isNotHaveAppointments ? (
            <div className="flex flex-col justify-center items-center space-y-2">
              <span className="text-sm">Nenhuma consulta encontrada</span>
            </div>
          ) : (
            <>
              {appointments
                ?.slice(0, MAX_DISPLAY)
                .map((appointment) => (
                  <AppointmentInfoCard
                    key={appointment.id}
                    appointment={appointment}
                  />
                ))}
            </>
          )}

          {appointments && appointments?.length > MAX_DISPLAY && (
            <Link
              to={`/appointments/${id}/list`}
              className="text-sm text-sky-600 font-medium hover:underline"
            >
              visualizar mais
            </Link>
          )}

          <Button
            label="adicionar consulta"
            icon={<Plus className="size-4" weight="bold" />}
            onClick={() => handleRedirectCreateAppointment(id)}
          />
        </div>
      </div>
    </Card>
  );
};
