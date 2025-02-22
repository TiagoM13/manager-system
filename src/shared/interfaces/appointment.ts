import { AppointmentStatus, AppointmentType } from '@/shared/enums';

import { IDoctor } from './doctor';
import { IPatient } from './patients';

export interface IAppointment {
  id?: number;
  appointment_type: AppointmentType;
  examination?: string | null;
  diagnosis_summary?: string | null;
  scheduled_date: Date;
  created_at?: Date;
  updated_at?: Date;
  patient_id?: string;
  patient?: IPatient;
  doctor_id: number;
  doctor?: IDoctor;
  status?: AppointmentStatus;
}

export interface IAppointmentFilters {
  name?: string;
  scheduled_date?: Date;
  appointment_type?: AppointmentType | string;
  status?: AppointmentStatus | string;
  page?: number;
  page_size?: number;
}

export interface IAppointmentFiltersWithoutName
  extends Omit<IAppointmentFilters, 'name'> { }
