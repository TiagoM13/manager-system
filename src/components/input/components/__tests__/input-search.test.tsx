import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import { InputSearch } from '../input-search';

describe('<InputSearch/>', () => {
  test('should render correctly component', () => {
    const placeholder = 'Pesquisar aqui';

    const { getByPlaceholderText, getByTestId } = render(
      <InputSearch name="teste" placeholder={placeholder} />,
    );

    expect(getByTestId('icon-search')).toBeInTheDocument();
    expect(getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  test('should change the input search', () => {
    const placeholder = 'Pesquisar aqui';

    const handleChange = jest.fn();

    const { getByPlaceholderText, asFragment } = render(
      <InputSearch
        name="teste"
        placeholder={placeholder}
        onChange={handleChange}
      />,
    );

    const input = getByPlaceholderText(placeholder) as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'Teste' } });

    expect(input.value).toBe('Teste');
    expect(handleChange).toHaveBeenCalled();

    expect(asFragment()).toMatchSnapshot();
  });
});
