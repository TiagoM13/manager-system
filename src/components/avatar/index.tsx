import React from 'react';

import { CustomLoadingSkeleton } from '../loading-skeleton';

export type AvatarProps = {
  imageUrl: string | undefined;
  name: string;
  small?: boolean;
  color: 'light' | 'dark';
  className?: string;
  loading?: boolean;
};

export const Avatar: React.FC<AvatarProps> = ({
  imageUrl,
  name,
  small,
  color,
  className = '',
  loading = false,
}) => {
  return (
    <div
      data-testid="avatar-container"
      className={`${className}
        ${small ? 'size-[45px] ' : 'size-16'}
        ${color === 'light' ? 'border-white' : 'border-slate-700'}
      border-[1.5px] rounded-full relative`}
    >
      {loading ? (
        <CustomLoadingSkeleton
          baseColor="var(--sky-100)"
          highlightColor="var(--sky-300)"
          className="w-full h-full rounded-full overflow-hidden object-coverl"
        />
      ) : (
        <img
          data-testid="image-tag"
          src={imageUrl}
          alt={name}
          className="rounded-full overflow-hidden object-cover w-full h-full"
        />
      )}
    </div>
  );
};
