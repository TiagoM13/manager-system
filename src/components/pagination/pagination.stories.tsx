import React from 'react';

import { Meta } from '@storybook/react';
import { fn } from '@storybook/test';

import { Pagination as Paginate } from '.';

export default {
  title: 'Components/Pagination',
  component: Paginate.Actions,
  parameters: {
    layout: 'centered',
  },
} as Meta;

export const Pagination = () => {
  const data = Array.from({ length: 10 }).map(() => ({
    id: 1,
    name: 'João',
  }));

  return (
    <div className="flex gap-48">
      <Paginate.Label
        currentPageData={data}
        totalItems={data.length}
        paginationLabel={{ single: 'componente', several: 'componentes' }}
      />

      <Paginate.Actions
        goToFirstPage={fn()}
        goToLastPage={fn()}
        goToNextPage={fn()}
        goToPreviousPage={fn()}
        page={1}
        totalPages={2}
      />
    </div>
  );
};
