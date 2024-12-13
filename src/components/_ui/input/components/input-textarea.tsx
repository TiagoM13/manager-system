import React from 'react';
import { Controller, FieldValues } from 'react-hook-form';

import { ErrorMessage } from '@/components/_ui';

import { TextareaProps } from './interfaces';

export const Textarea = <T extends FieldValues>({
  label,
  required = false,
  className = '',
  control,
  name,
  defaultValue,
  error,
  ...props
}: TextareaProps<T>) => {
  const classNames = `${className} w-full min-h-[100px] rounded-md border border-slate-400 p-4 outline-offset-0 outline-sky-500 text-sm text-slate-600 disabled:opacity-60 resize-none`;

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
              <textarea {...field} {...props} className={classNames}></textarea>
            )}
          />
        </>
      ) : (
        <>
          <textarea {...props} className={classNames} />
        </>
      )}

      <ErrorMessage error={error?.message} />
    </div>
  );
};
