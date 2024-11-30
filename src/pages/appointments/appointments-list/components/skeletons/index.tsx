import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { Table } from '@/components';

export const SkeletonTableAppintments: React.FC = () => {
  return (
    <SkeletonTheme baseColor="var(--sky-100)" highlightColor="var(--sky-200)">
      <Table.Row>
        <Table.Cell style={{ width: 240 }}>
          <div className="flex items-center gap-4">
            <div className="w-48">
              <Skeleton
                containerClassName="flex-1"
                className="max-w-48 w-full"
              />
            </div>
          </div>
        </Table.Cell>
        <Table.Cell style={{ width: 250 }}>
          <Skeleton containerClassName="flex-1" className="max-w-36 w-full" />
        </Table.Cell>
        <Table.Cell style={{ width: 200 }}>
          <Skeleton containerClassName="flex-1" className="max-w-20 w-full" />
        </Table.Cell>
        <Table.Cell style={{ width: 300 }}>
          <Skeleton containerClassName="flex-1" className="max-w-56 w-full" />
        </Table.Cell>
        <Table.Cell style={{ width: 300 }}>
          <Skeleton containerClassName="flex-1" className="max-w-44 w-full" />
        </Table.Cell>
        <Table.Cell style={{ width: 150 }}>
          <Skeleton containerClassName="flex-1" className="max-w-20 w-full" />
        </Table.Cell>
      </Table.Row>
    </SkeletonTheme>
  );
};
