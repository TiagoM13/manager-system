import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import { Card } from '@/components';
import { useQuery, useWindowSize } from '@/hooks';
import { IPatient, IPatientFilters } from '@/interfaces';
import { getAllPatientsService } from '@/services';
import { handleAPIErrors } from '@/utils/common';
import {
  useQuery as useQueryAllPatients,
  keepPreviousData,
} from '@tanstack/react-query';

import { Header } from '../../patient-form/components/header';
import { PatientFilters, PatientsTable, PatientsCard } from '../components';
import { schemaFilterPatient, SchemaFilterPatientType } from '../schemas';

const Patients: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [query] = useQuery<IPatientFilters>();
  const [, , isMobile] = useWindowSize();

  const methods = useForm<SchemaFilterPatientType>({
    defaultValues: {
      name: query.name,
      page: String(query.page),
    },
    mode: 'onChange',
    resolver: schemaFilterPatient,
    shouldUnregister: false,
  });

  const { data, isLoading } = useQueryAllPatients({
    queryKey: ['patients', query],
    queryFn: async () => {
      try {
        const patients = getAllPatientsService(query);
        return patients;
      } catch (error) {
        handleAPIErrors(error);
        return;
      }
    },
    placeholderData: keepPreviousData,
  });

  const loading = React.useMemo(() => isLoading, [isLoading]);

  const handleNewRegister = React.useCallback(() => {
    navigate('/patients/new', {
      state: { from: location },
    });
  }, [location, navigate]);

  const handleEdit = React.useCallback(
    (patient: IPatient) => {
      navigate(`/patients/${patient.id}`, {
        state: { from: location },
      });
    },
    [location, navigate],
  );

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col">
        <Header
          title="Lista de Pacientes"
          labelRegister="adicionar paciente"
          onRegister={handleNewRegister}
        />

        <Card className="mt-4">
          <PatientFilters loading={loading} />

          {isMobile ? (
            <PatientsCard data={data} loading={loading} onEdit={handleEdit} />
          ) : (
            <PatientsTable data={data} loading={loading} />
          )}
        </Card>
      </div>
    </FormProvider>
  );
};

export default Patients;
