import React from 'react';

import { Meta } from '@storybook/react';

import { TextTitle } from '.';

export default {
  title: 'Components/Text',
  component: TextTitle,
  args: {
    children: 'Trabalhar',
  },
} as Meta;

export const Text = () => {
  return <TextTitle>Titulo</TextTitle>;
};
