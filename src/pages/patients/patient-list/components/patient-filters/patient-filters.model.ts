import React from 'react';
import { useFormContext } from 'react-hook-form';

import { useQueryParams } from '@/hooks';
import { removeCpfMask } from '@/utils';

import { SchemaFilterPatientType } from '../../patient-list.schema';

export const usePatientFiltersModel = () => {
  const [_, setQuery] = useQueryParams<SchemaFilterPatientType>();

  const handleFilterPatients = React.useCallback(
    (params: SchemaFilterPatientType) => {
      console.log('teste');
      if (params) {
        setQuery({
          ...params,
          cpf: removeCpfMask(String(params.cpf)),
          page: 1,
        });
      }
      return;
    },
    [setQuery],
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useFormContext<SchemaFilterPatientType>();

  const onSearch = handleSubmit(handleFilterPatients);

  return {
    onSearch,
    control,
    errors,
  };
};
