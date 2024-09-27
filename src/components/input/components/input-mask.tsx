import React from 'react';
import { Controller, FieldValues } from 'react-hook-form';

import { InputProps } from './interfaces';

interface InputMaskProps<T extends FieldValues> extends InputProps<T> {
  mask: (value: string) => string;
}

export const InputMask = <T extends FieldValues>({
  label,
  required = false,
  className = '',
  control,
  name,
  mask,
  defaultValue,
  error,
  ...props
}: InputMaskProps<T>) => {
  const handleInputMask = (
    mask: (value: string) => string,
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: any) => void,
  ) => {
    const formattedValue = mask(e.target.value);
    onChange(formattedValue);
  };

  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-sm text-slate-600 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {control ? (
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue || ''}
          render={({ field }) => (
            <input
              {...field}
              {...props}
              value={field.value || ''}
              data-testid={`input-${name}`}
              onChange={(e) => handleInputMask(mask, e, field.onChange)}
              className={`${className} w-full rounded-md border border-slate-400 py-2 px-4 outline-sky-500 text-sm text-slate-600 disabled:opacity-60`}
            />
          )}
        />
      ) : (
        <input
          {...props}
          data-testid={`input-${name}`}
          className={`${className} w-full rounded-md border border-slate-400 py-2 px-4 outline-sky-500 text-sm text-slate-600 disabled:opacity-60`}
        />
      )}
    </div>
  );
};
