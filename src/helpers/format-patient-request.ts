import { Status } from '@/enums';
import { IPatient, IPatientForm } from '@/interfaces';
import { formatCPF, formatDateToISODate, formatPhone } from '@/utils';

export const formatPatientRequest = (patientForm: IPatientForm): IPatient => {
  const patient = { ...patientForm, status: Status.ACTIVE };

  if (patient.birth_date)
    patient.birth_date = formatDateToISODate(patient.birth_date) as any;

  if (patient.cpf) patient.cpf = formatCPF(patient.cpf);

  if (patient.phone) patient.phone = formatPhone(patient.phone);

  if (patient.contact_emergency)
    patient.contact_emergency = formatPhone(patient.contact_emergency);

  return patient;
};
