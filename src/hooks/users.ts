import { store } from '@/store/modules/users';
import { getAllUsers, getUser } from '@/store/modules/users/actions';

const useAllUsers = () => {
  const { loading, loadingError, list } = store.useState((s) => s.allUsers);

  return { loading, loadingError, list, getAllUsers };
};

const useUser = () => {
  const { loading, loadingError, data } = store.useState((s) => s.user);

  return { loading, loadingError, data, getUser };
};

export { useAllUsers, useUser };
