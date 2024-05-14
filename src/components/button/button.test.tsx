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

  test('should render correctly new classNames', () => {
    const { getByTestId } = render(
      <Button id="teste" classNames="shadow shadow-slate-600/50" />,
    );

    expect(getByTestId('btn-teste')).toHaveClass('shadow shadow-slate-600/50');
  });
});
