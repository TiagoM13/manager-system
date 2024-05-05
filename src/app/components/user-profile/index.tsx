import React from 'react';
import { Avatar } from '../avatar';


type AvatarProps = {
  name: string
  email: string
  imageUrl: string
}

export const UserProfile: React.FC<AvatarProps> = ({ name, email, imageUrl }) => {
  return (
    <div className="flex items-center p-2 gap-3">
      <Avatar
        name={name}
        imageUrl={imageUrl}
      />

      <div className="break-words">
        <h4 className="text-slate-300 font-semibold text-sm">{name}</h4>
        <span className="text-slate-400 text-[10px] break-words block">{email}</span>
      </div>
    </div>
  );
}
