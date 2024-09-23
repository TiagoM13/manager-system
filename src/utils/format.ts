export const formatCPF = (value: string): string => {
  const clearValue = value.replace(/[^\d]/g, '');

  return clearValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

export const formatPhone = (value: string): string => {
  value = value.replace(/\D/g, '');

  if (value.length <= 10) {
    return value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
  } else {
    return value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
  }
};
