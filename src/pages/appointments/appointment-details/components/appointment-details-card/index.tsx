import React from 'react';

import { DownloadSimple, Printer } from '@phosphor-icons/react';

import { InfoItem } from '@/components';
import { Badge, Button, Card } from '@/components/_ui';
import { APPOINTMENT_TYPE_LABELS } from '@/constants/labels';
import { IAppointment } from '@/interfaces';
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

        <div className="mt-3 grid w-full grid-cols-2 gap-6">
          <InfoItem
            label="Tipo de Atendimento"
            value={APPOINTMENT_TYPE_LABELS[appointment?.appointment_type!]}
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

        <div className="mt-8 flex w-full items-end justify-end gap-2">
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
