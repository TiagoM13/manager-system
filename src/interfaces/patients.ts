import { Status } from '@/enums';
import { MaritalStatus } from '@/enums/marital-status';
import { Sex } from '@/enums/sex';

import { IAppointment } from './appointment';

export interface IPatient {
  id?: string;
  name: string;
  birth_date: Date;
  sex: Sex;
  cpf?: string | null;
  cns?: string | null;
  address?: string | null;
  mother_name?: string | null;
  father_name?: string | null;
  marital_status?: MaritalStatus | null;
  occupation?: string | null;
  email?: string | null;
  phone?: string | null;
  health_agent?: string | null;
  status?: Status;
  contact_emergency?: string | null;
  name_contact_emergency?: string | null;
  height?: number | null;
  weight?: number | null;
  appointments?: IAppointment[];

  created_at?: Date;
  updated_at?: Date;
}

export interface IPatientForm extends Omit<IPatient, 'status'> {}

export interface IPatientFilters {
  name?: string | undefined;
  cpf?: string | null | undefined;
  cns?: string | null | undefined;
  page?: number;
  page_size?: number;
}

export type PatientSearchType = {
  name?: string | undefined;
  cpf?: string | null | undefined;
  cns?: string | null | undefined;
};
