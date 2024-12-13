import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { Button, StatusActionIcon, Table } from '@/components/_ui';
import { AppointmentStatus } from '@/enums';

export const SkeletonTableAppintments: React.FC = () => {
  return (
    <SkeletonTheme baseColor="var(--sky-100)" highlightColor="var(--sky-200)">
      <Table.Row>
        <Table.Cell style={{ width: 240 }}>
          <div className="flex items-center gap-4">
            <div className="w-48">
              <Skeleton
                containerClassName="flex-1"
                className="w-full max-w-48"
              />
            </div>
          </div>
        </Table.Cell>
        <Table.Cell style={{ width: 250 }}>
          <Skeleton containerClassName="flex-1" className="w-full max-w-36" />
        </Table.Cell>
        <Table.Cell style={{ width: 200 }}>
          <Skeleton containerClassName="flex-1" className="w-full max-w-20" />
        </Table.Cell>
        <Table.Cell style={{ width: 300 }}>
          <Skeleton containerClassName="flex-1" className="w-full max-w-56" />
        </Table.Cell>
        <Table.Cell style={{ width: 300 }}>
          <Skeleton containerClassName="flex-1" className="w-full max-w-44" />
        </Table.Cell>
        <Table.Cell style={{ width: 150 }}>
          <Skeleton containerClassName="flex-1" className="w-full max-w-20" />
        </Table.Cell>
        <Table.Cell>
          <Button
            clear
            icon={<StatusActionIcon status={AppointmentStatus.PENDING} />}
            className="p-1.5"
            disabled
          />
        </Table.Cell>
      </Table.Row>
    </SkeletonTheme>
  );
};
