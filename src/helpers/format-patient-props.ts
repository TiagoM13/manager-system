import { Status } from '@/enums';
import { IPatientForm, IPatient } from '@/interfaces';

export const formatPatientProps = (patientForm: IPatientForm): IPatient => {
  const patient = { ...patientForm, status: Status.ACTIVE };

  if (patient.cpf) patient.cpf = patient.cpf.replace(/\D/g, '');

  if (patient.phone) patient.phone = patient.phone.replace(/\D/g, '');

  return patient;
};
