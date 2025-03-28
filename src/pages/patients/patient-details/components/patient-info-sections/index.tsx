import React from 'react';

import { InfoItem } from '@/components';
import { Card } from '@/components/_ui';
import { MARITAL_STATUS_LABELS, SEX_LABELS } from '@/shared/constants/labels';
import { IPatient, ModalSection } from '@/shared/interfaces';
import { calculateAge, formatDate, formatPhone } from '@/shared/utils';

import { EditButton } from '..';

interface PatientInfoSectionsProps {
  patient?: IPatient;
  loading?: boolean;
  onEdit: (section: ModalSection) => void;
}

export const PatientInfoSections: React.FC<PatientInfoSectionsProps> = ({
  patient,
  loading,
  onEdit,
}) => {
  return (
    <>
      <div className="flex space-x-6">
        <Card
          title="Informações de contato"
          className="relative space-y-4 px-6"
        >
          {!loading && (
            <div className="absolute right-4 top-0">
              <EditButton onClick={() => onEdit('contact-info')} />
            </div>
          )}

          <InfoItem
            label="Telefone"
            value={patient?.phone && formatPhone(patient?.phone)}
            loading={loading}
          />
          <InfoItem label="E-mail" value={patient?.email} loading={loading} />
          <InfoItem
            label="Endereço"
            value={patient?.address}
            loading={loading}
          />
          <InfoItem
            label="Contato de Emergência"
            value={
              (patient?.contact_emergency ||
                patient?.name_contact_emergency) && (
                <div className="flex flex-col gap-1">
                  <span className="text-sm">
                    {patient?.name_contact_emergency}
                  </span>
                  <span className="text-sm">
                    {patient?.contact_emergency &&
                      formatPhone(patient?.contact_emergency)}
                  </span>
                </div>
              )
            }
            loading={loading}
          />
        </Card>

        <Card title="Informações gerais" className="relative space-y-4 px-6">
          {!loading && (
            <div className="absolute right-4 top-0">
              <EditButton onClick={() => onEdit('general-info')} />
            </div>
          )}

          <div className="flex">
            <div className="w-full space-y-4">
              <InfoItem
                label="Sexo"
                value={patient?.sex && SEX_LABELS[patient?.sex]}
                loading={loading}
              />
              <InfoItem
                label="Idade"
                value={`${calculateAge(String(patient?.birth_date))} anos`}
                loading={loading}
              />
              <InfoItem
                label="Data de Nasc"
                value={formatDate(patient?.birth_date as Date)}
                loading={loading}
              />
            </div>

            <div className="w-full space-y-4 border-l border-slate-300 px-4">
              <InfoItem
                label="Profissão"
                value={patient?.occupation}
                loading={loading}
              />
              <InfoItem
                label="Estado Civil"
                value={
                  patient?.marital_status &&
                  MARITAL_STATUS_LABELS[patient.marital_status]
                }
                loading={loading}
              />
              <InfoItem
                label="Nome da Mãe"
                value={patient?.mother_name}
                loading={loading}
              />
              <InfoItem
                label="Nome do Pai"
                value={patient?.father_name}
                loading={loading}
              />
            </div>
          </div>
        </Card>
      </div>

      <Card title="Informações médicas" className="relative space-y-4 px-6">
        {!loading && (
          <div className="absolute right-4 top-0">
            <EditButton onClick={() => onEdit('medical-info')} />
          </div>
        )}

        <div className="mr-10 flex justify-between">
          <InfoItem
            label="Altura"
            value={patient?.height ? `${patient.height} cm` : '-'}
            loading={loading}
          />
          <InfoItem
            label="Peso"
            value={patient?.weight ? `${patient.weight} Kg` : '-'}
            loading={loading}
          />
          <InfoItem
            label="Agente de Saúde"
            value={patient?.health_agent}
            loading={loading}
          />
          {/* Implementar condições */}
          <InfoItem label="Condições" loading={loading} />
        </div>
      </Card>
    </>
  );
};
