import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import queryString from 'query-string';

interface Query {
  [key: string]: string;
}

type SetQuery<T> = T | ((prevState: T) => T);

type IUseQuery = <T extends Record<string, any> = Query>() => [
  T,
  (query: SetQuery<T>) => void,
];

const useQuery: IUseQuery = <T extends Record<string, any> = Query>() => {
  const location = useLocation();
  const navigate = useNavigate();

  const [current, setCurrent] = React.useState<T>(
    (queryString.parse(location.search) || {}) as T,
  );

  const setQuery = React.useCallback(
    (query: SetQuery<T>) => {
      const currentParams = queryString.parse(location.search) || {};

      let updatedParams: T;

      if (typeof query === 'function') {
        updatedParams = (query as (prevState: T) => T)(currentParams as T);
      } else {
        updatedParams = { ...currentParams, ...query };
      }

      navigate({
        search: queryString.stringify(updatedParams),
      });
    },
    [navigate, location.search],
  );

  React.useEffect(() => {
    const updatedParams = queryString.parse(location.search) || {};
    setCurrent(updatedParams as T);
  }, [location.search]);

  return [current, setQuery];
};

export { useQuery };
