export const formatCPF = (value: string): string => {
  const clearValue = value.replace(/[^\d]/g, '');

  return clearValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

export const formatPhone = (value: string): string => {
  const clearValue = value.replace(/[^\d]/g, '');

  if (clearValue.length <= 10) {
    return clearValue.replace(/(\d{2})(\d{4})(\d{0,4})/, (_, p1, p2, p3) =>
      p3 ? `(${p1}) ${p2}-${p3}` : `(${p1}) ${p2}`,
    );
  }

  return clearValue.replace(/(\d{2})(\d{5})(\d{0,4})/, (_, p1, p2, p3) =>
    p3 ? `(${p1}) ${p2}-${p3}` : `(${p1}) ${p2}`,
  );
};
