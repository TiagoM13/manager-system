import React from 'react';
import { Link } from 'react-router-dom';

import { HeaderProps } from '../../interfaces';

import { BreadcrumbContainer } from '../../styles';

export const Breadcrumb: React.FC<HeaderProps> = ({ breadcrumbItems }) => {
  return (
    <BreadcrumbContainer>
      {breadcrumbItems?.map((item, index) => (
        <div className="flex items-center" key={index}>
          {item.path ? (
            <div className="flex items-center gap-2">
              <Link to={item.path}>
                <div>{item.icon}</div>
                {item.label}
              </Link>
              &gt;
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div>{item.icon}</div>
              <span className="leading-5 text-slate-600">{item.label}</span>
            </div>
          )}
        </div>
      ))}
    </BreadcrumbContainer>
  );
};
