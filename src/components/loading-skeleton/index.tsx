import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { PencilSimple, Trash } from '@phosphor-icons/react';

import { Card, Text } from '@/pages/users/components/user-item/styles';

import { Button } from '../button';
import { ButtonActions } from '../button-actions';
import { Table } from '../table';

type LoadingSkeletonProps = {
  count?: number;
  className?: string;
  baseColor?: string;
  highlightColor?: string;
};

export const TableLoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  baseColor = 'var(--sky-100)',
  highlightColor = 'var(--sky-200)',
}) => {
  return (
    <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
      <Table.Row style={{ height: 73 }}>
        <Table.Cell style={{ maxWidth: 220 }}>
          <div className="flex items-center gap-4">
            <Skeleton className={'w-[45px] h-[45px] rounded-full'} />
            <div className="w-32">
              <Skeleton className={'max-w-28 w-full h-3'} />
              <Skeleton className={'max-w-36 w-full h-3'} />
            </div>
          </div>
        </Table.Cell>
        <Table.Cell>
          <Skeleton className={'max-w-36 w-full h-4'} />
        </Table.Cell>
        <Table.Cell>
          <Skeleton className={'max-w-36 w-full h-4'} />
        </Table.Cell>
        <Table.Cell>
          <Skeleton className={'max-w-32 w-full h-4'} />
        </Table.Cell>
        <Table.Cell>
          <Skeleton className={'max-w-32 w-full h-4'} />
        </Table.Cell>
        <Table.Cell style={{ width: 50 }}>
          <ButtonActions
            onEdit={() => console.log()}
            onDelete={() => console.log()}
            disabled
          />
        </Table.Cell>
      </Table.Row>
    </SkeletonTheme>
  );
};

export const CardLoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  baseColor = 'var(--sky-100)',
  highlightColor = 'var(--sky-200)',
}) => {
  return (
    <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
      <Card>
        <div className="max-w-[300px] space-y-2 w-full">
          <Text>
            <strong>Nome:</strong>
            <Skeleton
              containerClassName="flex-1"
              className="max-w-32 w-full h-4"
            />
          </Text>
          <Text>
            <strong>Email:</strong>
            <Skeleton
              containerClassName="flex-1"
              className="max-w-52 w-full h-4"
            />
          </Text>
          <Text>
            <strong>Tipo de usuário:</strong>
            <Skeleton
              containerClassName="flex-1"
              className="max-w-28 w-full h-4"
            />
          </Text>
          <Text>
            <strong>Data de registro:</strong>
            <Skeleton
              containerClassName="flex-1"
              className="max-w-24 w-full h-4"
            />
          </Text>
          <Text>
            <strong>Status:</strong>
            <Skeleton
              containerClassName="flex-1"
              className="max-w-14 w-full h-4"
            />
          </Text>
          <Text>
            <strong>Último acesso:</strong>
            <Skeleton
              containerClassName="flex-1"
              className="max-w-32 w-full h-4"
            />
          </Text>
        </div>

        <div className="flex flex-col gap-4">
          <Button
            disabled
            label="editar"
            variable="primary"
            icon={<PencilSimple className="size-4" weight="bold" />}
          />
          <Button
            disabled
            label="deletar"
            variable="danger"
            icon={<Trash className="size-4" weight="bold" />}
          />
        </div>
      </Card>
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
