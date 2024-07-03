import { IUsersFilters } from '@/interfaces';
import { getAllUsersAPI, getFakerAllUsersAPI } from '@/services';

import { store } from '.';

const getAllUsers = async (params: IUsersFilters) => {
  try {
    store.update((s) => {
      s.allUsers.loadding = true;
      s.allUsers.loadingError = false;
    });

    // const data = await getAllUsersAPI(params).then((users) => users);
    const data = await getFakerAllUsersAPI(params).then((users) => users);

    store.update((s) => {
      s.allUsers.list = data;
      s.allUsers.loadding = false;
    });

    return data;
  } catch (error) {
    console.log(error);
    store.update((s) => (s.allUsers.loadingError = true));
  }
};

export { getAllUsers };
