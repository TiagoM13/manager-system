import React from 'react';
import { Avatar } from '../avatar';


type AvatarProps = {
  name: string
  office: string
  imageUrl: string
}

export const UserProfile: React.FC<AvatarProps> = ({ name, office, imageUrl }) => {
  return (
    <div className="flex flex-col items-center space-y-4 p-2">
      <Avatar
        name={name}
        imageUrl={imageUrl}
      />

      <div className="text-center break-words">
        <h4 className="text-slate-300 font-semibold text-base">{name}</h4>
        <span className="text-slate-400 text-sm">{office}</span>
      </div>
    </div>
  );
}
