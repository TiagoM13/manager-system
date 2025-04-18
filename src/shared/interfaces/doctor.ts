import { Status } from '@/shared/enums';

export interface IDoctor {
  id?: string;
  name: string;
  sex: string;
  birth_date: Date;
  crm: string;
  phone?: string | null;
  email?: string | null;
  avatar_url?: string | null;
  specialty: string;
  appointment_id?: string | null;
  working_days: number[];
  status?: Status;

  created_at?: Date;
  updated_at?: Date;
}
