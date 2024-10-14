import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type LoadingSkeletonProps = {
  count?: number;
  className?: string;
  baseColor?: string;
  highlightColor?: string;
};

export const CustomLoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  count,
  className = '',
  baseColor = 'var(--sky-100)',
  highlightColor = 'var(--sky-200)',
}) => {
  return (
    <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
      <Skeleton
        count={count}
        containerClassName="flex-1 w-full h-full"
        className={className}
      />
    </SkeletonTheme>
  );
};
