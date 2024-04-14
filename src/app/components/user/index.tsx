import React from 'react';
import { Avatar } from '../avatar';

export const UserProfile: React.FC = () => {
  return (
    <div className="flex flex-col items-center space-y-4 p-2">
      <Avatar
        name="Tiago Mota"
        imageUrl="https://avatars.githubusercontent.com/u/79538171?v=4"
      />

      <div className="text-center break-words">
        <h4 className="text-zinc-200 font-semibold text-sm">Tiago Mota</h4>
        <span className="text-zinc-400 text-xs">Digitador</span>
      </div>
    </div>
  );
}
