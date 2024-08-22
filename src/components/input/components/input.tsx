import React from 'react';
import {
  Control,
  Controller,
  FieldError,
  FieldPath,
  FieldValues,
} from 'react-hook-form';

import { ErrorMessage } from '@/components/error-message';

interface InputProps<T extends FieldValues>
  extends React.ComponentProps<'input'> {
  label?: string;
  required?: boolean;
  className?: string;
  defaultValue?: any;
  control?: Control<T>;
  name: FieldPath<T>;
  error?: FieldError | undefined;
}

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
  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-sm text-slate-600 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {control ? (
        <>
          <Controller
            name={name}
            control={control}
            defaultValue={defaultValue || ''}
            render={({ field }) => (
              <input
                {...field}
                {...props}
                className={`${className} w-full rounded-md border border-slate-400 py-2 px-4 outline-sky-500 text-sm text-slate-600 disabled:opacity-60`}
              />
            )}
          />
        </>
      ) : (
        <>
          <input
            {...props}
            className={`${className} w-full rounded-md border border-slate-400 py-2 px-4 outline-sky-500 text-sm text-slate-600 disabled:opacity-60`}
          />
        </>
      )}

      <ErrorMessage error={error?.message} />
    </div>
  );
};
