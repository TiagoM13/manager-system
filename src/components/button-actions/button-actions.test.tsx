import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import { ButtonActions, ButtonActionsProps } from '.';

describe('<ButtonActions/>', () => {
  const onEditMock = jest.fn();
  const onDeleteMock = jest.fn();

  const renderComponent = (props: Partial<ButtonActionsProps> = {}) => {
    return render(
      <ButtonActions onEdit={onEditMock} onDelete={onDeleteMock} {...props} />,
    );
  };

  test('should render correctly component', () => {
    const { getByTestId, queryByText, container, asFragment } =
      renderComponent();

    expect(getByTestId('icon-btn')).toBeInTheDocument();

    const button = getByTestId('btn-actions');
    fireEvent.click(button);

    expect(container.querySelector('.hidden')).not.toBeInTheDocument();
    expect(queryByText('Editar')).toBeInTheDocument();
    expect(queryByText('Deletar')).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });

  test('should display the options menu when the button is clicked', () => {
    const { getByText, getByTestId, container } = renderComponent();

    fireEvent.click(getByTestId('btn-actions'));

    expect(container.querySelector('.block')).toBeInTheDocument();

    expect(getByText('Editar')).toBeInTheDocument();
    expect(getByText('Deletar')).toBeInTheDocument();
  });

  test('should call onEdit when the edit button is clicked', () => {
    const { getByTestId, getByText, container } = renderComponent();

    fireEvent.click(getByTestId('btn-actions'));

    fireEvent.click(getByText('Editar'));

    expect(container.querySelector('.hidden')).toBeInTheDocument();
    expect(onEditMock).toHaveBeenCalledTimes(1);
  });

  test('should call onDelete when the delete button is clicked', () => {
    const { getByTestId, getByText, container } = renderComponent();

    fireEvent.click(getByTestId('btn-actions'));

    fireEvent.click(getByText('Deletar'));

    expect(container.querySelector('.hidden')).toBeInTheDocument();
    expect(onDeleteMock).toHaveBeenCalledTimes(1);
  });

  test('should close the menu when clicking outside of the component', () => {
    const { getByTestId, container } = renderComponent();

    fireEvent.click(getByTestId('btn-actions'));

    fireEvent.mouseDown(document);

    expect(container.querySelector('.hidden')).toBeInTheDocument();
  });
});
