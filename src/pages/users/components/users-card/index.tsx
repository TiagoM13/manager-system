import React from 'react';

import { CardLoadingSkeleton, Pagination } from '@/components';
import { IResponseMeta, IUser } from '@/interfaces';

import { UserCard } from '../user-item';

import { Container } from './styles';

type IUserData = {
  users: IUser[];
  meta?: IResponseMeta;
};

type UsersCardProps = {
  data: IUserData | undefined;
  loading?: boolean;
  onEdit: (data: IUser) => void;
  onDelete: (id: number) => void;
};

export const UsersCard: React.FC<UsersCardProps> = ({
  data,
  loading = false,
  onEdit,
  onDelete,
}) => {
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
            {data?.users.map((user) => (
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
            currentPageData={data?.meta?.total_current_records! || 0}
            totalItems={data?.meta?.total_records || 0}
            paginationLabel={{ single: 'usuário', several: 'usuários' }}
          />
          <Pagination.Actions totalPages={data?.meta?.total_pages || 1} />
        </div>
      </Container>
    </>
  );
};
