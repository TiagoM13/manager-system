import React from 'react';
import { useForm } from 'react-hook-form';

import { formatPatientProps } from '@/shared/helpers/format-patient-props';
import { formatPatientRequest } from '@/shared/helpers/format-patient-request';
import { IMSResponse, IPatient } from '@/shared/interfaces';
import { useUpdatePatient } from '@/shared/services/mutations';
import { usePatientFormDialog } from '@/store';
import { zodResolver } from '@hookform/resolvers/zod';

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

  const { updatePatientMutation, isPending } = useUpdatePatient({
    patientId: String(patient?.id),
    updatePatient,
  });

  const methods = useForm<SchemaPatientType>({
    mode: 'onChange',
    shouldUnregister: false,
    resolver: zodResolver(schemaPatient),
  });

  const { handleSubmit, reset } = methods;

  const handleUpdatePatient = React.useCallback(
    async (values: SchemaPatientType) => {
      const response = await updatePatientMutation(
        formatPatientProps(values as IPatient),
      );

      if (response?.success) closeModal();
    },
    [closeModal, updatePatientMutation],
  );

  React.useEffect(() => {
    if (patient) reset(formatPatientRequest(patient));
  }, [patient, reset]);

  return {
    methods,
    handleUpdatePatient,
    handleSubmit,
    isPending,
  };
};
