import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { useAppNavigation, useQuery } from '@/hooks';
import { IPatient, IPatientFilters } from '@/interfaces';
import { getAllPatientsService } from '@/services';
import { handleAPIErrors } from '@/utils/common';
import {
  keepPreviousData,
  useQuery as useQueryAllPatients,
} from '@tanstack/react-query';

import { SchemaFilterPatientType, schemaFilterPatient } from '../schemas';

export const usePatientList = () => {
  const location = useLocation();
  const [query] = useQuery<IPatientFilters>();
  const { navigateTo } = useAppNavigation();

  const methods = useForm<SchemaFilterPatientType>({
    defaultValues: {
      name: query.name,
      page: String(query.page),
    },
    mode: 'onChange',
    resolver: schemaFilterPatient,
    shouldUnregister: false,
  });

  const getAllPatients = React.useCallback(async () => {
    try {
      const patients = await getAllPatientsService(query);
      return patients;
    } catch (error) {
      handleAPIErrors(error);
      return;
    }
  }, [query]);

  const { data, isLoading } = useQueryAllPatients({
    queryKey: ['patients', query],
    queryFn: getAllPatients,
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
  };
};
