import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { useAppNavigation, useQueryParams, useWindowSize } from '@/hooks';
import { IMSResponse, IPatient, IPatientFilters } from '@/interfaces';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import {
  SchemaFilterPatientType,
  schemaFilterPatient,
} from '../patient-list.schema';

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

  const methods = useForm<SchemaFilterPatientType>({
    defaultValues: {
      name: query.name,
      page: String(query.page),
    },
    mode: 'onChange',
    resolver: schemaFilterPatient,
    shouldUnregister: false,
  });

  const { data, isLoading } = useQuery({
    queryKey: ['patients', query],
    queryFn: async () => await getAllPatients(query),
    placeholderData: keepPreviousData,
  });

  const loading = React.useMemo(() => isLoading, [isLoading]);

  const handleNewRegister = React.useCallback(() => {
    navigateTo({ route: '/patients/new', state: location.state });
  }, [location.state, navigateTo]);

  const handleEdit = React.useCallback(
    (patient: IPatient) => {
      navigateTo({ route: `/patients/${patient.id}`, state: location.state });
    },
    [location, navigateTo],
  );

  return {
    methods,
    loading,
    data,
    handleNewRegister,
    handleEdit,
    isMobile,
  };
};
