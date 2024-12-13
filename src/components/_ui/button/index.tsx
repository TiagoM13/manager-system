import React from 'react';

import { twMerge } from 'tailwind-merge';

import { CircleNotch } from '@phosphor-icons/react';

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
  loading?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  id,
  label,
  icon,
  iconPosition = 'left',
  variable = Variables.primary,
  className = '',
  clear,
  loading = false,
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

  const renderIcon = React.useMemo(
    () =>
      loading ? (
        <CircleNotch
          data-testid="icon-loading"
          weight="bold"
          color="white"
          className="size-4 animate-spin"
        />
      ) : (
        icon
      ),
    [icon, loading],
  );

  return (
    <button
      data-testid={`btn-${id}`}
      className={twMerge(
        `${!clear ? color : clearColors} flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium`,
        className,
      )}
      {...rest}
    >
      {!!icon && iconPosition === 'left' && renderIcon}
      {label}
      {!!icon && iconPosition === 'right' && renderIcon}
    </button>
  );
};
