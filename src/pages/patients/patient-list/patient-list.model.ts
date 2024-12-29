import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import {
  useAppNavigation,
  useGetAllPatients,
  useQueryParams,
  useWindowSize,
} from '@/hooks';
import { IMSResponse, IPatient, IPatientFilters } from '@/interfaces';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  schemaFilterPatient,
  SchemaFilterPatientType,
} from './patient-list.schema';

type PatientListModelResponse = IMSResponse<IPatient[], 'patients'> | undefined;

interface PatientListModelProps {
  getAllPatients: (
    params: IPatientFilters,
  ) => Promise<PatientListModelResponse>;
}

export const usePatientListModel = ({
  getAllPatients,
}: PatientListModelProps) => {
  const location = useLocation();
  const [query] = useQueryParams<IPatientFilters>();
  const { navigateTo } = useAppNavigation();
  const [, , isMobile] = useWindowSize();

  const { allPatientsResponse, isLoading } = useGetAllPatients({
    getAllPatients,
    query,
  });

  const methods = useForm<SchemaFilterPatientType>({
    resolver: zodResolver(schemaFilterPatient),
    defaultValues: {
      name: query.name ?? '',
      cns: query.cns ?? '',
      cpf: query.cpf ?? '',
    },
  });

  const handleNewRegister = React.useCallback(() => {
    navigateTo({ route: '/patients/new', state: location.state });
  }, [location.state, navigateTo]);

  const handleEditPatient = React.useCallback(
    (patient: IPatient) => {
      navigateTo({ route: `/patients/${patient.id}`, state: location.state });
    },
    [location, navigateTo],
  );

  return {
    methods,
    isLoading,
    allPatientsResponse,
    handleNewRegister,
    handleEditPatient,
    isMobile,
  };
};
