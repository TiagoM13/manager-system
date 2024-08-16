import { IUser } from './users';

export interface IAuthData {
  user?: IUser;
  token?: string;
}

export interface ISignInData {
  email: string;
  password: string;
}

export interface IRecoverPasswordData {
  email: string;
}

export interface IChangePasswordData {
  password: string;
  password_confirmation: string;
  token: string;
}
