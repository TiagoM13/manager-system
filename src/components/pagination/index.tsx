import React from 'react';

import {
  CaretDoubleLeft,
  CaretLeft,
  CaretRight,
  CaretDoubleRight,
} from '@phosphor-icons/react';

import { IconButton } from '../icon-button';

type PaginationActionsProps = {
  page: number;
  totalPages: number;
  goToFirstPage: () => void;
  goToPreviousPage: () => void;
  goToNextPage: () => void;
  goToLastPage: () => void;
};

export const PaginationActions: React.FC<PaginationActionsProps> = ({
  page,
  totalPages,
  goToFirstPage,
  goToLastPage,
  goToNextPage,
  goToPreviousPage,
}) => {
  return (
    <div className="inline-flex items-center gap-8">
      <span>
        Página {page} de {totalPages}
      </span>

      <div className="flex gap-1.5">
        <IconButton onClick={goToFirstPage} disabled={page === 1}>
          <CaretDoubleLeft className="size-4 text-slate-800" weight="bold" />
        </IconButton>
        <IconButton onClick={goToPreviousPage} disabled={page === 1}>
          <CaretLeft className="size-4 text-slate-800" weight="bold" />
        </IconButton>
        <IconButton onClick={goToNextPage} disabled={page === totalPages}>
          <CaretRight className="size-4 text-slate-800" weight="bold" />
        </IconButton>
        <IconButton onClick={goToLastPage} disabled={page === totalPages}>
          <CaretDoubleRight className="size-4 text-slate-800" weight="bold" />
        </IconButton>
      </div>
    </div>
  );
};

type PaginationLabelProps = {
  currentPageData: any[];
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
    <>
      {currentPageData.length === 0
        ? 'Não há resultados para exibir'
        : `Mostrando ${currentPageData.length} de ${totalItems} ${currentPageData.length === 1 ? paginationLabel.single : paginationLabel.several}`}
    </>
  );
};

export const Pagination = {
  Actions: PaginationActions,
  Label: PaginationLabel,
};
