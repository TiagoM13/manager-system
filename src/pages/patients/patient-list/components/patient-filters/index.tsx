import React from 'react';
import { useFormContext } from 'react-hook-form';

import { InputSearch } from '@/components';
import { useQuery } from '@/hooks';
import { IPatientFilters } from '@/interfaces';

type PatientFiltersProps = {
  loading?: boolean;
};

export const PatientFilters: React.FC<PatientFiltersProps> = ({ loading }) => {
  // const { control } = useFormContext<IPatientFilters>();
  const [query, setQuery] = useQuery<IPatientFilters>();

  const handleChangeQuery = React.useCallback(
    (field: 'search', value?: string) => {
      setQuery((old) => {
        const newQuery = { ...old };
        newQuery[field] = value;
        newQuery.page = 1;
        // reset(newQuery);
        return newQuery;
      });
    },
    [setQuery],
  );

  return (
    <div className="w-full">
      <div className="flex flex-col gap-5">
        <div className="flex gap-2.5">
          <InputSearch
            name="name"
            value={query.search || ''}
            disabled={loading}
            placeholder="Pesquisar paciente (Nome ou CPF)"
            onChange={(e) => handleChangeQuery('search', e.target.value)}
            className="w-[260px]"
          />
        </div>
      </div>
    </div>
  );
};
