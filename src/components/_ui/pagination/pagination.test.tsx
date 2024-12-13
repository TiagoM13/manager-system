import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { render } from '@testing-library/react';

import { Pagination } from '.';

describe('<Pagination />', () => {
  test('should render correctly component', () => {
    const { getByText, getByTestId } = render(
      <BrowserRouter>
        <Pagination.Label currentPageData={0} totalItems={0} />
        <Pagination.Actions totalPages={0} />
      </BrowserRouter>,
    );

    expect(getByText('Não há resultados para exibir')).toBeTruthy();
    expect(getByTestId('btn-actions')).toBeTruthy();
    expect(getByTestId('btn-actions')).toHaveClass('flex gap-1.5');
  });

  test('should render correctly pagination label', () => {
    const totalItems = 30;
    const currentPageData = 10;
    const totalPages = 3;

    const { asFragment, getByText } = render(
      <BrowserRouter>
        <Pagination.Label
          currentPageData={currentPageData}
          totalItems={totalItems}
        />
        <Pagination.Actions totalPages={totalPages} />
      </BrowserRouter>,
    );

    expect(
      getByText(`Mostrando ${currentPageData} de ${totalItems} items`),
    ).toBeTruthy();
    expect(getByText(`Página 1 de ${totalPages}`)).toBeTruthy();
    expect(asFragment()).toMatchSnapshot();
  });
});
