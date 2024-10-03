import React from 'react';

import { Card } from '@/components';
import { IPatient } from '@/interfaces';
import { formatPhone, calculateAge, formatDate } from '@/utils';

import { EditButton, InfoItem } from '..';

interface PatientInfoSectionsProps {
  patient?: IPatient;
}

export const PatientInfoSections: React.FC<PatientInfoSectionsProps> = ({
  patient,
}) => {
  return (
    <>
      <div className="flex space-x-6">
        <Card
          title="Informações de contato"
          className="px-6 space-y-4 relative"
        >
          <div className="absolute right-4 top-0">
            <EditButton />
          </div>

          <InfoItem
            label="Telefone"
            value={patient?.phone ? formatPhone(patient?.phone) : '-'}
          />
          <InfoItem label="E-mail" value={patient?.email} />
          <InfoItem label="Endereço" value={patient?.address} />
          <InfoItem label="Contato de Emergência">
            {patient?.contact_emergency || patient?.name_contact_emergency ? (
              <div className="flex flex-col gap-1">
                <span className="text-sm">
                  {patient?.name_contact_emergency}
                </span>
                <span className="text-sm">
                  {patient?.contact_emergency &&
                    formatPhone(patient?.contact_emergency)}
                </span>
              </div>
            ) : (
              '-'
            )}
          </InfoItem>
        </Card>

        <Card title="Informações gerais" className="px-6 space-y-4 relative">
          <div className="absolute right-4 top-0">
            <EditButton />
          </div>

          <div className="flex">
            <div className="w-full space-y-4">
              <InfoItem label="Sexo" value={patient?.sex} />
              <InfoItem
                label="Idade"
                value={`${calculateAge(String(patient?.birth_date))} anos`}
              />
              <InfoItem
                label="Data de Nasc"
                value={formatDate(patient?.birth_date as Date)}
              />
            </div>

            <div className="w-full border-l border-slate-300 px-4 space-y-4">
              <InfoItem label="Profissão" value={patient?.occupation} />
              <InfoItem label="Estado Civil" value={patient?.material_status} />
              <InfoItem label="Nome da Mãe" value={patient?.mother_name} />
              <InfoItem label="Nome do Pai" value={patient?.father_name} />
            </div>
          </div>
        </Card>
      </div>

      <Card title="Informações médicas" className="px-6 space-y-4 relative">
        <div className="absolute right-4 top-0">
          <EditButton />
        </div>

        <div className="flex justify-between mr-10">
          <InfoItem
            label="Altura"
            value={patient?.height ? `${patient.height} cm` : '-'}
          />
          <InfoItem
            label="Peso"
            value={patient?.weight ? `${patient.weight} Kg` : '-'}
          />
          <InfoItem label="Agente de Saúde" value={patient?.health_agent} />
          {/* Implementar condições */}
          <InfoItem label="Condições" value="-" />
        </div>
      </Card>
    </>
  );
};
