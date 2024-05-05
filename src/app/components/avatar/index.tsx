import React from 'react';

type Props = {
  imageUrl: string
  name: string
}

export const Avatar: React.FC<Props> = ({ imageUrl, name }) => {
  return (
    <div className="size-16 border-2 border-white rounded-full">
      <img src={imageUrl} alt={name} className="rounded-full" />
    </div>
  );
}
