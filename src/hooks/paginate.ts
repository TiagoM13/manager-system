import React from 'react';

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
};

export const usePaginate = <T>({
  data,
  itemsPerPage,
}: PaginateProps<T>): PaginatedData<T> => {
  const [page, setPage] = React.useState(1);

  const totalItems = data.length;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = data.slice(startIndex, endIndex);

  const goToNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToFirstPage = () => {
    setPage(1);
  };

  const goToLastPage = () => {
    setPage(totalPages);
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
  };
};
