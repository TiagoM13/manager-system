import React from 'react';

import { ArrowLeft } from '@phosphor-icons/react';

type ToggleButtonProps = {
  showingActionBar: boolean;
  toggleSideBar: () => void;
};

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  toggleSideBar,
  showingActionBar,
}) => {
  return (
    <button
      onClick={toggleSideBar}
      className="absolute -right-4 bottom-16 flex gap-2 rounded-md bg-black p-2 text-sm text-zinc-400 shadow-sm shadow-slate-400 transition-all duration-500 hover:text-sky-500 hover:shadow-sky-500"
    >
      <ArrowLeft
        weight="bold"
        className={`size-5 transition-transform duration-500 ${showingActionBar ? 'rotate-180' : ''}`}
      />
    </button>
  );
};
