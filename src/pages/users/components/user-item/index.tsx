import React from 'react';

import { PencilSimple, Trash } from '@phosphor-icons/react';

import defaultAvatarURL from '@/assets/avatars/avatar-user.jpg';
import {
  UserProfile,
  Badge,
  Table as T,
  ButtonActions,
  Button,
} from '@/components';
import { IUser } from '@/interfaces';
import { formatDate, formatDateTime } from '@/utils';

import { Card, Text } from './styles';

interface UserItemProps {
  user: IUser;
  onEdit: (data: IUser) => void;
  onDelete: (id: number) => void;
}

export const UserRow: React.FC<UserItemProps> = ({
  user,
  onDelete,
  onEdit,
}) => {
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

export const UserCard: React.FC<UserItemProps> = ({
  user,
  onEdit,
  onDelete,
}) => {
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
          onClick={() => onEdit(user)}
        />
        <Button
          label="deletar"
          variable="danger"
          icon={<Trash className="size-4" weight="bold" />}
          onClick={() => onDelete(user.id)}
        />
      </div>
    </Card>
  );
};
