import React from 'react';

import { twMerge } from 'tailwind-merge';

export enum Variables {
  primary = 'primary',
  danger = 'danger',
  success = 'success',
  secondary = 'secondary',
}

export type ButtonProps = React.ComponentProps<'button'> & {
  id?: string;
  label?: string;
  icon?: React.ReactNode;
  variable?: keyof typeof Variables;
  className?: string;
  clear?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  id,
  label = 'Salvar',
  icon,
  variable = Variables.primary,
  className = '',
  clear,
  ...rest
}) => {
  const colorMap: Record<keyof typeof Variables, string> = {
    primary: 'bg-sky-600 outline-sky-500 hover:bg-sky-500 disabled:bg-sky-700',
    danger: 'bg-red-600 outline-red-500 hover:bg-red-500 disabled:bg-red-700',
    success:
      'bg-green-600 outline-green-500 hover:bg-green-500 disabled:bg-green-700',
    secondary:
      'bg-slate-600 outline-slate-500 hover:bg-slate-500 disabled:bg-slate-700',
  };

  const color = colorMap[variable];

  return (
    <button
      data-testid={`btn-${id}`}
      className={twMerge(
        `${!clear ? color : ''} rounded-lg py-2.5 px-3 font-medium text-sm text-white flex gap-2 items-center justify-center`,
        className,
      )}
      {...rest}
    >
      {!!icon && icon}
      {label}
    </button>
  );
};
