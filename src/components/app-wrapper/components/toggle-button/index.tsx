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
      className="bg-black flex gap-2 text-sm text-zinc-400 transition-all duration-500 absolute bottom-16 -right-4 rounded-md p-2 shadow-sm shadow-slate-400 hover:text-sky-500 hover:shadow-sky-500"
    >
      <ArrowLeft
        weight="bold"
        className={`size-5 transition-transform duration-500 ${showingActionBar ? 'rotate-180' : ''}`}
      />
    </button>
  );
};
