import React from 'react';

import { render } from '@testing-library/react';

import { ButtonAction } from '.';

describe('<ButtonAction/>', () => {
  test('should render register button', () => {
    const handleRegisterMock = jest.fn();

    const { getByText, asFragment } = render(
      <ButtonAction onRegister={handleRegisterMock} />,
    );

    expect(getByText('adicionar')).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });

  test('should render submit button', () => {
    const label = 'adicionar';
    const { getByTestId } = render(
      <ButtonAction isSubmit actionLabel={label} />,
    );

    const button = getByTestId('btn-submit');
    const icon = getByTestId('icon-check');

    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });

  test('should render loading icon', () => {
    const label = 'prosseguir';

    const { getByText, getByTestId } = render(
      <ButtonAction loading actionLabel={label} isSubmit />,
    );

    const iconLoading = getByTestId('icon-loading');

    expect(getByText(label)).toBeInTheDocument();
    expect(iconLoading).toBeInTheDocument();
  });
});
