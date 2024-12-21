import { AppointmentStatus, AppointmentType } from '@/enums';

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
  page?: number;
  page_size?: number;
  start_date?: Date;
  end_date?: Date;
  appointment_type?: string;
}

export interface IAppointmentFiltersWithoutName
  extends Omit<IAppointmentFilters, 'name'> {}
