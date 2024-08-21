import React from 'react';

import { X } from '@phosphor-icons/react';

export type IconButtonProps = React.ComponentProps<'button'>;

export const IconButton: React.FC<IconButtonProps> = ({ ...props }) => {
  return (
    <button
      className={`${props.className} bg-white hover:bg-slate-200/50 border border-slate-400/50 rounded-md p-1.5 duration-300 disabled:bg-slate-300/50 disabled:hover:bg-slate-300/50 outline-slate-400`}
      {...props}
    />
  );
};

export const CloseButton: React.FC<IconButtonProps> = ({ ...props }) => {
  return (
    <IconButton
      className={`${props.className} flex items-center justify-center w-7 h-7 border border-slate-400 rounded-full text-zinc-200 hover:brightness-90 focus-visible:outline-sky-500`}
      {...props}
    >
      <X className="size-5 text-slate-400" weight="bold" />
    </IconButton>
  );
};
