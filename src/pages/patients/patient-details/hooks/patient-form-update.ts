import React from 'react';
import { useForm } from 'react-hook-form';

import { formatPatientProps } from '@/helpers/format-patient-props';
import { formatPatientRequest } from '@/helpers/format-patient-request';
import { IPatient } from '@/interfaces';
import { updatePatientService } from '@/services';
import { usePatientFormDialog } from '@/store';
import { toastError, toastSuccess } from '@/utils';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import { SchemaPatientType, schemaPatient } from '../../patient-form/schemas';

export const usePatientFormUpdate = (patient: IPatient) => {
  const { closeModal } = usePatientFormDialog();
  // hook form
  const methods = useForm<SchemaPatientType>({
    mode: 'onChange',
    shouldUnregister: false,
    resolver: schemaPatient,
  });

  const { handleSubmit, reset } = methods;

  // mutation
  const queryClient = useQueryClient();
  const { mutateAsync: updatePatient, isPending } = useMutation({
    mutationFn: async (values: IPatient) =>
      await updatePatientService(String(values.id), values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patient'] });
    },
    onError: () => {
      toastError(
        'Ocorreu um erro ao tentar atualizar os dados do paciente, tente mais tarde!',
      );
    },
  });

  // callbacks
  const submit = React.useCallback(
    async (values: SchemaPatientType) => {
      if (values) {
        const response = await updatePatient(formatPatientProps(values));

        if (response) {
          closeModal();
          toastSuccess('Dados do paciente atualizado com sucesso!');
        }
      }
    },
    [closeModal, updatePatient],
  );

  // effects
  React.useEffect(() => {
    if (patient) {
      reset(formatPatientRequest(patient));
    }
  }, [patient, reset]);

  return {
    methods,
    reset,
    submit,
    handleSubmit,
    isPending,
  };
};
