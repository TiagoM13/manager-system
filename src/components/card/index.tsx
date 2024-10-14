import React from 'react';

type CardProps = {
  children: React.ReactNode;
  title?: string;
  className?: string;
  bordered?: boolean;
};

export const Card: React.FC<CardProps> = ({
  className = '',
  bordered,
  title,
  children,
}) => {
  return (
    <div
      className={`${className} bg-white w-full max-w-full shadow-theme shadow-slate-400 py-6 px-4 rounded-2xl ${bordered ? 'border-t-[6px] border-sky-600' : ''}`}
    >
      <h2 className="text-lg text-sky-600 font-semibold">{title}</h2>
      {children}
    </div>
  );
};
