import React from 'react';
import { useFormContext } from 'react-hook-form';

import { InputSearch } from '@/components';
import { useQuery } from '@/hooks';
import { IPatientFilters } from '@/interfaces';

type PatientFiltersProps = {
  loading?: boolean;
};

export const PatientFilters: React.FC<PatientFiltersProps> = ({ loading }) => {
  const { reset, control } = useFormContext<IPatientFilters>();
  const [query, setQuery] = useQuery<IPatientFilters>();

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
    <div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-2.5">
          <InputSearch
            name="name"
            control={control}
            value={query.name || ''}
            disabled={loading}
            placeholder="Pesquisar paciente"
            onChange={(e) => handleChangeQuery('name', e.target.value)}
            className="w-[260px]"
          />
        </div>
      </div>
    </div>
  );
};
