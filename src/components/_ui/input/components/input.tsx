import React from 'react';
import { Controller, FieldValues } from 'react-hook-form';

import { ErrorMessage } from '@/components/_ui';

import { InputProps } from './interfaces';

export const Input = <T extends FieldValues>({
  label,
  required = false,
  className = '',
  control,
  name,
  defaultValue,
  error,
  ...props
}: InputProps<T>) => {
  const classNames = `${className} w-full min-h-[36px] rounded-md border border-slate-400 py-2 px-4 outline-offset-0 outline-sky-500 text-sm text-slate-600 disabled:opacity-60`;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className="mb-2 block text-sm text-slate-600">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {control ? (
        <>
          <Controller
            name={name}
            control={control}
            defaultValue={defaultValue || ''}
            render={({ field }) => (
              <input {...field} {...props} className={classNames} />
            )}
          />
        </>
      ) : (
        <>
          <input {...props} className={classNames} />
        </>
      )}

      <ErrorMessage error={error?.message} />
    </div>
  );
};
