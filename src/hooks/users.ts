import { store } from '@/store/modules/users';
import { getAllUsers } from '@/store/modules/users/actions';

const useAllUsers = () => {
  const { loadding, loadingError, list } = store.useState((s) => s.allUsers);

  return { loadding, loadingError, list, getAllUsers };
};

export { useAllUsers };
