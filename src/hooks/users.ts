import { store } from '@/store/modules/users';
import { getAllUsers } from '@/store/modules/users/actions';

const useAllUsers = () => {
  const { loading, loadingError, list } = store.useState((s) => s.allUsers);

  return { loading, loadingError, list, getAllUsers };
};

export { useAllUsers };
