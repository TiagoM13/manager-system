import React from 'react';

export type IconButtonProps = React.ComponentProps<'button'>;

export const IconButton: React.FC<IconButtonProps> = ({ ...props }) => {
  return (
    <button
      {...props}
      className="bg-white hover:bg-slate-200/50 border border-slate-400/50 rounded-md p-1.5 duration-300 disabled:bg-slate-300/50 disabled:hover:bg-slate-300/50 outline-slate-400"
    />
  );
};
