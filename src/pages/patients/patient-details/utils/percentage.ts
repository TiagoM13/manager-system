import { IPatient } from '@/interfaces';

export const calculateCompletionPercentage = (patient: IPatient) => {
  const fieldsToCheck = [
    patient?.name,
    patient?.birth_date,
    patient?.sex,
    patient?.cpf,
    patient?.cns,
    patient?.address,
    patient?.mother_name,
    patient?.father_name,
    patient?.material_status,
    patient?.occupation,
    patient?.email,
    patient?.phone,
    patient?.contact_emergency,
    patient?.name_contact_emergency,
    patient?.health_agent,
    patient?.height,
    patient?.weight,
  ];

  const filledFields = fieldsToCheck.filter(
    (field) => field !== null && field !== undefined && field !== '',
  );

  const totalFields = fieldsToCheck.length;
  const filledCount = filledFields.length;

  return ((filledCount / totalFields) * 100).toFixed(0);
};
