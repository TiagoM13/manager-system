import { Status } from '@/enums';

export interface IPatient {
  id?: number;
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
  status: Status;

  created_at?: Date;
  updated_at?: Date;
  // queries: IQuery[]
  // health_agent?: String
  // chronic_disease?: String
}

export interface IPatientFilters {
  name?: string;
  page?: number;
  page_size?: number;
}
