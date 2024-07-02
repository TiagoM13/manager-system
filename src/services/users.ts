import { users } from '@/data';
import { IUser } from '@/interfaces';

export const getAllUsersAPI = (): Promise<IUser[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = users;
      resolve(data);
    }, 1000);
  });
};
