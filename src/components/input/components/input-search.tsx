import React from 'react';
import { Control, Controller } from 'react-hook-form';

import { twMerge } from 'tailwind-merge';

import { MagnifyingGlass } from '@phosphor-icons/react';

type InputSearchProps = React.ComponentProps<'input'> & {
  name?: string;
  control?: Control;
  className?: string;
};

export const InputSearch: React.FC<InputSearchProps> = ({
  name,
  control,
  className,
  ...rest
}) => {
  return (
    <div className="flex items-center">
      {control ? (
        <Controller
          name={name || ''}
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="search"
              className={twMerge(
                `w-full text-sm border-r-0 border border-slate-400 py-1.5 px-4 rounded-l-lg h-[36px] outline-offset-0 outline-sky-500 min-w-60`,
                className,
              )}
              {...rest}
            />
          )}
        />
      ) : (
        <input
          type="search"
          className={twMerge(
            `w-full text-sm border-r-0 border border-slate-400 py-1.5 px-4 rounded-l-lg h-[36px] outline-offset-0 outline-sky-500`,
            className,
          )}
          {...rest}
        />
      )}

      <div className="flex items-center bg-sky-600 disabled:bg-sky-700 rounded-r-lg py-1 px-2.5 h-[36px]">
        <MagnifyingGlass
          data-testid="icon-search"
          weight="bold"
          color="white"
          className="size-5"
        />
      </div>
    </div>
  );
};
