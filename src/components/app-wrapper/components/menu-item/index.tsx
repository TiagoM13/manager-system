import { NavLink } from 'react-router-dom';

import { Icon } from '@phosphor-icons/react';

import { useMenu } from '@/store';

type MenuItemProps = {
  title: string;
  url: string;
  icon: Icon;
};

export const MenuItem = ({ title, icon: Icon, url }: MenuItemProps) => {
  const { toggleMenu } = useMenu();

  return (
    <NavLink
      onClick={() => toggleMenu(false)}
      id="link-menu"
      to={url}
      className={({ isActive }) =>
        isActive
          ? 'flex items-center gap-4 text-wrap text-sm font-medium text-sky-600'
          : 'flex items-center gap-4 text-wrap text-sm text-zinc-400 transition-all duration-500 ease-in-out hover:text-sky-500'
      }
    >
      <div className="flex flex-wrap">
        <Icon className="size-5" weight="regular" />
      </div>
      <span className={`overflow-hidden transition-opacity duration-500`}>
        {title}
      </span>
    </NavLink>
  );
};
