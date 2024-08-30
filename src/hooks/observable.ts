import React from 'react';

import { useObservable } from 'observable-hooks';

import { getCurrentUser, logout } from '@/store/modules/auth/actions';
import { toastInfo, userRole$, userStatus$ } from '@/utils';

export const useUserRoleObservable = () => {
  useObservable(() => userRole$);

  React.useEffect(() => {
    const subscription = userRole$.subscribe(async (serverRole) => {
      const localUser = getCurrentUser();

      if (localUser?.role !== serverRole) {
        await logout();
        window.location.href = 'sign-in';
        toastInfo(
          'As suas permissões foram atualizadas. Por favor, faça login novamente.',
        );
      }
    });

    return () => subscription.unsubscribe();
  }, []);
};

export const useUserStatusObservable = () => {
  useObservable(() => userStatus$);

  React.useEffect(() => {
    const subscription = userStatus$.subscribe(async (serverStatus) => {
      if (serverStatus === 'inativo') {
        await logout();
        window.location.href = 'sign-in';
        toastInfo('Sua conta foi desativada. Por favor, contate o suporte.');
      }
    });

    return () => subscription.unsubscribe();
  }, []);
};
