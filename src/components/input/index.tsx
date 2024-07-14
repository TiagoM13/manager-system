import React from 'react';

interface InputProps extends React.ComponentProps<'input'> {
  label?: string;
  required?: boolean;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  required = false,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      <label htmlFor={props.name} className="block text-sm text-slate-600 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        {...props}
        className={`${className} w-full rounded-md border border-slate-400 py-2 px-4 outline-sky-500 text-sm text-slate-600`}
      />
    </div>
  );
};
