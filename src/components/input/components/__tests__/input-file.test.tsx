import React from 'react';
import '@testing-library/jest-dom';

import { fireEvent, render } from '@testing-library/react';

import { FileUploadInput } from '../input-file';

describe('<FileUploadInput/>', () => {
  test('should render currectly component', () => {
    const { getByText, getByTestId } = render(
      <FileUploadInput name="fileUpload" onChangeFileSelected={jest.fn()} />,
    );

    const icon = getByTestId('upload-icon');

    expect(getByText(/Escolher foto/i)).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });

  test('should disable the buton when loading', () => {
    const { container } = render(
      <FileUploadInput
        name="fileUpload"
        onChangeFileSelected={jest.fn()}
        loading
      />,
    );

    const element = container.querySelector('.animate-spin');
    expect(element).toBeInTheDocument();
  });

  test('should call onChangeFileSelected when a file is selected', () => {
    const mockOnChangeFileSelected = jest.fn();

    const { asFragment, getByLabelText } = render(
      <FileUploadInput
        name="fileUpload"
        onChangeFileSelected={mockOnChangeFileSelected}
      />,
    );

    const inputElement = getByLabelText(/escolher foto/i);

    fireEvent.change(inputElement, {
      target: {
        file: [new File(['file'], 'test-file.jpg', { type: 'image/jpeg' })],
      },
    });

    expect(mockOnChangeFileSelected).toHaveBeenCalledTimes(1);
    expect(asFragment()).toMatchSnapshot();
  });
});
