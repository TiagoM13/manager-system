import React from 'react';
import { Control, Controller } from 'react-hook-form';

import { CircleNotch, MagnifyingGlass } from '@phosphor-icons/react';

type InputSearchProps = React.ComponentProps<'input'> & {
  name: string;
  control: Control;
  loading?: boolean;
};

export const InputSearch: React.FC<InputSearchProps> = ({
  name,
  control,
  loading,
  ...rest
}) => {
  return (
    <div className="flex items-center">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            {...rest}
            className="text-sm border-r-0 border border-slate-400 py-1.5 px-4 rounded-l-lg h-[36px] outline-sky-500 min-w-60"
          />
        )}
      />

      <button
        disabled={rest.disabled}
        type="submit"
        className="bg-sky-600 outline-sky-500 hover:bg-sky-500 disabled:bg-sky-700 rounded-r-lg py-1 px-2.5 h-[36px]"
      >
        {loading ? (
          <CircleNotch
            weight="bold"
            color="white"
            className="size-5 animate-spin"
          />
        ) : (
          <MagnifyingGlass weight="bold" color="white" className="size-5" />
        )}
      </button>
    </div>
  );
};
