import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import { Input } from '../input';

describe('<Input/>', () => {
  test('should render correctly component', () => {
    const label = 'Input Teste';
    const placeholder = 'Escreva algo';

    const { getByText, getByPlaceholderText } = render(
      <Input label={label} name="teste" placeholder={placeholder} />,
    );

    expect(getByText(label)).toBeInTheDocument();
    expect(getByPlaceholderText(placeholder)).toBeTruthy();
  });

  test('should change the input value', () => {
    const label = 'Input Teste';
    const placeholder = 'Escreva algo';

    const handleChange = jest.fn();

    const { getByPlaceholderText, asFragment } = render(
      <Input
        label={label}
        name="teste"
        placeholder={placeholder}
        onChange={handleChange}
      />,
    );

    const input = getByPlaceholderText(placeholder) as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'valor' } });

    expect(input.value).toBe('valor');

    fireEvent.change(input, { target: { value: 'Novo valor' } });

    expect(input.value).toBe('Novo valor');
    expect(handleChange).toHaveBeenCalled();

    expect(asFragment()).toMatchSnapshot();
  });
});
