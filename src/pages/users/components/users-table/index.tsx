import React from 'react';

import defaultAvatarURL from '@/assets/avatars/avatar-user.jpg';
import {
  UserProfile,
  Badge,
  Table as T,
  Pagination,
  ButtonActions,
  ListLoadingSkeleton,
} from '@/components';
import { usePaginate } from '@/hooks';
import { IUser } from '@/interfaces';
import { formatDate, formatDateTime } from '@/utils';

type UserTableProps = {
  users: IUser[];
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
      {loading ? (
        <ListLoadingSkeleton />
      ) : (
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
            {currentPageData.map((user) => (
              <UserRow
                key={user.id}
                user={user}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
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
      )}
    </>
  );
};

interface UserRowProps {
  user: IUser;
  onEdit: (data: IUser) => void;
  onDelete: (id: number) => void;
}

const UserRow: React.FC<UserRowProps> = ({ user, onDelete, onEdit }) => {
  return (
    <T.Row hoverable key={user.id}>
      <T.Cell style={{ maxWidth: 220 }}>
        <UserProfile
          small
          color="dark"
          name={user.name}
          imageUrl={!user.image_url ? defaultAvatarURL : user.image_url}
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
        <ButtonActions
          onEdit={() => onEdit(user)}
          onDelete={() => onDelete(user.id)}
        />
      </T.Cell>
    </T.Row>
  );
};
