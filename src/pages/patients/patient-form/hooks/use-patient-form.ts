import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { formatPatientProps } from '@/helpers/format-patient-props';
import { IPatient, IPatientForm } from '@/interfaces';
import { createPatientService } from '@/services';
import { toastSuccess } from '@/utils';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import { SchemaPatientType, schemaPatient } from '../schemas';

export const usePatientForm = () => {
  const navigate = useNavigate();
  const methods = useForm<SchemaPatientType>({
    mode: 'onChange',
    shouldUnregister: false,
    resolver: schemaPatient,
  });

  const { handleSubmit } = methods;

  // mutation
  const queryClient = useQueryClient();
  const { mutateAsync: createPatient, isPending: IsLoading } = useMutation({
    mutationFn: async (values: IPatient) => createPatientService(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
    },
  });

  const submit = React.useCallback(
    async (values: IPatientForm) => {
      if (values) {
        const response = await createPatient(formatPatientProps(values));

        if (response) {
          toastSuccess('Paciente adicionado com sucesso!');
          navigate('/patients');
        }
      }
    },
    [createPatient, navigate],
  );

  return {
    methods,
    IsLoading,
    handleSubmit,
    submit,
  };
};
