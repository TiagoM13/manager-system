import React from 'react';
import { Link } from 'react-router-dom';

import { CircleNotch, Plus } from '@phosphor-icons/react';

import { Card, Button } from '@/components';
import { IAppointment } from '@/interfaces';

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
    <Card title="Histórico de consultas" className="px-6 space-y-2 h-full">
      <div className="space-y-2">
        {loading ? (
          <div className="flex items-center justify-center min-h-[100px]">
            <CircleNotch
              weight="bold"
              className="text-sky-600 size-8 animate-spin"
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

              {isHaveMinimalAppointments && (
                <Link
                  to={`/appointments/${patientId}/list`}
                  state={{ from: location }}
                  className="text-sm text-sky-600 font-medium hover:underline"
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
