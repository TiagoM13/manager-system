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
  health_agent?: string;
  status: Status;

  created_at?: Date;
  updated_at?: Date;
  // queries: IQuery[]
}

export interface IPatientFilters {
  search?: string;
  page?: number;
  page_size?: number;
}
