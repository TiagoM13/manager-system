import React from 'react';
import {
  CaretDoubleLeft,
  CaretDoubleRight,
  CaretLeft,
  CaretRight,
  DotsThreeOutline,
} from '@phosphor-icons/react';

import {
  Badge,
  Card,
  Divider,
  Header,
  IconButton,
  InputSearch,
  Table as T,
  UserProfile
} from '@/components';

import { users } from '@/data/users';
import { formatDate, formatDateTime } from '@/utils';

export const Users: React.FC = () => {
  return (
    <>
      <Header
        title='Usuários'
        labelAction='cadastrar usuário'
      />
      <Divider />

      <Card>
        <InputSearch />

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
            {users.slice(0, 10).map((user) => (
              <T.Row hoverable key={user.id}>
                <T.Cell style={{ maxWidth: 220 }}>
                  <UserProfile
                    small
                    color='dark'
                    name={user.name}
                    imageUrl='https://avatars.githubusercontent.com/u/79538171?v=4'
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
                    <DotsThreeOutline className='size-4 text-slate-800' weight='fill' />
                  </IconButton>
                </T.Cell>
              </T.Row>
            ))}
          </tbody>
          <tfoot>
            <T.Row border={false}>
              <T.Cell colSpan={3}>
                Mostrando 10 de 100 items
              </T.Cell>
              <T.Cell className='text-right' colSpan={4}>
                <div className='inline-flex items-center gap-8'>
                  <span>Página 1 de 20</span>

                  <div className='flex gap-1.5'>
                    <IconButton>
                      <CaretDoubleLeft
                        className='size-4 text-slate-800'
                        weight='bold'
                      />
                    </IconButton>
                    <IconButton>
                      <CaretLeft
                        className='size-4 text-slate-800'
                        weight='bold'
                      />
                    </IconButton>
                    <IconButton>
                      <CaretRight
                        className='size-4 text-slate-800'
                        weight='bold'
                      />
                    </IconButton>
                    <IconButton>
                      <CaretDoubleRight
                        className='size-4 text-slate-800'
                        weight='bold'
                      />
                    </IconButton>
                  </div>
                </div>
              </T.Cell>
            </T.Row>
          </tfoot>
        </T.Container>
      </Card>
    </>
  );
}
