import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Meta } from '@storybook/react';

import { AppWrapper } from '.';

export default {
  title: 'Components/AppWrapper',
  component: AppWrapper,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

export const SideBar = () => {
  return (
    <BrowserRouter>
      <AppWrapper>
        <div>content</div>
      </AppWrapper>
    </BrowserRouter>
  );
};
