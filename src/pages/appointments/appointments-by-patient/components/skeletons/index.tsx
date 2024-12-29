import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { Button, StatusActionIcon, Table } from '@/components/_ui';
import { AppointmentStatus } from '@/enums';

export const SkeletonTableAppintmentsByPatient: React.FC = () => {
  return (
    <SkeletonTheme baseColor="var(--sky-100)" highlightColor="var(--sky-200)">
      <Table.Row>
        <Table.Cell style={{ width: 400 }}>
          <Skeleton containerClassName="flex-1" className="w-full max-w-36" />
        </Table.Cell>
        <Table.Cell style={{ width: 200 }}>
          <Skeleton containerClassName="flex-1" className="w-full max-w-20" />
        </Table.Cell>
        <Table.Cell style={{ width: 600 }}>
          <Skeleton containerClassName="flex-1" className="w-full max-w-64" />
        </Table.Cell>
        <Table.Cell style={{ width: 350 }}>
          <Skeleton containerClassName="flex-1" className="w-full max-w-44" />
        </Table.Cell>
        <Table.Cell style={{ width: 350 }}>
          <Skeleton containerClassName="flex-1" className="w-full max-w-32" />
        </Table.Cell>
        <Table.Cell style={{ width: 300 }} className="w-full max-w-24">
          <Table.Cell style={{ width: 50 }}>
            <Button
              clear
              icon={<StatusActionIcon status={AppointmentStatus.PENDING} />}
              className="p-1.5"
              disabled
            />
          </Table.Cell>
        </Table.Cell>
      </Table.Row>
    </SkeletonTheme>
  );
};
