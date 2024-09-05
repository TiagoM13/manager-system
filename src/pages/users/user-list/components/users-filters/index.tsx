import React from 'react';
import { useFormContext } from 'react-hook-form';

import { InputSearch } from '@/components';
import { useQuery } from '@/hooks';
import { IUsersFilters } from '@/interfaces';

type UserFiltersProps = {
  loading?: boolean;
};

export const UsersFilters: React.FC<UserFiltersProps> = ({ loading }) => {
  const { reset, control } = useFormContext<IUsersFilters>();
  const [query, setQuery] = useQuery<IUsersFilters>();

  const handleChangeQuery = React.useCallback(
    (field: 'name', value?: string) => {
      setQuery((old) => {
        const newQuery = { ...old };
        newQuery[field] = value;
        newQuery.page = 1;
        reset(newQuery);
        return newQuery;
      });
    },
    [reset, setQuery],
  );

  return (
    <div className="w-full">
      <div className="flex flex-col gap-5">
        <div className="flex gap-2.5">
          <InputSearch
            name="name"
            control={control}
            value={query.name || ''}
            disabled={loading}
            placeholder="Pesquisar usuário"
            onChange={(e) => handleChangeQuery('name', e.target.value)}
          />

          {/* TODO */}
          {/* <Select options={options} placeholder="Selecione um filtro" /> */}
        </div>
      </div>
    </div>
  );
};
