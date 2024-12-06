import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { backWithQuery } from '@/utils';

interface NavigationOptions {
  route: string;
  state?: Record<string, unknown>;
}

export const useAppNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateTo = React.useCallback(
    ({ route, state = {} }: NavigationOptions) => {
      navigate(route, {
        state: { ...state, from: location },
      });
    },
    [location, navigate],
  );

  const goBack = React.useCallback(
    (fallbackRoute = '/') => {
      const from = location.state?.from || { pathname: fallbackRoute };
      backWithQuery(navigate, from, from.pathname);
    },
    [location.state?.from, navigate],
  );

  return {
    navigateTo,
    goBack,
  };
};
