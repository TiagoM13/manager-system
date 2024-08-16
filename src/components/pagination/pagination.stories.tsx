import React from 'react';

import { Meta } from '@storybook/react';

import { Pagination as Paginate } from '.';

export default {
  title: 'Components/Pagination',
  component: Paginate.Actions,
  parameters: {
    layout: 'centered',
  },
} as Meta;

export const Pagination = () => {
  return (
    <div className="flex gap-48">
      <Paginate.Label
        currentPageData={10}
        totalItems={20}
        paginationLabel={{ single: 'componente', several: 'componentes' }}
      />

      <Paginate.Actions totalPages={2} />
    </div>
  );
};
