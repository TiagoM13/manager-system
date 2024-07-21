import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type PaginateProps<T> = {
  data: T[];
  itemsPerPage: number;
};

type PaginatedData<T> = {
  page: number;
  totalItems: number;
  totalPages: number;
  currentPageData: T[];
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;
  setPage: (newPage: number) => void;
};

export const usePaginate = <T>({
  data,
  itemsPerPage,
}: PaginateProps<T>): PaginatedData<T> => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const initialPage = Number(queryParams.get('page')) || 1;

  const [page, setPage] = React.useState(initialPage);

  const totalItems = data.length;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = data.slice(startIndex, endIndex);

  const updatePage = (newPage: number) => {
    queryParams.set('page', String(newPage));
    navigate(`${location.pathname}?${queryParams.toString()}`, {
      replace: true,
    });
    setPage(newPage);
  };

  const goToNextPage = () => {
    updatePage(Math.min(page + 1, totalPages));
  };

  const goToPreviousPage = () => {
    updatePage(Math.max(page - 1, 1));
  };

  const goToFirstPage = () => {
    updatePage(1);
  };

  const goToLastPage = () => {
    updatePage(totalPages);
  };

  return {
    page,
    totalPages,
    totalItems,
    currentPageData,
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
    goToLastPage,
    setPage: updatePage,
  };
};
