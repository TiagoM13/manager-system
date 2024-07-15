import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';

interface InputRadioProps {
  required?: boolean;
  disabled?: boolean;
  label?: string;
  name?: string;
  options: {
    opt1: string;
    opt2: string;
  };
  error?: FieldError | undefined;
}

export const InputRadio: React.FC<InputRadioProps> = ({
  required = false,
  disabled = false,
  label = 'Selecione uma opção',
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
          id={options.opt1}
          value={options.opt1}
          disabled={disabled}
        />
        <OptionRadio
          name={name}
          id={options.opt2}
          value={options.opt2}
          disabled={disabled}
        />
      </div>

      {!!error && (
        <span className="block text-sm text-red-500 mt-1">{error.message}</span>
      )}
    </>
  );
};

type OptionRadioProps = React.ComponentProps<'input'> & {
  control?: Control<any>;
  name?: string;
};

const OptionRadio = ({ name, control, ...props }: OptionRadioProps) => {
  return (
    <div className="flex items-center gap-2.5">
      <Controller
        name={name as string}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            {...props}
            id={props.id?.toLowerCase()}
            type="radio"
            className="cursor-pointer appearance-none h-[12px] w-[12px] border border-slate-600 rounded-full hover:bg-sky-200 checked:bg-sky-600 checked:hover:bg-sky-500 transition-all ease-in duration-500 disabled:opacity-60"
          />
        )}
      />

      <label
        htmlFor={props.id?.toLowerCase()}
        className={`cursor-pointer capitalize text-slate-600 ${props.disabled ? 'opacity-60' : null}`}
      >
        {props.value}
      </label>
    </div>
  );
};
