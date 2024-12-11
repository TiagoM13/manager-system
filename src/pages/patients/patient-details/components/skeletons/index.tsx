import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export const LoadingSkeletonAppointmentHistory = () => {
  return (
    <SkeletonTheme baseColor="var(--sky-100)" highlightColor="var(--sky-200)">
      <Skeleton className="w-48 rounded-xl" />
      <div className="flex flex-col space-y-4">
        <Skeleton
          containerClassName="flex-1"
          className="w-full h-20 rounded-xl"
        />
        <Skeleton
          containerClassName="flex-1"
          className="w-full h-20 rounded-xl"
        />
        <Skeleton
          containerClassName="flex-1"
          className="w-full h-20 rounded-xl"
        />
      </div>
      <div className="flex flex-col items-center justify-center space-y-2">
        <Skeleton className="w-48 rounded-xl" />
        <Skeleton className="w-56 h-10 rounded-xl" />
      </div>
    </SkeletonTheme>
  );
};
