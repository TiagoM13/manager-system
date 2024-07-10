import React from 'react';

import { PencilSimple, Trash } from '@phosphor-icons/react';

import { Badge, Button, Pagination } from '@/components';
import { usePaginate } from '@/hooks';
import { IUser } from '@/interfaces';
import { formatDate, formatDateTime } from '@/utils';

import { Card, Container, Text } from './styles';

type UsersCardProps = {
  users: IUser[];
  loading?: boolean;
};

export const UsersCard: React.FC<UsersCardProps> = ({ users }) => {
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
    <Container>
      {currentPageData.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}

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
  );
};

const UserCard: React.FC<{ user: IUser }> = ({ user }) => {
  return (
    <Card>
      <div>
        <Text>
          <strong>Nome:</strong>
          <span>{user.name}</span>
        </Text>
        <Text>
          <strong>Email:</strong>
          <span>{user.email}</span>
        </Text>
        <Text>
          <strong>Tipo de usuário:</strong>
          <Badge type={user.user_type} />
        </Text>
        <Text>
          <strong>Data de registro:</strong>
          <span>{formatDate(user.created_at)}</span>
        </Text>
        <Text>
          <strong>Status:</strong>
          <Badge type={user.status} />
        </Text>
        <Text>
          <strong>Último acesso:</strong>
          <span>{formatDateTime(user.last_access)}</span>
        </Text>
      </div>

      <div className="flex flex-col gap-4">
        <Button
          label="editar"
          variable="primary"
          icon={<PencilSimple className="size-4" weight="bold" />}
        />
        <Button
          label="deletar"
          variable="danger"
          icon={<Trash className="size-4" weight="bold" />}
        />
      </div>
    </Card>
  );
};
