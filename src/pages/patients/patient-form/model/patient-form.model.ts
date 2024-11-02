import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { formatPatientProps } from '@/helpers/format-patient-props';
import { useAppNavigation } from '@/hooks';
import { IMSResponse, IPatient, IPatientForm } from '@/interfaces';
import {
  ERROR_CREATING_PATIENT,
  PATIENT_CREATED_SUCCESSFULLY,
} from '@/pages/patients/utils/messages';
import { toastError, toastSuccess } from '@/utils';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import { SchemaPatientType, schemaPatient } from '../patient-form.schema';

interface PatientFormModelProps {
  createPatient: (
    data: IPatient,
  ) => Promise<IMSResponse<IPatient, 'patient'> | undefined>;
}

export const usePatientFormModel = ({
  createPatient,
}: PatientFormModelProps) => {
  const navigate = useNavigate();
  const { goBack } = useAppNavigation();
  const queryClient = useQueryClient();

  const methods = useForm<SchemaPatientType>({
    mode: 'onChange',
    shouldUnregister: false,
    resolver: schemaPatient,
  });

  const { handleSubmit } = methods;

  // mutation
  const { mutateAsync: createPatientMutation, isPending: IsLoading } =
    useMutation({
      mutationFn: async (values: IPatient) => createPatient(values),
      onSuccess: (data) => {
        if (data?.success) {
          queryClient.invalidateQueries({ queryKey: ['patients'] });
          toastSuccess(PATIENT_CREATED_SUCCESSFULLY);
          navigate('/patients');
        }
      },
      onError: () => toastError(ERROR_CREATING_PATIENT),
    });

  const submit = React.useCallback(
    async (values: IPatientForm) => {
      if (values) {
        await createPatientMutation(formatPatientProps(values));
      }
    },
    [createPatientMutation],
  );

  return {
    methods,
    IsLoading,
    handleSubmit,
    submit,
    goBack,
  };
};
