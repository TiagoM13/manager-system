import React from 'react';

import { Avatar } from '../avatar';

export type UserProfileProps = {
  name: string;
  email: string;
  imageUrl: string;
  small?: boolean;
  color?: 'light' | 'dark';
  activeSideBar?: boolean;
};

export const UserProfile: React.FC<UserProfileProps> = ({
  name,
  email,
  imageUrl,
  small,
  color,
  activeSideBar,
}) => {
  return (
    <div
      className={`flex items-center py-2 gap-3 transition-all ease-in-out duration-500 ${activeSideBar ? '-ml-3' : null}`}
    >
      <div>
        <Avatar name={name} imageUrl={imageUrl} small={small} color={color!} />
      </div>

      <div
        className={`break-words transition-all ease-in-out duration-500 ${activeSideBar ? 'opacity-0' : 'opacity-1'}`}
      >
        <h4
          className={`${color === 'light' ? 'text-slate-300' : 'text-slate-600'} font-semibold text-sm`}
        >
          {name}
        </h4>
        <span className="text-slate-400 text-[10px] break-words block text-ellipsis overflow-hidden text-nowrap max-w-36">
          {email}
        </span>
      </div>
    </div>
  );
};
