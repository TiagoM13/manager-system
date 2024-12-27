import React from 'react';
import { useFormContext } from 'react-hook-form';

import { useQueryParams } from '@/hooks';
import { removeCpfMask } from '@/utils';

import { PatientSearchFormType } from './patient-search-form.schema';

export const usePatientSearchFormModel = () => {
  const [_, setQuery] = useQueryParams<PatientSearchFormType>();

  const handlePatientSearch = React.useCallback(
    (params: PatientSearchFormType) => {
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
  } = useFormContext<PatientSearchFormType>();

  const onSearch = handleSubmit(handlePatientSearch);

  return {
    onSearch,
    control,
    errors,
  };
};
