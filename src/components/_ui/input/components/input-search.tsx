import React from 'react';
import { Controller } from 'react-hook-form';

import { twMerge } from 'tailwind-merge';

import { CircleNotch, MagnifyingGlass } from '@phosphor-icons/react';

import { InputSearchProps } from './interfaces';

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
                `h-[36px] w-full min-w-60 rounded-l-lg border border-r-0 border-slate-400 px-4 py-1.5 text-sm outline-offset-0 outline-sky-500 disabled:opacity-60`,
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
            `h-[36px] w-full rounded-l-lg border border-r-0 border-slate-400 px-4 py-1.5 text-sm outline-offset-0 outline-sky-500 disabled:opacity-60`,
            className,
          )}
          {...rest}
        />
      )}

      <button
        type="submit"
        disabled={rest.disabled}
        className="flex h-[36px] items-center rounded-r-lg bg-sky-600 px-2.5 py-1 outline-offset-0 outline-sky-500 hover:bg-sky-500 disabled:bg-sky-700"
      >
        {rest.disabled ? (
          <CircleNotch
            data-testid="icon-loading"
            weight="bold"
            color="white"
            className="size-5 animate-spin"
          />
        ) : (
          <MagnifyingGlass
            data-testid="icon-search"
            weight="bold"
            color="white"
            className="size-5"
          />
        )}
      </button>
    </div>
  );
};
