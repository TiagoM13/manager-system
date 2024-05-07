import React from 'react';
import {
  CaretDoubleLeft,
  CaretDoubleRight,
  CaretLeft,
  CaretRight,
  DotsThreeOutline,
} from '@phosphor-icons/react';

import { Card } from '@/app/components/card';
import { UserProfile } from '@/app/components';
import { Header } from '@/app/components/header';
import { InputSearch } from '@/app/components/input-search';
import { Badge } from '@/app/components/badge';
import { UserTypes } from '@/app/enums/user-types';
import { Status } from '@/app/enums/status';

export const Users: React.FC = () => {
  return (
    <>
      <Header
        title='Usuários'
        labelAction='cadastrar usuário'
      />

      {/* Sepate */}
      <div className='h-[1px] bg-slate-200 m-8' />

      {/* Table */}
      <Card>
        <InputSearch />

        <table className='w-full mt-8'>
          <thead>
            <tr className='h-16 border-b border-b-slate-300'>
              <th className='font-bold text-left text-sm p-2 text-wrap'>Nome/E-mail</th>
              <th className='font-bold text-left text-sm p-2 text-wrap'>Tipo de usuário</th>
              <th className='font-bold text-left text-sm p-2 text-wrap'>Data de registro</th>
              <th className='font-bold text-left text-sm p-2 text-wrap'>Status</th>
              <th className='font-bold text-left text-sm p-2 text-wrap'>Último acesso</th>
              <td />
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 6 }).map((_, index) => (
              <tr key={index} className='h-14 border-b border-b-slate-300 hover:bg-sky-50 cursor-pointer'>
                <td className='text-left text-sm p-2 text-wrap'>
                  <UserProfile
                    small
                    color='dark'
                    name='Tiago Mota'
                    imageUrl='https://avatars.githubusercontent.com/u/79538171?v=4'
                    email='tiago.dev@gmail.com'
                  />
                </td>
                <td className='text-left text-sm p-2 text-wrap'>
                  <Badge type={UserTypes.ADMIN} />
                </td>
                <td className='text-left text-sm p-2 text-wrap'>21/04/2024</td>
                <td className='text-left text-sm p-2 text-wrap'>
                  <Badge type={Status.ACTIVE} />
                </td>
                <td className='text-left text-sm p-2 text-wrap'>21 de abril às 18:19</td>
                <td>
                  <button className='hover:bg-slate-200/50 border border-slate-400/50 rounded-md p-1.5'>
                    <DotsThreeOutline className='size-4 text-slate-800' weight='fill' />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className='h-16'>
              <td className='text-left p-2 text-sm text-wrap' colSpan={3}>Mostrando 10 de 200 items</td>
              <td className='text-right p-2 text-sm text-wrap' colSpan={4}>
                <div className='inline-flex items-center gap-8'>
                  <span>Página 1 de 20</span>

                  <div className='flex gap-1.5'>
                    <button className='hover:bg-slate-200/50 border border-slate-400/50 rounded-md p-1.5'>
                      <CaretDoubleLeft className='size-4 text-slate-800' weight='bold' />
                    </button>
                    <button className='hover:bg-slate-200/50 border border-slate-400/50 rounded-md p-1.5'>
                      <CaretLeft className='size-4 text-slate-800' weight='bold' />
                    </button>
                    <button className='hover:bg-slate-200/50 border border-slate-400/50 rounded-md p-1.5'>
                      <CaretRight className='size-4 text-slate-800' weight='bold' />
                    </button>
                    <button className='hover:bg-slate-200/50 border border-slate-400/50 rounded-md p-1.5'>
                      <CaretDoubleRight className='size-4 text-slate-800' weight='bold' />
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </Card>
    </>
  );
}
