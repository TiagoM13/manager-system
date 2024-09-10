import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { House, Users } from '@phosphor-icons/react';

import { render } from '@testing-library/react';

import { Breadcrumb } from '.';

describe('<Breadcrumb/>', () => {
  const breadcrumb = [
    {
      label: 'Início',
      path: '/',
      icon: <House data-testid="icon-home" className="size-4" />,
    },
    {
      label: 'Usuários',
      path: '/users',
      icon: <Users data-testid="icon-users" className="size-4" />,
    },
  ];

  test('should render correctly component', () => {
    const { getByText, getByTestId, asFragment } = render(
      <BrowserRouter>
        <Breadcrumb pathItems={breadcrumb} />
      </BrowserRouter>,
    );

    const iconHome = getByTestId('icon-home');
    const iconUsers = getByTestId('icon-users');

    expect(getByText('Início')).toBeInTheDocument();
    expect(getByText('Usuários')).toBeInTheDocument();
    expect(iconHome).toBeInTheDocument();
    expect(iconUsers).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });
});
