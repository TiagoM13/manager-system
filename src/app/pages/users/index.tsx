import React from 'react';
import {
  CaretDoubleLeft,
  CaretDoubleRight,
  CaretLeft,
  CaretRight,
  DotsThreeOutline,
  MagnifyingGlass
} from '@phosphor-icons/react';

import { Header } from '@/app/components/header';
import { UserProfile } from '@/app/components';

export const Users: React.FC = () => {
  return (
    <>
      <Header
        title='Usuários'
        labelAction='cadastrar usuário'
      />

      {/* Filter */}
      <div className='flex items-center mt-8'>
        <input type="text" placeholder='Pesquisar...' className='border border-slate-500 py-1.5 px-4 rounded-l-lg h-10 outline-sky-500' />

        <button
          type='submit'
          className='bg-sky-600 rounded-r-lg p-2 text-wrap h-10 outline-sky-500'
        >
          <MagnifyingGlass
            weight='bold'
            color='white'
            className='size-6'
          />
        </button>
      </div>

      {/* Sepate */}
      <div className='h-[1px] bg-slate-200 my-4' />

      {/* Table */}
      <div className='border border-slate-300 rounded-lg p-2'>
        <table className='w-full'>
          <thead>
            <tr className='h-14 border-b border-b-slate-300'>
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
                <td className='text-left text-sm p-2 text-wrap'>SuperAdmin</td>
                <td className='text-left text-sm p-2 text-wrap'>21/04/2024</td>
                <td className='text-left text-sm p-2 text-wrap'>Ativo</td>
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
            <tr>
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
      </div>
    </>
  );
}
