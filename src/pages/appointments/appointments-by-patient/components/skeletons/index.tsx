import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { PencilSimple } from '@phosphor-icons/react';

import { Button, Table } from '@/components';

export const SkeletonTableAppintmentsByPatient: React.FC = () => {
  return (
    <SkeletonTheme baseColor="var(--sky-100)" highlightColor="var(--sky-200)">
      <Table.Row>
        <Table.Cell style={{ width: 250 }}>
          <Skeleton containerClassName="flex-1" className="max-w-36 w-full" />
        </Table.Cell>
        <Table.Cell style={{ width: 200 }}>
          <Skeleton containerClassName="flex-1" className="max-w-20 w-full" />
        </Table.Cell>
        <Table.Cell style={{ width: 350 }}>
          <Skeleton containerClassName="flex-1" className="max-w-44 w-full" />
        </Table.Cell>
        <Table.Cell style={{ width: 300 }}>
          <Skeleton containerClassName="flex-1" className="max-w-40 w-full" />
        </Table.Cell>
        <Table.Cell style={{ width: 300 }}>
          <Skeleton containerClassName="flex-1" className="max-w-32 w-full" />
        </Table.Cell>
        <Table.Cell style={{ width: 300 }} className="max-w-24 w-full">
          <Table.Cell>
            <Button
              clear
              icon={
                <PencilSimple className="size-4 text-sky-600" weight="bold" />
              }
              className="p-1.5"
              disabled
            />
          </Table.Cell>
        </Table.Cell>
      </Table.Row>
    </SkeletonTheme>
  );
};
