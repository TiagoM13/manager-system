import React from 'react';

import { CardLoadingSkeleton, Pagination } from '@/components';
import { usePaginate } from '@/hooks';
import { IUser } from '@/interfaces';

import { UserCard } from '../user-item';

import { Container } from './styles';

type UsersCardProps = {
  users: IUser[] | undefined;
  loading?: boolean;
  onEdit: (data: IUser) => void;
  onDelete: (id: number) => void;
};

export const UsersCard: React.FC<UsersCardProps> = ({
  users = [],
  loading = false,
  onEdit,
  onDelete,
}) => {
  const {
    page,
    totalPages,
    totalItems,
    currentPageData,
    goToFirstPage,
    goToLastPage,
    goToNextPage,
    goToPreviousPage,
  } = usePaginate({ data: users, itemsPerPage: 10 });

  return (
    <>
      <Container>
        {loading ? (
          <>
            {Array.from({ length: 10 }).map((_, index) => (
              <CardLoadingSkeleton key={index} />
            ))}
          </>
        ) : (
          <>
            {currentPageData.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </>
        )}

        <div className="flex items-center justify-between p-4 border-t border-t-slate-400">
          <Pagination.Label
            currentPageData={currentPageData}
            totalItems={totalItems}
            paginationLabel={{ single: 'usuário', several: 'usuários' }}
          />
          <Pagination.Actions
            page={page}
            totalPages={totalPages}
            goToNextPage={goToNextPage}
            goToPreviousPage={goToPreviousPage}
            goToFirstPage={goToFirstPage}
            goToLastPage={goToLastPage}
          />
        </div>
      </Container>
    </>
  );
};
