import { Status, UserTypes } from '../enums';

export interface IUser {
  id: number;
  name: string;
  email: string;
  image_url?: string | null;
  user_type: UserTypes;
  status: Status;
  created_at: Date;
  updated_at?: Date;
  last_access?: Date;
}

export interface IUsersFilters {
  name?: string;
  page?: number;
  page_size?: number;
}
