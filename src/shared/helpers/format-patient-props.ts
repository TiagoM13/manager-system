import { IPatient, IPatientForm } from '@/shared/interfaces';

export const formatPatientProps = (patientForm: IPatientForm): IPatient => {
  const patient = patientForm;

  if (patient.cpf) patient.cpf = patient.cpf.replace(/\D/g, '');

  if (patient.phone) patient.phone = patient.phone.replace(/\D/g, '');

  if (patient.contact_emergency)
    patient.contact_emergency = patient.contact_emergency.replace(/\D/g, '');

  return patient;
};
