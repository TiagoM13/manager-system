import React from 'react';

import { render } from '@testing-library/react';

import { Pagination } from '.';

describe('<Pagination />', () => {
  test('should render correctly component', () => {
    const { getByText, getByTestId } = render(
      <div>
        <Pagination.Label currentPageData={[]} totalItems={0} />
        <Pagination.Actions
          page={0}
          totalPages={0}
          goToNextPage={jest.fn()}
          goToPreviousPage={jest.fn()}
          goToLastPage={jest.fn()}
          goToFirstPage={jest.fn()}
        />
      </div>,
    );

    expect(getByText('Não há resultados para exibir')).toBeTruthy();
    expect(getByTestId('btn-actions')).toBeTruthy();
    expect(getByTestId('btn-actions')).toHaveClass('flex gap-1.5');
  });

  test('should render correctly pagination label', () => {
    const currenteData = [1, 2, 3, 5, 5];
    const totalItems = 10;

    const { getByText } = render(
      <div>
        <Pagination.Label
          currentPageData={currenteData}
          totalItems={totalItems}
        />
        <Pagination.Actions
          page={1}
          totalPages={2}
          goToNextPage={jest.fn()}
          goToPreviousPage={jest.fn()}
          goToLastPage={jest.fn()}
          goToFirstPage={jest.fn()}
        />
      </div>,
    );

    expect(getByText('Mostrando 5 de 10 items')).toBeTruthy();
    expect(getByText('Página 1 de 2')).toBeTruthy();
  });
});
