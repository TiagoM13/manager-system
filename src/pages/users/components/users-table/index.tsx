import React from 'react';

import {
  DotsThreeOutline,
  CaretDoubleLeft,
  CaretLeft,
  CaretRight,
  CaretDoubleRight,
} from '@phosphor-icons/react';

import { UserProfile, Badge, IconButton, Table as T } from '@/components';
import { users } from '@/data';
import { usePaginate } from '@/hooks';
import { User } from '@/interfaces';
import { formatDate, formatDateTime } from '@/utils';

export const UsersTable: React.FC = () => {
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

  const renderRow = React.useCallback((user: User) => {
    return (
      <T.Row hoverable key={user.id}>
        <T.Cell style={{ maxWidth: 220 }}>
          <UserProfile
            small
            color="dark"
            name={user.name}
            imageUrl={user.image_url}
            email={user.email}
          />
        </T.Cell>
        <T.Cell>
          <Badge type={user.user_type} />
        </T.Cell>
        <T.Cell>{formatDate(user.created_at)}</T.Cell>
        <T.Cell>
          <Badge type={user.status} />
        </T.Cell>
        <T.Cell>{formatDateTime(user.last_access)}</T.Cell>
        <T.Cell style={{ width: 50 }}>
          <IconButton>
            <DotsThreeOutline className="size-4 text-slate-800" weight="fill" />
          </IconButton>
        </T.Cell>
      </T.Row>
    );
  }, []);

  return (
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
      <tbody>{currentPageData.map(renderRow)}</tbody>
      <tfoot>
        <T.Row border={false}>
          <T.Cell colSpan={3}>
            Mostrando {currentPageData.length} de {totalItems} usuários
          </T.Cell>
          <T.Cell className="text-right" colSpan={4}>
            <div className="inline-flex items-center gap-8">
              <span>
                Página {page} de {totalPages}
              </span>

              <div className="flex gap-1.5">
                <IconButton onClick={goToFirstPage} disabled={page === 1}>
                  <CaretDoubleLeft
                    className="size-4 text-slate-800"
                    weight="bold"
                  />
                </IconButton>
                <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                  <CaretLeft className="size-4 text-slate-800" weight="bold" />
                </IconButton>
                <IconButton
                  onClick={goToNextPage}
                  disabled={page === totalPages}
                >
                  <CaretRight className="size-4 text-slate-800" weight="bold" />
                </IconButton>
                <IconButton
                  onClick={goToLastPage}
                  disabled={page === totalPages}
                >
                  <CaretDoubleRight
                    className="size-4 text-slate-800"
                    weight="bold"
                  />
                </IconButton>
              </div>
            </div>
          </T.Cell>
        </T.Row>
      </tfoot>
    </T.Container>
  );
};
