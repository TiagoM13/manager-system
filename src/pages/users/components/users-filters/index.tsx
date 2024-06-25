import React from 'react';

import { InputSearch } from '@/components';

type UserFiltersProps = {
  loading?: boolean;
};

export const UsersFilters: React.FC<UserFiltersProps> = ({ loading }) => {
  // const options = [
  //   { id: 1, label: 'Status' },
  //   { id: 2, label: 'Tipo de usuário' },
  //   { id: 3, label: 'Data de registro' },
  // ];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-2.5">
        <InputSearch placeholder="Pesquisar usuário" disabled={loading} />

        {/* TODO */}
        {/* <Select options={options} placeholder="Selecione um filtro" /> */}
      </div>
    </div>
  );
};
