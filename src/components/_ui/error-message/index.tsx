import React from 'react';

interface ErrorMessageProps {
  error?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  return !!error ? (
    <span className="mt-1 block text-sm text-red-500">{error}</span>
  ) : null;
};
