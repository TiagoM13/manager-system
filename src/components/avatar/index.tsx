import React from 'react';

export type AvatarProps = {
  imageUrl: string;
  name: string;
  small?: boolean;
  color: 'light' | 'dark';
  className?: string;
};

export const Avatar: React.FC<AvatarProps> = ({
  imageUrl,
  name,
  small,
  color,
  className = '',
}) => {
  return (
    <div
      data-testid="avatar-container"
      className={`${className}
        ${small ? 'size-[45px] ' : 'size-16'}
        ${color === 'light' ? 'border-white' : 'border-slate-700'}
      border-[1.5px] rounded-full`}
    >
      <img
        data-testid="image-tag"
        src={imageUrl}
        alt={name}
        className="rounded-full overflow-hidden object-cover w-full h-full"
      />
    </div>
  );
};
