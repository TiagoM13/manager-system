import { IUsersFilters } from '@/interfaces';
import { getFakerAllUsersAPI } from '@/services';

import { store } from '.';

const getAllUsers = async (params: IUsersFilters) => {
  try {
    store.update((s) => {
      s.allUsers.loading = true;
      s.allUsers.loadingError = false;
    });

    const data = await getFakerAllUsersAPI(params).then((users) => users);

    setTimeout(() => {
      store.update((s) => {
        s.allUsers.list = data;
        s.allUsers.loading = false;
      });
    }, 3000);

    return data;
  } catch (error) {
    console.log(error);
    store.update((s) => {
      s.allUsers.loadingError = true;
      s.allUsers.loading = false;
    });
  }
};

export { getAllUsers };
