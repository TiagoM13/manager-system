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
      className={`${className} w-full max-w-full rounded-2xl bg-white px-4 py-6 shadow-theme shadow-slate-400 ${bordered ? 'border-t-[6px] border-sky-600' : ''}`}
    >
      <h2 className="text-lg font-semibold text-sky-600">{title}</h2>
      {children}
    </div>
  );
};
