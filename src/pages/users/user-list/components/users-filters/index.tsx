import React from 'react';
import { useFormContext } from 'react-hook-form';

import { FormContainer, InputSearch } from '@/components';
import { useQuery } from '@/hooks';
import { IUsersFilters } from '@/interfaces';

type UserFiltersProps = {
  loading?: boolean;
};

export const UsersFilters: React.FC<UserFiltersProps> = ({ loading }) => {
  const { control, handleSubmit } = useFormContext<IUsersFilters>();
  const [_, setQuery] = useQuery<IUsersFilters>();

  const handleFilterUsers = React.useCallback(
    ({ name }: IUsersFilters) => {
      if (name !== undefined) {
        setQuery({ name, page: 1 });
      }
      return;
    },
    [setQuery],
  );

  return (
    <FormContainer onSubmit={handleSubmit(handleFilterUsers)}>
      <div className="w-full">
        <div className="flex flex-col gap-5">
          <div className="flex gap-2.5">
            <InputSearch
              name="name"
              control={control}
              placeholder="Pesquisar usuário"
              disabled={loading}
            />
          </div>
        </div>
      </div>
    </FormContainer>
  );
};
