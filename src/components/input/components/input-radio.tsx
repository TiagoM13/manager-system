import React from 'react';
import { Control, Controller } from 'react-hook-form';

import { ErrorMessage } from '@/components/error-message';

import { InputRadioProps } from './interfaces';

export const InputRadio: React.FC<InputRadioProps> = ({
  required = false,
  disabled = false,
  label = 'Selecione uma opção',
  control,
  options,
  name,
  error,
}) => {
  return (
    <>
      <label className="block text-sm text-slate-600 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="flex gap-6">
        <OptionRadio
          name={name}
          control={control}
          id={options.opt1}
          value={options.opt1}
          disabled={disabled}
        />
        <OptionRadio
          name={name}
          control={control}
          id={options.opt2}
          value={options.opt2}
          disabled={disabled}
        />
      </div>

      <ErrorMessage error={error?.message} />
    </>
  );
};

type OptionRadioProps = React.ComponentProps<'input'> & {
  control?: Control<any>;
  defaultValue?: any;
  name?: string;
};

const OptionRadio = ({
  name,
  control,
  defaultValue,
  ...props
}: OptionRadioProps) => {
  return (
    <div className="flex items-center gap-2.5">
      {control ? (
        <Controller
          name={name as string}
          control={control}
          defaultValue={defaultValue}
          render={({ field }) => (
            <input
              {...field}
              {...props}
              checked={field.value === props.value}
              id={props.id?.toLowerCase()}
              type="radio"
              className={`cursor-pointer appearance-none h-[12px] w-[12px] border border-slate-600 rounded-full  transition-all ease-in duration-500 disabled:opacity-60 disabled:cursor-auto checked:bg-sky-600 checked:hover:bg-sky-500 ${!props.disabled ? 'hover:bg-sky-200' : ''}`}
            />
          )}
        />
      ) : (
        <input
          {...props}
          id={props.id?.toLowerCase()}
          type="radio"
          className={`cursor-pointer appearance-none h-[12px] w-[12px] border border-slate-600 rounded-full  transition-all ease-in duration-500 disabled:opacity-60 disabled:cursor-auto checked:bg-sky-600 checked:hover:bg-sky-500 ${!props.disabled ? 'hover:bg-sky-200' : ''}`}
        />
      )}

      <label
        htmlFor={props.id?.toLowerCase()}
        className={`cursor-pointer capitalize text-slate-600 ${props.disabled ? 'opacity-60 cursor-auto' : ''}`}
      >
        {props.value}
      </label>
    </div>
  );
};
