import { AppointmentStatus, AppointmentType } from '@/enums';

export interface IAppointment {
  id: number;
  appointment_type: AppointmentType;
  examination?: string | null;
  diagnosis_summary?: string | null;
  scheduled_date: Date;
  created_at?: Date;
  updated_at?: Date;
  patient_id: string;
  status: AppointmentStatus;
}
