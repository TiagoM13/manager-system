import React from 'react';

type ButtonProps = React.ComponentProps<'button'> & {
  label: string
  icon?: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({ label, icon, ...rest }) => {
  return (
    <button
      {...rest}
      className='border-0 rounded-lg bg-sky-600 p-2 font-medium text-base text-white min-w-52 hover:bg-sky-500 flex gap-2
      items-center'
    >
      {!!icon && icon}
      {label}
    </button>
  );
}
