import { store } from '@/store/modules/users';
import { getAllUsers } from '@/store/modules/users/actions';

const useAllUsers = () => {
  const { loadding, loadingError, users } = store.useState((s) => s);

  return { loadding, loadingError, users, getAllUsers };
};

export { useAllUsers };
