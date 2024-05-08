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
  T,
  UserProfile
} from '@/app/components';

import { Status, UserTypes } from '@/app/enums';

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
            {Array.from({ length: 10 }).map((_, index) => (
              <T.Row hoverable key={index}>
                <T.Cell>
                  <UserProfile
                    small
                    color='dark'
                    name='Tiago Mota'
                    imageUrl='https://avatars.githubusercontent.com/u/79538171?v=4'
                    email='tiago.dev@gmail.com'
                  />
                </T.Cell>
                <T.Cell>
                  <Badge type={UserTypes.ADMIN} />
                </T.Cell>
                <T.Cell>21/04/2024</T.Cell>
                <T.Cell>
                  <Badge type={Status.ACTIVE} />
                </T.Cell>
                <T.Cell>21 de abril às 18:19</T.Cell>
                <T.Cell style={{ width: 50 }}>
                  <IconButton>
                    <DotsThreeOutline className='size-4 text-slate-800' weight='fill' />
                  </IconButton>
                </T.Cell>
              </T.Row>
            ))}
          </tbody>
          <tfoot>
            <T.Row>
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
