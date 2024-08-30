import React from 'react';

import { useDialog } from '@/store';
import { fireEvent, render } from '@testing-library/react';

import { ConfirmDialog } from '.';

jest.mock('@/store', () => ({
  useDialog: jest.fn(),
}));

describe('>ConfirmDialog/>', () => {
  const mockCloseDialog = jest.fn();
  const mockAccept = jest.fn();

  const defaultConfig = {
    header: 'Confirmação',
    message: 'Você tem certeza?',
    acceptLabel: 'Sim',
    rejectLabel: 'Não',
    accept: mockAccept,
    rejectBtnColor: 'secondary',
    acceptBtnColor: 'danger',
    acceptIcon: null,
    rejectIcon: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (useDialog as unknown as jest.Mock).mockReturnValue({
      isOpenDialog: true,
      closeDialog: mockCloseDialog,
      config: defaultConfig,
    });
  });

  test('should render correctly component', () => {
    const { getByText, getByRole, asFragment } = render(<ConfirmDialog />);

    expect(getByText('Confirmação')).toBeInTheDocument();
    expect(getByText('Você tem certeza?')).toBeInTheDocument();
    expect(getByText('Sim')).toBeInTheDocument();
    expect(getByText('Não')).toBeInTheDocument();

    expect(getByRole('button', { name: /sim/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /não/i })).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });

  test('should trigger accept function and close dialog when clicking "Sim"', () => {
    const { getByRole } = render(<ConfirmDialog />);

    fireEvent.click(getByRole('button', { name: /sim/i }));

    expect(mockAccept).toHaveBeenCalled();
    expect(mockCloseDialog).toHaveBeenCalled();
  });

  test('should close dialog when clicking "Não"', () => {
    const { getByRole } = render(<ConfirmDialog />);

    fireEvent.click(getByRole('button', { name: /não/i }));

    expect(mockCloseDialog).toHaveBeenCalled();
    expect(mockAccept).not.toHaveBeenCalled();
  });
});
