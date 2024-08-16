import React from 'react';

interface FormContainerProps extends React.ComponentProps<'form'> {}

export const FormContainer = ({ ...props }: FormContainerProps) => {
  return <form className="w-full" {...props} />;
};
