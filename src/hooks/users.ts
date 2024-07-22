import { store } from '@/store/modules/users';
import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from '@/store/modules/users/actions';

const useAllUsers = () => {
  const { loading, loadingError, list } = store.useState((s) => s.allUsers);

  return {
    list,
    loading,
    loadingError,
    getAllUsers,
  };
};

const useUser = () => {
  const { loading, loadingError, data } = store.useState((s) => s.user);

  return {
    data,
    loading,
    loadingError,
    getUser,
    createUser,
    updateUser,
    deleteUser,
  };
};

export { useAllUsers, useUser };
