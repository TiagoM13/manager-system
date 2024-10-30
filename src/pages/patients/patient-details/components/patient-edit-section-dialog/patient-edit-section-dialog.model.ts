import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { formatPatientProps } from '@/helpers/format-patient-props';
import { formatPatientRequest } from '@/helpers/format-patient-request';
import { IMSResponse, IPatient } from '@/interfaces';
import {
  ERROR_UPDATING_PATIENT,
  PATIENT_UPDATED_SUCCESSFULLY,
} from '@/pages/patients/utils/messages';
import { usePatientFormDialog } from '@/store';
import { toastError, toastSuccess } from '@/utils';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import {
  SchemaPatientType,
  schemaPatient,
} from '../../../patient-form/patient-form.schema';

interface PatientEditSectionDialogModelProps {
  patient?: IPatient;
  updatePatient: (
    id: string,
    data: IPatient,
  ) => Promise<IMSResponse<IPatient, 'patient'> | undefined>;
}

export const usePatientEditSectionDialogModel = ({
  patient,
  updatePatient,
}: PatientEditSectionDialogModelProps) => {
  const { closeModal } = usePatientFormDialog();
  const { id } = useParams<{ id: string }>();
  // hook form
  const methods = useForm<SchemaPatientType>({
    mode: 'onChange',
    shouldUnregister: false,
    resolver: schemaPatient,
  });

  const { handleSubmit, reset } = methods;

  // mutation
  const queryClient = useQueryClient();
  const { mutateAsync: updatePatientMutation, isPending } = useMutation({
    mutationFn: async (values: IPatient) =>
      await updatePatient(String(id), values),
    onSuccess: (data) => {
      if (data?.success) {
        queryClient.invalidateQueries({ queryKey: ['patient'] });
        toastSuccess(PATIENT_UPDATED_SUCCESSFULLY);
        closeModal();
      }
    },
    onError: () => toastError(ERROR_UPDATING_PATIENT),
  });

  // callbacks
  const submit = React.useCallback(
    async (values: SchemaPatientType) => {
      await updatePatientMutation(formatPatientProps(values));
    },
    [updatePatientMutation],
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
