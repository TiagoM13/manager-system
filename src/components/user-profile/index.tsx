import React from 'react';

import { Avatar } from '../avatar';

export type UserProfileProps = {
  name: string;
  email: string;
  imageUrl: string;
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
    <div className="flex items-center p-2 gap-3">
      <Avatar name={name} imageUrl={imageUrl} small={small} color={color!} />

      <div className="break-words">
        <h4
          className={`${color === 'light' ? 'text-slate-300' : 'text-slate-600'} font-semibold text-sm`}
        >
          {name}
        </h4>
        <span className="text-slate-400 text-[10px] break-words block">
          {email}
        </span>
      </div>
    </div>
  );
};
