import React from 'react';

import { Table as T, Pagination, TableLoadingSkeleton } from '@/components';
import { usePaginate } from '@/hooks';
import { IUser } from '@/interfaces';

import { UserRow } from '../user-item';

type UserTableProps = {
  users: IUser[] | undefined;
  loading?: boolean;
  onEdit: (data: IUser) => void;
  onDelete: (id: number) => void;
};

export const UsersTable: React.FC<UserTableProps> = ({
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
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
    goToLastPage,
  } = usePaginate({ data: users, itemsPerPage: 10 });

  return (
    <>
      <T.Container>
        <thead>
          <T.Row>
            <T.Header>Nome/E-mail</T.Header>
            <T.Header>Tipo de usuário</T.Header>
            <T.Header>Data de registro</T.Header>
            <T.Header>Status</T.Header>
            <T.Header>Último acesso</T.Header>
            <td />
          </T.Row>
        </thead>
        <tbody>
          {loading ? (
            <>
              {Array.from({ length: 10 }).map((_, index) => (
                <TableLoadingSkeleton key={index} />
              ))}
            </>
          ) : (
            <>
              {currentPageData.map((user) => (
                <UserRow
                  key={user.id}
                  user={user}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </>
          )}
        </tbody>
        <tfoot>
          <T.Row border={false}>
            <T.Cell colSpan={3}>
              <Pagination.Label
                currentPageData={currentPageData}
                totalItems={totalItems}
                paginationLabel={{ single: 'usuário', several: 'usuários' }}
              />
            </T.Cell>
            <T.Cell className="text-right" colSpan={4}>
              <Pagination.Actions
                page={page}
                totalPages={totalPages}
                goToNextPage={goToNextPage}
                goToPreviousPage={goToPreviousPage}
                goToFirstPage={goToFirstPage}
                goToLastPage={goToLastPage}
              />
            </T.Cell>
          </T.Row>
        </tfoot>
      </T.Container>
    </>
  );
};
