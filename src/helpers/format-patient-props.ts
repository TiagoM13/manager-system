import { IPatient } from '@/interfaces';

export const formatPatientProps = (patientForm: IPatient): IPatient => {
  const patient = { ...patientForm };

  if (patient.cpf) patient.cpf = patient.cpf.replace(/\D/g, '');

  if (patient.phone) patient.phone = patient.phone.replace(/\D/g, '');

  return patient;
};
