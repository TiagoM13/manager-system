import React from 'react';

interface ErrorMessageProps {
  error?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  return !!error ? (
    <span className="block text-sm text-red-500 mt-1">{error}</span>
  ) : null;
};
