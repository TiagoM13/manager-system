import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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

  const parseQueryString = React.useCallback((search: string): T => {
    return search
      ? (Object.fromEntries(new URLSearchParams(search)) as T)
      : ({} as T);
  }, []);

  const stringifyQuery = React.useCallback((params: T): string => {
    return new URLSearchParams(params as any).toString();
  }, []);

  const [current, setCurrent] = React.useState<T>(
    (parseQueryString(location.search) || {}) as T,
  );

  const setQuery = React.useCallback(
    (query: SetQuery<T>) => {
      const currentParams = parseQueryString(location.search) || {};

      let updatedParams: T;

      if (typeof query === 'function') {
        updatedParams = (query as (prevState: T) => T)(currentParams);
      } else {
        updatedParams = { ...currentParams, ...query };
      }

      navigate({
        search: stringifyQuery(updatedParams),
      });
    },
    [location.search, navigate, parseQueryString, stringifyQuery],
  );

  React.useEffect(() => {
    const updatedParams = parseQueryString(location.search) || {};
    setCurrent(updatedParams as T);
  }, [location.search, parseQueryString]);

  return [current, setQuery];
};

export { useQuery };
