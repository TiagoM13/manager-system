import React from 'react';
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
  PathValue,
} from 'react-hook-form';
import ReactInputMask from 'react-input-mask';

import { ErrorMessage } from '../../error-message';
import { inputMasks } from './utils';

export interface IInputProps<Fields extends FieldValues>
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'children'> {
  label?: string;
  error?: FieldError;
  name: Path<Fields>;
  control?: Control<Fields>;
  defaultValue?: PathValue<Fields, Path<Fields>>;
  placeholder?: string;
  shouldUnregister?: boolean;
  multiline?: boolean;
  mask?: 'cpf' | 'cns' | 'phone' | 'date';
  customMask?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement> | string) => void;
}

export const InputMask = <T extends FieldValues>({
  label,
  mask,
  name,
  required,
  control,
  defaultValue,
  className,
  customMask,
  error,
  ...props
}: IInputProps<T>) => {
  const maskPattern = customMask || inputMasks[mask as keyof typeof inputMasks];

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className="mb-2 block text-sm text-slate-600">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {control ? (
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field }) => (
            <>
              <ReactInputMask
                {...props}
                {...field}
                data-testid={name}
                value={field.value || ''}
                mask={maskPattern}
                className={`${className} min-h-[36px] w-full rounded-md border border-slate-400 px-4 py-2 text-sm text-slate-600 outline-sky-500 disabled:opacity-60`}
              />
            </>
          )}
        />
      ) : (
        <ReactInputMask
          {...props}
          data-testid={name}
          mask={maskPattern}
          className={`${className} min-h-[36px] w-full rounded-md border border-slate-400 px-4 py-2 text-sm text-slate-600 outline-sky-500 disabled:opacity-60`}
        />
      )}

      <ErrorMessage error={error?.message} />
    </div>
  );
};
