import React from 'react';

import { useImageLazyLoader } from '@/hooks';

import { CustomLoadingSkeleton } from '../loading-skeleton';

export type AvatarProps = {
  imageUrl: string | null;
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
  const { isLoading, imgSrc } = useImageLazyLoader({
    imgUrl: imageUrl || '',
  });

  const initialLetterName = React.useMemo(() => {
    const ignoredWords = ['de', 'da', 'do', 'dos', 'das'];
    const nameParts = name
      .split(' ')
      .filter((part) => !ignoredWords.includes(part.toLowerCase()));

    const firstNameInitial = nameParts[0] ? nameParts[0][0] : '';
    const lastNameInitial =
      nameParts.length > 1 ? nameParts[nameParts.length - 1][0] : '';

    return (
      <>
        {firstNameInitial}
        {lastNameInitial}
      </>
    );
  }, [name]);

  if (loading || isLoading) {
    return (
      <div className={`${className} ${small ? 'size-[45px] ' : 'size-16'}`}>
        <CustomLoadingSkeleton
          baseColor="var(--sky-100)"
          highlightColor="var(--sky-300)"
          className="w-full h-full rounded-full"
        />
      </div>
    );
  }

  return (
    <div
      data-testid="avatar-container"
      className={`${className}
        ${small ? 'size-[45px] ' : 'size-16'}
        ${color === 'light' ? 'border-white' : 'border-slate-700'}
      border-[1.5px] rounded-full relative`}
    >
      {imageUrl !== null ? (
        <img
          data-testid="image-tag"
          src={imgSrc || imageUrl}
          alt={name}
          className="rounded-full overflow-hidden object-cover w-full h-full"
        />
      ) : (
        <span className="w-full h-full flex justify-center items-center bg-sky-600 text-white font-semibold rounded-full uppercase">
          {initialLetterName}
        </span>
      )}
    </div>
  );
};
