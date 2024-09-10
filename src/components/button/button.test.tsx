import React from 'react';
import '@testing-library/jest-dom';

import { render } from '@testing-library/react';

import { Button } from '.';

describe('<Button />', () => {
  test('should render correctly component', () => {
    const { getByText } = render(<Button />);

    expect(getByText('Salvar')).toBeTruthy();
  });

  test('should render correctly classNames', () => {
    const { getByTestId } = render(<Button id="teste" />);

    expect(getByTestId('btn-teste')).toHaveClass('bg-sky-600 hover:bg-sky-500');
  });

  test('should render correctly colors variables in the button', () => {
    const { asFragment, getByTestId, getByText } = render(
      <Button id="teste" variable="danger" label="Delete" />,
    );

    expect(getByTestId('btn-teste')).toHaveClass('bg-red-600 hover:bg-red-500');
    expect(getByText('Delete')).toBeTruthy();
    expect(asFragment()).toMatchSnapshot();
  });
});
