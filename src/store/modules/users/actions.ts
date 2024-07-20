import { IUser, IUsersFilters } from '@/interfaces';
import {
  createUserService,
  deleteUserService,
  getAllUsersService,
  getUserService,
  updateUserService,
} from '@/services';
import { toastError } from '@/utils/toasts';

import { store } from '.';

export const getAllUsers = async (params: IUsersFilters) => {
  try {
    store.update((s) => {
      s.allUsers.list = [];
      s.allUsers.loading = true;
      s.allUsers.loadingError = false;
    });

    const data = await getAllUsersService(params);

    setTimeout(() => {
      store.update((s) => {
        s.allUsers.list = data;
        s.allUsers.loading = false;
      });
    }, 1000);

    return data;
  } catch (error) {
    store.update((s) => {
      s.allUsers.loadingError = true;
      s.allUsers.loading = false;

      toastError('Falha ao carregar a lista de usuários!');
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

    const { data } = await getUserService(id);

    setTimeout(() => {
      store.update((s) => {
        s.user.data = data;
        s.user.loading = false;
      });
    }, 1000);

    return data;
  } catch (error) {
    store.update((s) => {
      s.user.loadingError = true;
      s.user.loading = false;

      toastError('Falha ao tentar obter informações do usuário!');
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
      s.user.loading = false;

      toastError('Falha ao tentar criar usuário!');
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
      s.user.loading = false;

      toastError('Falha ao tentar atualizar usuário!');
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
      s.user.loading = false;

      toastError('Falha ao tentar deletar usuário!');
    });
  }
};
