import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import { Dialog } from '.';

describe('<Dialog/>', () => {
  const title = 'Titulo do Dialog';

  test('should render correctly component', () => {
    const { getByText, asFragment } = render(
      <Dialog title={title} isOpen onClose={jest.fn()}>
        <div>conteudo</div>
      </Dialog>,
    );

    expect(getByText(title)).toBeInTheDocument();
    expect(getByText('conteudo')).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });

  test('should not render component', () => {
    const { container } = render(
      <Dialog isOpen={false} onClose={jest.fn()}>
        <div>conteudo</div>
      </Dialog>,
    );

    expect(container.firstChild).toBeNull();
  });

  test('should cllck close dialog', () => {
    let isOpen = true;

    const handleOnClose = jest.fn();

    const { getByText, getByTestId, queryByText } = render(
      <Dialog title={title} isOpen={isOpen} onClose={handleOnClose}>
        <div>conteudo</div>
      </Dialog>,
    );

    expect(getByText(title)).toBeInTheDocument();
    expect(getByText('conteudo')).toBeInTheDocument();

    fireEvent.click(getByTestId('btn-close-dialog'));

    expect(handleOnClose).toHaveBeenCalledTimes(1);

    isOpen = false;

    expect(queryByText('conteúdo')).not.toBeInTheDocument();
  });
});
