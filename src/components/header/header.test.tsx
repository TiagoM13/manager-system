import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import { Header } from '.';

describe('<Header />', () => {
  const title = 'Home';

  test('should render correctly component', () => {
    const { getByText, getByTestId } = render(
      <Header title={title} onRegister={jest.fn()} />,
    );

    const button = getByTestId('btn-header');

    expect(getByText(title)).toBeInTheDocument();
    expect(getByText('adicionar')).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('should render actions', () => {
    const goBackMock = jest.fn();
    const label = 'salvar';
    const subtitle = 'Teste';

    const { getByText, getByTestId } = render(
      <Header
        title={title}
        subtitle={subtitle}
        goBack={goBackMock}
        isSubmit
        actionLabel={label}
      />,
    );

    const button = getByTestId('btn-cancel');

    expect(getByText(title)).toBeInTheDocument();
    expect(getByText(subtitle)).toBeInTheDocument();
    expect(getByText(label)).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(goBackMock).toHaveBeenCalled();
  });
});
