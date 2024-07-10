import { users } from '@/data';
import { IUser, IUsersFilters } from '@/interfaces';

import { fetchdata } from '.';

export const getAllUsersAPI = ({ name }: IUsersFilters): Promise<IUser[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let data = users;

      if (name) {
        const formatedQuery = name.toLowerCase();
        data = data.filter((user) =>
          user.name.toLowerCase().includes(formatedQuery),
        );
      }

      resolve(data);
    }, 1000);
  });
};

export const getFakerAllUsersAPI = async ({
  name,
}: IUsersFilters): Promise<IUser[]> => {
  let users = await fetchdata('users');

  if (name) {
    const formatedQuery = name.toLowerCase();
    users = users.filter((user: IUser) =>
      user.name.toLowerCase().includes(formatedQuery),
    );
  }

  return users;
};
