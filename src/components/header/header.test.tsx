import React from 'react';

import { render } from '@testing-library/react';

import { Header } from '.';

describe('<Header />', () => {
  const title = 'Home';

  test('should render correctly component', () => {
    const { getByText, getByTestId } = render(<Header title={title} />);

    const button = getByTestId('btn-header');

    expect(getByText(title)).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('should render actions', () => {
    const { getByText, queryByText } = render(
      <Header title={title} hasRegister={false} hasActions />,
    );

    const button = queryByText('Cadastrar');

    expect(getByText(title)).toBeInTheDocument();
    expect(getByText('cancelar')).toBeInTheDocument();
    expect(getByText('salvar')).toBeInTheDocument();
    expect(button).not.toBeInTheDocument();
  });
});
