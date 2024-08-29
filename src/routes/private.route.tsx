import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useCurrentUser, useIsAuthenticated } from '@/hooks';

type PrivateRouteProps = {
  children: JSX.Element;
  allowedRoles?: number[];
};

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const isAuthenticated = useIsAuthenticated();
  const user = useCurrentUser();
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/sign-in', {
        state: location.state,
        replace: true,
      });
    }

    if (isAuthenticated && !allowedRoles?.includes(user.role)) {
      navigate('/dashboard', {
        state: location.state,
      });
    }
  }, [
    allowedRoles,
    isAuthenticated,
    location.pathname,
    location.state,
    navigate,
    user.role,
  ]);

  return (
    <>
      {!isAuthenticated && null}
      {isAuthenticated && allowedRoles?.includes(user.role) && children}
    </>
  );
};
