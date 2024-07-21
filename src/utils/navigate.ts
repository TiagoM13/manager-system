import { NavigateFunction, Location } from 'react-router-dom';

export const backWithQuery = (
  navigate: NavigateFunction,
  location: Location,
  route: string,
) => {
  const search = location.search || '';
  navigate(`${route}${search}`);
};
