import React from 'react';

import { Avatar } from '../avatar';

export type UserProfileProps = {
  name: string;
  email: string;
  imageUrl: string | null;
  small?: boolean;
  color?: 'light' | 'dark';
};

export const UserProfile: React.FC<UserProfileProps> = ({
  name,
  email,
  imageUrl,
  small,
  color,
}) => {
  return (
    <div
      id="content-user-profile"
      className="flex items-center gap-3 py-2 transition-all duration-500 ease-in-out"
    >
      <div>
        <Avatar name={name} imageUrl={imageUrl} small={small} color={color!} />
      </div>

      <div className="break-words">
        <h4
          className={`${color === 'light' ? 'text-slate-300' : 'text-slate-600'} text-sm font-semibold capitalize transition-all duration-500`}
        >
          {name}
        </h4>
        <span className="block max-w-36 overflow-hidden text-ellipsis text-nowrap break-words text-[10px] text-slate-400 transition-all duration-500">
          {email}
        </span>
      </div>
    </div>
  );
};
