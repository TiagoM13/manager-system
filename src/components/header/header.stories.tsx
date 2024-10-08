import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Meta } from '@storybook/react';
import { fn } from '@storybook/test';

import { Header as HeaderComponent } from '.';

export default {
  title: 'Components/Header',
  component: HeaderComponent,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

export const Header = () => {
  return (
    <BrowserRouter>
      <div className="p-4 bg-slate-300">
        <HeaderComponent
          title="Cabeçalho"
          actionLabel="cadastrar novo post"
          onRegister={fn()}
        />
      </div>
    </BrowserRouter>
  );
};
