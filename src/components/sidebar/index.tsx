import React from 'react';
import { NavLink } from 'react-router-dom';

import { Icon, SignOut } from '@phosphor-icons/react';

import { user } from '@/__mocks__';
import { menus } from '@/utils';

import { UserProfile } from '../user-profile';

export const Sidebar = () => {
  return (
    <div className="h-screen bg-black p-4 w-full max-w-[260px]">
      <div className="ml-2 p-2">
        <UserProfile
          color="light"
          name={user.name}
          email={user.email}
          imageUrl={user.image_url}
        />

        <div className="mt-12 space-y-6">
          {menus.map((menu, index) => (
            <Link
              key={`${menu.title}-${index}`}
              title={menu.title}
              icon={menu.icon}
              url={menu.url}
            />
          ))}
        </div>

        <button className="flex gap-2 text-sm text-zinc-400 hover:text-sky-500 transition absolute bottom-8">
          <SignOut className="size-5" />
          Sair
        </button>
      </div>
    </div>
  );
};

type LinkProps = {
  title: string;
  url: string;
  icon: Icon;
};

const Link = ({ title, icon: Icon, url }: LinkProps) => {
  return (
    <NavLink
      to={url}
      className={({ isActive }) =>
        isActive
          ? 'text-sky-600 text-sm font-medium flex items-center gap-3'
          : 'text-zinc-400 text-sm flex hover:text-sky-500 items-center gap-3 transition ease-in text-wrap'
      }
    >
      <div className="flex flex-wrap">
        <Icon className="size-5" weight="regular" />
      </div>
      {title}
    </NavLink>
  );
};
