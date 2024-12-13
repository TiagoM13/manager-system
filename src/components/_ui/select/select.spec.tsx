import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';

import { Select } from '.'; // Ajuste o caminho conforme necessário

const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
];

const WrapperComponent = ({ defaultValue = '', isDisabled = false }: any) => {
  return (
    <Select
      label="Test Select"
      name="testSelect"
      options={options}
      placeholder="Selecione uma opção"
      disabled={isDisabled}
      defaultValue={defaultValue}
    />
  );
};

describe('<Select/>', () => {
  it('should render select component with correct label and options', () => {
    const { asFragment } = render(<WrapperComponent />);

    expect(screen.getByText('Test Select')).toBeInTheDocument();
    expect(screen.getByText('Selecione uma opção')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should display the options correctly when opened', () => {
    render(<WrapperComponent />);

    const selectInput = screen.getByRole('combobox');
    fireEvent.mouseDown(selectInput);

    options.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it('should select an option', () => {
    render(<WrapperComponent />);

    const selectInput = screen.getByRole('combobox');
    fireEvent.mouseDown(selectInput);

    const option = screen.getByText('Option 1');
    fireEvent.click(option);

    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('should disable the select when disabled prop is passed', () => {
    render(<WrapperComponent isDisabled={true} />);

    const selectInput = screen.getByRole('combobox');

    expect(selectInput).toBeDisabled();
  });
});
