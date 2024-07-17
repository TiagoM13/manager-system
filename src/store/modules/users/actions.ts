import { IUser, IUsersFilters } from '@/interfaces';
import {
  createUserService,
  deleteUserService,
  getAllUsersAPI,
  getUserAPI,
  updateUserService,
} from '@/services';

import { store } from '.';

export const getAllUsers = async (params: IUsersFilters) => {
  try {
    store.update((s) => {
      s.allUsers.list = [];
      s.allUsers.loading = true;
      s.allUsers.loadingError = false;
    });

    const data = await getAllUsersAPI(params).then((users) => users);

    setTimeout(() => {
      store.update((s) => {
        s.allUsers.list = data;
        s.allUsers.loading = false;
      });
    }, 3000);

    return data;
  } catch (error) {
    store.update((s) => {
      s.allUsers.loadingError = true;
    });
  }
};

export const getUser = async (id: number) => {
  try {
    store.update((s) => {
      s.user.data = undefined;
      s.user.loading = true;
      s.user.loadingError = false;
    });

    const { data } = await getUserAPI(id);

    setTimeout(() => {
      store.update((s) => {
        s.user.data = data;
        s.user.loading = false;
      });
    }, 3000);

    return data;
  } catch (error) {
    store.update((s) => {
      s.user.loadingError = true;
    });
  }
};

export const createUser = async (values: IUser) => {
  try {
    store.update((s) => {
      s.user.data = undefined;
      s.user.loading = true;
      s.user.loadingError = false;
    });

    const { data } = await createUserService(values);

    store.update((s) => {
      s.allUsers.list.push(data);
      s.allUsers.loading = false;
    });

    return data;
  } catch (error) {
    store.update((s) => {
      s.user.loadingError = true;
    });
  }
};

export const updateUser = async (id: number, values: IUser) => {
  try {
    store.update((s) => {
      s.user.data = undefined;
      s.user.loading = true;
      s.user.loadingError = false;
    });

    const { data } = await updateUserService(id, values);

    store.update((s) => {
      const index = s.allUsers.list.findIndex((item) => item.id === id);
      s.allUsers.list[index] = data;
      s.user.loading = false;
    });

    return data;
  } catch (error) {
    store.update((s) => {
      s.user.loadingError = true;
    });
  }
};

export const deleteUser = async (id: number) => {
  try {
    store.update((s) => {
      s.user.data = undefined;
      s.user.loading = true;
      s.user.loadingError = false;
    });

    await deleteUserService(id);

    store.update((s) => {
      const index = s.allUsers.list.findIndex((item) => item.id === id);
      if (index >= 0) s.allUsers.list.splice(index, 1);

      s.user.loading = false;
    });

    return id;
  } catch (error) {
    store.update((s) => {
      s.user.loadingError = true;
    });
  }
};
