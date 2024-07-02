import { getAllUsersAPI } from '@/services/users';

import { store } from '.';

const getAllUsers = async (query?: { name: string; page: number }) => {
  try {
    store.update((s) => {
      s.loadding = true;
      s.loadingError = false;
    });

    const data = await getAllUsersAPI().then((users) => users);

    store.update((s) => {
      s.users = data;
      s.loadding = false;
    });

    return data;
  } catch (error) {
    console.log(error);
    store.update((s) => (s.loadingError = true));
  }
};

export { getAllUsers };
