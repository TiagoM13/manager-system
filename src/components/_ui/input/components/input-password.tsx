import React from 'react';
import { Controller, FieldValues } from 'react-hook-form';

import { Eye, EyeSlash } from '@phosphor-icons/react';

import { ErrorMessage } from '@/components/_ui';

import { InputPasswordProps } from './interfaces';

export const InputPassword = <T extends FieldValues>({
  label,
  required = false,
  className = '',
  control,
  name,
  defaultValue,
  error,
  loading = false,
  stylesRightButton = '',
  ...props
}: InputPasswordProps<T>) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const icon = (
    <>
      {showPassword ? (
        <EyeSlash
          data-testid="icon-eye-slash"
          weight="bold"
          color="white"
          className="size-5"
        />
      ) : (
        <Eye
          data-testid="icon-eye"
          weight="bold"
          color="white"
          className="size-5"
        />
      )}
    </>
  );

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className="mb-2 block text-sm text-slate-600">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {control ? (
          <Controller
            name={name}
            control={control}
            defaultValue={defaultValue || ''}
            render={({ field }) => (
              <input
                {...field}
                {...props}
                type={showPassword ? 'text' : 'password'}
                className={`${className} min-h-[36px] w-full rounded-s-md border-y border-l border-slate-400 px-4 py-2 text-sm text-slate-600 outline-offset-0 outline-sky-500 disabled:opacity-60`}
              />
            )}
          />
        ) : (
          <input
            {...props}
            type={showPassword ? 'password' : 'text'}
            className={`${className} min-h-[36px] w-full rounded-s-md border-y border-l border-slate-400 px-4 py-2 text-sm text-slate-600 outline-offset-0 outline-sky-500 disabled:opacity-60`}
          />
        )}

        <button
          type="button"
          data-testid="icon-button"
          onClick={togglePasswordVisibility}
          className={`${stylesRightButton} flex h-full flex-wrap items-center rounded-r-lg bg-sky-600 px-2.5 py-2.5 outline-sky-500 hover:bg-sky-500 disabled:bg-sky-700`}
          disabled={loading}
        >
          {icon}
        </button>
      </div>

      <ErrorMessage error={error?.message} />
    </div>
  );
};
