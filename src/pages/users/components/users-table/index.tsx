import React from 'react';

import { Table as T, Pagination, TableLoadingSkeleton } from '@/components';
import { IUser } from '@/interfaces';
import { IResponseMeta } from '@/services';

import { UserRow } from '../user-item';

type IUserData = {
  users: IUser[];
  meta?: IResponseMeta;
};

type UserTableProps = {
  data: IUserData | undefined;
  loading?: boolean;
  onEdit: (data: IUser) => void;
  onDelete: (id: number) => void;
};

export const UsersTable: React.FC<UserTableProps> = ({
  data,
  loading = false,
  onEdit,
  onDelete,
}) => {
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
              {data?.users.map((user) => (
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
                currentPageData={data?.meta?.total_current_records! || 0}
                totalItems={data?.meta?.total_records || 0}
                paginationLabel={{ single: 'usuário', several: 'usuários' }}
              />
            </T.Cell>
            <T.Cell className="text-right" colSpan={4}>
              <Pagination.Actions totalPages={data?.meta?.total_pages || 1} />
            </T.Cell>
          </T.Row>
        </tfoot>
      </T.Container>
    </>
  );
};
