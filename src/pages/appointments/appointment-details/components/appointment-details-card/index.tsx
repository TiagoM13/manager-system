import React from 'react';

import { DownloadSimple, Printer } from '@phosphor-icons/react';

import { Badge, Button, Card } from '@/components';
import { IAppointment } from '@/interfaces';
import { InfoItem } from '@/pages/patients/patient-details/components';
import { formatAppointmentDate, toastSuccess } from '@/utils';

interface AppointmentDetailsCardProps {
  appointment: IAppointment | undefined;
  loading?: boolean;
}

export const AppointmentDetailsCard = ({
  appointment,
  loading,
}: AppointmentDetailsCardProps) => {
  return (
    <Card bordered>
      <div className="p-2">
        <h2 className="text-xl font-semibold">Informações do atendimento</h2>

        <div className="w-full grid grid-cols-2 gap-6 mt-3">
          <InfoItem
            label="Tipo de Atendimento"
            value={appointment?.appointment_type}
            loading={loading}
          />
          <InfoItem
            label="Médico"
            value={`${appointment?.doctor?.name} - CRM: ${appointment?.doctor?.crm}`}
            loading={loading}
          />
          <InfoItem
            label="Data da Consulta"
            value={formatAppointmentDate(appointment?.scheduled_date as Date)}
            loading={loading}
          />
          <InfoItem
            label="Status"
            value={<Badge type={appointment?.status} />}
            loading={loading}
          />
          <InfoItem
            label="Diagnostico"
            value={appointment?.diagnosis_summary}
            loading={loading}
          />
        </div>

        <div className="w-full flex justify-end items-end gap-2 mt-8">
          <Button
            label="imprimir"
            variable="secondary"
            icon={<Printer className="size-5" weight="bold" />}
            onClick={() => toastSuccess('Impressão feita com sucesso!')}
          />
          <Button
            label="salvar PDF"
            icon={<DownloadSimple className="size-5" weight="bold" />}
            onClick={() =>
              toastSuccess('Download do arquivo feito com sucesso!')
            }
          />
        </div>
      </div>
    </Card>
  );
};
