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

    const { getByText, getByTestId } = render(
      <Header title={title} goBack={goBackMock} isSubmit actionLabel={label} />,
    );

    const button = getByTestId('btn-cancel');

    expect(getByText(title)).toBeInTheDocument();
    expect(getByText(label)).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(goBackMock).toHaveBeenCalled();
  });
});
