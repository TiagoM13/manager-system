import React from 'react';

import { InputSearch } from '@/components';

type UserFiltersProps = {
  loading?: boolean;
};

export const UsersFilters: React.FC<UserFiltersProps> = ({ loading }) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-2.5">
        <InputSearch placeholder="Pesquisar usuário" disabled={loading} />
      </div>
    </div>
  );
};
