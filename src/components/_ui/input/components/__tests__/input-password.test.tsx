import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import { InputPassword } from '../input-password';

describe('<InputPassword/>', () => {
  const label = 'Sua senha';
  const placeholder = 'Escreva sua senha';

  test('should render correctly component', () => {
    const {
      getByText,
      getByTestId,
      getByPlaceholderText,
      container,
      asFragment,
    } = render(
      <InputPassword
        name="password"
        label={label}
        placeholder={placeholder}
        required
      />,
    );

    const iconEye = getByTestId('icon-eye');
    const element = container.querySelector('.text-red-500');

    expect(getByText(label)).toBeInTheDocument();
    expect(getByPlaceholderText(placeholder)).toBeInTheDocument();
    expect(element).toBeInTheDocument();
    expect(iconEye).toBeTruthy();

    expect(asFragment()).toMatchSnapshot();
  });

  test('should change password input icon', () => {
    const { getByTestId, getByPlaceholderText } = render(
      <InputPassword name="password" placeholder={placeholder} />,
    );

    const input = getByPlaceholderText(placeholder) as HTMLInputElement;
    const iconEye = getByTestId('icon-eye');

    expect(iconEye).toBeTruthy();
    expect(input.type).toBe('text');

    const button = getByTestId('icon-button');

    fireEvent.click(button);

    const iconEyeSlash = getByTestId('icon-eye-slash');

    expect(iconEyeSlash).toBeTruthy();
    expect(iconEye).not.toBeInTheDocument();
    expect(input.type).toBe('password');
  });
});
