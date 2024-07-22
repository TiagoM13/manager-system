import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type LoadingSkeletonProps = {
  count?: number;
  className?: string;
  baseColor?: string;
  highlightColor?: string;
};

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  count = 10,
  className = '',
  baseColor = 'var(--sky-100)',
  highlightColor = 'var(--sky-200)',
}) => {
  return (
    <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
      <div className="grid w-full mt-6">
        <div className="col-span-12">
          <Skeleton
            count={count}
            containerClassName="flex-1"
            height={64}
            width="100%"
            className={className}
          />
        </div>
      </div>
    </SkeletonTheme>
  );
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
        containerClassName="flex w-full h-full"
        className={className}
      />
    </SkeletonTheme>
  );
};
