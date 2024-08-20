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
      className="flex items-center py-2 gap-3 transition-all ease-in-out duration-500"
    >
      <div>
        <Avatar name={name} imageUrl={imageUrl} small={small} color={color!} />
      </div>

      <div className="break-words">
        <h4
          className={`${color === 'light' ? 'text-slate-300' : 'text-slate-600'} font-semibold text-sm transition-all duration-500`}
        >
          {name}
        </h4>
        <span className="text-slate-400 text-[10px] break-words block text-ellipsis overflow-hidden text-nowrap max-w-36 transition-all duration-500">
          {email}
        </span>
      </div>
    </div>
  );
};
