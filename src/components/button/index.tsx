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
  iconPosition?: 'right' | 'left';
};

export const Button: React.FC<ButtonProps> = ({
  id,
  label = 'Salvar',
  icon,
  iconPosition = 'left',
  variable = Variables.primary,
  className = '',
  clear,
  ...rest
}) => {
  const colorMap: Record<keyof typeof Variables, string> = {
    primary:
      'bg-sky-600 outline-sky-500 hover:bg-sky-500 text-white disabled:bg-sky-700',
    danger:
      'bg-red-600 outline-red-500 hover:bg-red-500 text-white disabled:bg-red-700',
    success:
      'bg-green-600 outline-green-500 hover:bg-green-500 text-white disabled:bg-green-700',
    secondary:
      'bg-slate-600 outline-slate-500 hover:bg-slate-500 text-white disabled:bg-slate-700',
  };

  const colorBorderMap: Record<keyof typeof Variables, string> = {
    primary:
      'border border-sky-600 outline-sky-500 hover:bg-sky-100 text-sky-600 disabled:opacity-60',
    danger:
      'border border-red-600 outline-red-500 hover:bg-red-100 text-red-600 disabled:opacity-60',
    success:
      'border border-green-600 outline-green-500 hover:bg-green-100 text-green-600 disabled:opacity-60',
    secondary:
      'border border-slate-600 outline-slate-500 hover:bg-slate-200 text-slate-600 disabled:opacity-60',
  };

  const color = colorMap[variable];
  const clearColors = colorBorderMap[variable];

  return (
    <button
      data-testid={`btn-${id}`}
      className={twMerge(
        `${!clear ? color : clearColors} rounded-lg py-2.5 px-3 font-medium text-sm flex gap-2 items-center justify-center`,
        className,
      )}
      {...rest}
    >
      {!!icon && iconPosition === 'left' && icon}
      {label}
      {!!icon && iconPosition === 'right' && icon}
    </button>
  );
};
