import React from 'react';

type Props = {
  imageUrl: string
  name: string
}

export const Avatar: React.FC<Props> = ({ imageUrl, name }) => {
  return (
    <div className="size-20 border-2 border-slate-300 rounded-full">
      <img src={imageUrl} alt={name} className="rounded-full" />
    </div>
  );
}
