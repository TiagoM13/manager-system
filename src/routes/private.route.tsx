import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useIsAuthenticated } from '@/hooks';

export const PrivateRoute: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const isAuthenticated = useIsAuthenticated();
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/sign-in', {
        state: location.state,
        replace: true,
      });
    }
  }, [isAuthenticated, location.pathname, location.state, navigate]);

  return (
    <>
      {!isAuthenticated && null}
      {isAuthenticated && children}
    </>
  );
};
