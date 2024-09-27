import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { Table } from '@/components';

export const SkeletonTablePatients: React.FC = () => {
  return (
    <SkeletonTheme baseColor="var(--sky-100)" highlightColor="var(--sky-200)">
      <Table.Row>
        <Table.Cell style={{ width: 320 }}>
          <div className="flex items-center gap-4">
            <div>
              <Skeleton
                containerClassName="flex-1"
                className="w-[45px] h-[45px] rounded-full"
              />
            </div>
            <div className="w-48">
              <Skeleton
                containerClassName="flex-1"
                className="max-w-48 w-full"
              />
            </div>
          </div>
        </Table.Cell>
        <Table.Cell style={{ width: 220 }}>
          <Skeleton containerClassName="flex-1" className="max-w-36 w-full" />
        </Table.Cell>
        <Table.Cell style={{ width: 220 }}>
          <Skeleton containerClassName="flex-1" className="max-w-36 w-full" />
        </Table.Cell>
        <Table.Cell style={{ width: 220 }}>
          <Skeleton containerClassName="flex-1" className="max-w-32 w-full" />
        </Table.Cell>
        <Table.Cell style={{ width: 320 }}>
          <Skeleton containerClassName="flex-1" className="max-w-56 w-full" />
        </Table.Cell>
        <Table.Cell style={{ width: 320 }}>
          <Skeleton containerClassName="flex-1" className="max-w-56 w-full" />
        </Table.Cell>
        <Table.Cell style={{ width: 100 }}>
          <Skeleton containerClassName="flex-1" className="max-w-28 w-full" />
        </Table.Cell>
      </Table.Row>
    </SkeletonTheme>
  );
};
