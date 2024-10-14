import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  CaretDoubleLeft,
  CaretLeft,
  CaretRight,
  CaretDoubleRight,
} from '@phosphor-icons/react';

import { useQueryParams } from '@/hooks';
import { IUsersFilters } from '@/interfaces';

import { IconButton } from '../icon-button';

type PaginateProps = {
  totalPages: number;
};

export const PaginationActions: React.FC<PaginateProps> = ({ totalPages }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [query] = useQueryParams<IUsersFilters>();
  const currentPage = React.useMemo(
    () => Number(query.page) || 1,
    [query.page],
  );

  const queryParams = new URLSearchParams(location.search);
  const updatePage = (newPage: number) => {
    queryParams.set('page', String(newPage));
    navigate(`${location.pathname}?${queryParams.toString()}`);
  };

  const goToNextPage = () => {
    updatePage(Math.min(currentPage + 1, totalPages));
  };

  const goToPreviousPage = () => {
    updatePage(Math.max(currentPage - 1, 1));
  };

  const goToFirstPage = () => {
    updatePage(1);
  };

  const goToLastPage = () => {
    updatePage(totalPages);
  };

  return (
    <div className="inline-flex items-center gap-8">
      <span className="text-sm">
        Página {currentPage} de {totalPages}
      </span>

      <div data-testid="btn-actions" className="flex gap-1.5">
        <IconButton onClick={goToFirstPage} disabled={currentPage === 1}>
          <CaretDoubleLeft className="size-4 text-slate-800" weight="bold" />
        </IconButton>
        <IconButton onClick={goToPreviousPage} disabled={currentPage === 1}>
          <CaretLeft className="size-4 text-slate-800" weight="bold" />
        </IconButton>
        <IconButton
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        >
          <CaretRight className="size-4 text-slate-800" weight="bold" />
        </IconButton>
        <IconButton
          onClick={goToLastPage}
          disabled={currentPage === totalPages}
        >
          <CaretDoubleRight className="size-4 text-slate-800" weight="bold" />
        </IconButton>
      </div>
    </div>
  );
};

type PaginationLabelProps = {
  currentPageData: number;
  totalItems: number;
  paginationLabel?: {
    single: string;
    several: string;
  };
};

export const PaginationLabel = ({
  currentPageData,
  totalItems,
  paginationLabel = {
    single: 'item',
    several: 'items',
  },
}: PaginationLabelProps) => {
  return (
    <span className="text-sm">
      {currentPageData === 0
        ? 'Não há resultados para exibir'
        : `Mostrando ${currentPageData} de ${totalItems} ${currentPageData === 1 ? paginationLabel.single : paginationLabel.several}`}
    </span>
  );
};

export const Pagination = {
  Actions: PaginationActions,
  Label: PaginationLabel,
};
