import React from 'react';

import { Meta } from '@storybook/react';

import { InputSearch as Search } from '../input-search';

export default {
  title: 'Components/InputSearch',
  component: Search,
  parameters: {
    layout: 'centered',
  },
} as Meta;

export const InputSearch = () => {
  return <Search placeholder="pesquisar..." />;
};
