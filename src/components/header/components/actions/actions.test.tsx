import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import { HeaderActions } from '.';

describe('<HeaderActions/>', () => {
  test('should render correctly component', () => {
    const { getByText, getByTestId, asFragment, container } = render(
      <HeaderActions />,
    );

    const btnCancel = container.querySelector('.bg-red-600');
    const btnEdit = container.querySelector('.bg-sky-600');
    const iconCheck = getByTestId('icon-check');

    expect(getByText('cancelar')).toBeInTheDocument();
    expect(getByText('salvar')).toBeInTheDocument();
    expect(btnCancel).toBeInTheDocument();
    expect(btnEdit).toBeInTheDocument();
    expect(iconCheck).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });

  test('should render loading icon', () => {
    const labels = {
      cancel: 'voltar',
      saved: 'prosseguir',
    };

    const { getByText, getByTestId } = render(
      <HeaderActions buttonLabels={labels} loading />,
    );

    const iconLoading = getByTestId('icon-loading');

    expect(getByText(labels.cancel)).toBeInTheDocument();
    expect(getByText(labels.saved)).toBeInTheDocument();
    expect(iconLoading).toBeInTheDocument();
  });

  test('should call the cancel function', () => {
    const handleOnCancel = jest.fn();

    const { getByTestId } = render(<HeaderActions onCancel={handleOnCancel} />);

    const button = getByTestId('btn-cancel');

    fireEvent.click(button);

    expect(handleOnCancel).toHaveBeenCalled();
  });
});
