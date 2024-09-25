import { Status } from '@/enums';

export interface IPatient {
  id?: string;
  name: string;
  birth_date: Date;
  sex: string;
  cpf?: string | null;
  cns?: string | null;
  address?: string | null;
  mother_name?: string | null;
  father_name?: string | null;
  material_status?: string | null;
  occupation?: string | null;
  email?: string | null;
  phone?: string | null;
  health_agent?: string | null;
  status: Status | null;
  contact_emergency?: string | null;
  name_contact_emergency?: string | null;
  height?: number | null;
  weight?: number | null;

  created_at?: Date;
  updated_at?: Date;
}

// eslint-disable-next-line prettier/prettier
export interface IPatientForm extends Omit<IPatient, 'status'> { }

export interface IPatientFilters {
  name?: string;
  page?: number;
  page_size?: number;
}
