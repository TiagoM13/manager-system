export const formatCPF = (value: string): string => {
  const clearValue = value.replace(/[^\d]/g, '');

  return clearValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};
