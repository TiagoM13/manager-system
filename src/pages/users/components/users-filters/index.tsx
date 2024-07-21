import React from 'react';
import { useFormContext } from 'react-hook-form';

import { InputSearch } from '@/components';
import { useQuery } from '@/hooks/query';
import { useAllUsers } from '@/hooks/users';
import { IUsersFilters } from '@/interfaces';

type UserFiltersProps = {
  loading?: boolean;
};

export const UsersFilters: React.FC<UserFiltersProps> = ({ loading }) => {
  const {
    reset,
    control,
    handleSubmit: submit,
  } = useFormContext<IUsersFilters>();

  const { getAllUsers: refresh } = useAllUsers();
  const [query, setQuery] = useQuery<IUsersFilters>();

  const handleChangeQuery = React.useCallback(
    (field: 'name', value?: string) => {
      setQuery((old) => {
        const newQuery = { ...old };
        newQuery[field] = value;
        reset(newQuery);
        return newQuery;
      });
    },
    [reset, setQuery],
  );

  const handleSubmit = React.useCallback(
    (values: IUsersFilters) => {
      setQuery({ ...query });
      refresh({ ...values });
    },
    [refresh, query, setQuery],
  );

  return (
    <form onSubmit={submit(handleSubmit)} className="w-full">
      <div className="flex flex-col gap-5">
        <div className="flex gap-2.5">
          <InputSearch
            name="name"
            loading={loading}
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
    </form>
  );
};
