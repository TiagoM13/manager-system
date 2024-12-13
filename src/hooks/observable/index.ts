import React from 'react';

import { useObservable } from 'observable-hooks';

import { getCurrentUser, logout } from '@/store/modules/auth/actions';
import { userRole$, userStatus$ } from '@/utils';

import { useNotification } from '../notification';

export const useUserRoleObservable = () => {
  useObservable(() => userRole$);
  const notify = useNotification();

  React.useEffect(() => {
    const subscription = userRole$.subscribe(async (serverRole) => {
      const localUser = getCurrentUser();

      if (localUser && localUser?.role !== serverRole) {
        const response = await logout();
        if (response) {
          notify.info(
            'As suas permissões foram atualizadas. Por favor, faça login novamente.',
          );
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [notify]);
};

export const useUserStatusObservable = () => {
  useObservable(() => userStatus$);
  const notify = useNotification();

  React.useEffect(() => {
    const subscription = userStatus$.subscribe(async (serverStatus) => {
      const localUser = getCurrentUser();

      if (localUser && serverStatus === 'inativo') {
        const response = await logout();
        if (response) {
          notify.info(
            'Sua conta foi desativada. Por favor, contate o suporte.',
          );
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [notify]);
};
