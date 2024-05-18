import React from 'react';

import { MagnifyingGlass } from '@phosphor-icons/react';

type InputSearchProps = React.ComponentProps<'input'> & {};

export const InputSearch: React.FC<InputSearchProps> = ({ ...rest }) => {
  return (
    <div className="flex items-center">
      <input
        {...rest}
        type="text"
        className="text-sm border-r-0 border border-slate-400 py-1.5 px-4 rounded-l-lg h-9 outline-sky-500 min-w-60"
      />

      <button
        disabled={rest.disabled}
        type="submit"
        className="bg-sky-600 outline-sky-500 hover:bg-sky-500 disabled:bg-sky-700 rounded-r-lg py-1 px-2.5 h-9"
      >
        <MagnifyingGlass weight="bold" color="white" className="size-5" />
      </button>
    </div>
  );
};
