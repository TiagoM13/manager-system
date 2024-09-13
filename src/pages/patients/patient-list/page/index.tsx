import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import { Card, Divider, Header } from '@/components';
import { useDebounce, useQuery, useWindowSize } from '@/hooks';
import { IPatientFilters } from '@/interfaces';
import { getAllPatientsService } from '@/services';
import { handleAPIErrors } from '@/utils/common';
import {
  useQuery as useQueryAllPatients,
  keepPreviousData,
} from '@tanstack/react-query';

import { PatientFilters, PatientsTable } from '../components';
import { filterSchema } from '../schemas';

const Patients: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useQuery<IPatientFilters>();
  const [, , isMobile] = useWindowSize();

  // Hook Form
  const methods = useForm({
    defaultValues: query,
    mode: 'onChange',
    resolver: filterSchema,
    shouldUnregister: false,
  });

  const debouncedQuery = useDebounce(query.search || '', 500);
  const { data, isLoading } = useQueryAllPatients({
    queryKey: ['patients', query.page, debouncedQuery],
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

  React.useEffect(() => {
    if (data?.patients && data?.meta?.total_current_records === 0) {
      setQuery({ page: 1 });
    }
  }, [data?.meta?.total_current_records, data?.patients, setQuery]);

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col">
        <Header
          title="Pacientes"
          labelAction="cadastrar paciente"
          newRegister={handleNewRegister}
        />

        <Divider />

        <Card>
          <PatientFilters />

          {isMobile ? (
            <div></div>
          ) : (
            <PatientsTable data={data} loading={loading} />
          )}
        </Card>
      </div>
    </FormProvider>
  );
};

export default Patients;
