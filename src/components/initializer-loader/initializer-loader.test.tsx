import React from 'react';

import { render } from '@testing-library/react';

import { InitializerLoader } from '.';

describe('<InitializerLoader/>', () => {
  test('should render correctly component', () => {
    const { getByText, getByTestId, asFragment } = render(
      <InitializerLoader />,
    );

    const icon = getByTestId('icon-loader');

    expect(icon).toBeInTheDocument();
    expect(getByText('Carregando...')).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });
});
