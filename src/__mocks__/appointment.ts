import { AppointmentStatus, AppointmentType } from '@/shared/enums';
import { IAppointment } from '@/shared/interfaces';
import { sortEnum } from '@/shared/utils';
import { faker } from '@faker-js/faker';

import { doctor } from './doctor';
import { patient } from './patient';

export const appointment: IAppointment = {
  id: faker.number.int(),
  scheduled_date: faker.date.recent(),
  appointment_type: sortEnum(AppointmentType),
  status: sortEnum(AppointmentStatus),
  patient_id: faker.string.uuid(),
  patient: patient,
  doctor: doctor,
  doctor_id: faker.number.int(),
  diagnosis_summary: faker.lorem.paragraph(),
  created_at: faker.date.recent(),
  updated_at: faker.date.recent(),
};

export const appointments: IAppointment[] = Array.from({ length: 10 }, () => ({
  id: faker.number.int(),
  scheduled_date: faker.date.recent(),
  appointment_type: sortEnum(AppointmentType),
  status: sortEnum(AppointmentStatus),
  patient_id: faker.string.uuid(),
  patient: { ...patient, id: faker.string.uuid() },
  doctor: { ...doctor, id: faker.number.int() },
  doctor_id: faker.number.int(),
  diagnosis_summary: faker.lorem.paragraph(),
  created_at: faker.date.recent(),
  updated_at: faker.date.recent(),
}));
