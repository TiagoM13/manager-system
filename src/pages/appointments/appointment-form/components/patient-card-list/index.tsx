import React from 'react';

import { CircleNotch } from '@phosphor-icons/react';

import { Card } from '@/components';
import { IPatient } from '@/interfaces';

import { NotFoundPatient } from '../not-found-patient';
import { PatientCard } from '../patient-card';

interface PatientCardListProps {
  patients: IPatient[] | undefined;
  loading?: boolean;
  onNavigateToNotFound: () => void;
}

export const PatientCardList: React.FC<PatientCardListProps> = ({
  patients,
  loading,
  onNavigateToNotFound,
}) => {
  return (
    <Card bordered>
      {loading ? (
        <div className="flex items-center justify-center min-h-[100px]">
          <CircleNotch
            weight="bold"
            className="text-sky-600 size-8 animate-spin"
          />
        </div>
      ) : (
        <div className="space-y-4 p-2">
          {patients && patients.length > 0 ? (
            <>
              <h2 className="text-xl font-semibold">Pacientes Encontrados</h2>
              {patients.map((patient) => (
                <PatientCard key={patient.id} patient={patient} />
              ))}
            </>
          ) : (
            <NotFoundPatient onNavigate={onNavigateToNotFound} />
          )}
        </div>
      )}
    </Card>
  );
};
