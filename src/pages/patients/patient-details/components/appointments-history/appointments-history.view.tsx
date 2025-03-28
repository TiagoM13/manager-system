import React from 'react';
import { Link } from 'react-router-dom';

import { CircleNotch, Plus } from '@phosphor-icons/react';

import { Button, Card } from '@/components/_ui';
import { IAppointment } from '@/shared/interfaces';

import { AppointmentInfoCard } from '../appointment-info-card';
import { useAppointmentsHistoryModel } from './appointments-history.model';

type AppointmentsHistoryViewProps = ReturnType<
  typeof useAppointmentsHistoryModel
> & {
  appointments?: IAppointment[];
  loading?: boolean;
};

export const AppointmentsHistoryView: React.FC<AppointmentsHistoryViewProps> = (
  props,
) => {
  const {
    patientId,
    location,
    isNotHaveAppointments,
    isHaveMinimalAppointments,
    navigateToAppointmentForm,
    MAX_DISPLAY,
    appointments,
    loading,
  } = props;

  return (
    <Card title="Histórico de consultas" className="h-full space-y-2 px-6">
      <div className="space-y-2">
        {loading ? (
          <div className="flex min-h-[100px] items-center justify-center">
            <CircleNotch
              weight="bold"
              className="size-8 animate-spin text-sky-600"
            />
          </div>
        ) : (
          <>
            {!isNotHaveAppointments && (
              <div className="flex items-center justify-between">
                <span className="text-sm">
                  total de consultas: {appointments?.length}
                </span>
              </div>
            )}
            <div className="flex flex-col items-center space-y-4">
              {isNotHaveAppointments ? (
                <div className="flex flex-col items-center justify-center space-y-2">
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

              {isHaveMinimalAppointments && (
                <Link
                  to={`/appointments/${patientId}/list`}
                  state={{ from: location }}
                  className="text-sm font-medium text-sky-600 hover:underline"
                >
                  visualizar mais
                </Link>
              )}

              <Button
                label="adicionar consulta"
                icon={<Plus className="size-4" weight="bold" />}
                onClick={() => navigateToAppointmentForm(patientId)}
              />
            </div>
          </>
        )}
      </div>
    </Card>
  );
};
