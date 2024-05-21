import React from 'react';
import { NavLink } from 'react-router-dom';

import { ArrowLeft, Icon, SignOut } from '@phosphor-icons/react';

import { user } from '@/__mocks__';
import { menus } from '@/utils';

import { UserProfile } from '../user-profile';

export const Sidebar = () => {
  const [activeSideBar, setActiveSideBar] = React.useState(false);

  const handleToggleSideBar = React.useCallback(() => {
    setActiveSideBar(!activeSideBar);
  }, [activeSideBar]);

  return (
    <div
      className={`h-screen relative bg-black p-4 transition-all duration-500 ease-in-out ${activeSideBar ? 'w-[75px]' : 'w-[260px]'}`}
    >
      <div className="ml-1 p-2">
        <UserProfile
          activeSideBar={activeSideBar}
          color="light"
          name={user.name}
          email={user.email}
          imageUrl={user.image_url}
          small
        />

        <div className="mt-12 space-y-6">
          {menus.map((menu, index) => (
            <Link
              activeSideBar={activeSideBar}
              key={`${menu.title}-${index}`}
              title={menu.title}
              icon={menu.icon}
              url={menu.url}
            />
          ))}
        </div>

        <button className="flex gap-2 text-sm text-zinc-400 hover:text-sky-500 transition absolute bottom-8">
          <SignOut className="size-5" />
          <span
            className={`transition-all duration-500 ease-in-out ${activeSideBar ? 'opacity-0' : 'opacity-1'}`}
          >
            Sair
          </span>
        </button>
      </div>

      <button
        onClick={handleToggleSideBar}
        className="bg-black flex gap-2 text-sm text-zinc-400 transition-all duration-500 absolute bottom-16 -right-3 rounded-md p-2 shadow-sm shadow-slate-400 hover:text-sky-500 hover:shadow-sky-500"
      >
        <ArrowLeft
          className={`size-5 transition-transform duration-500 ${activeSideBar ? 'rotate-180' : ''}`}
        />
      </button>
    </div>
  );
};

type LinkProps = {
  title: string;
  url: string;
  icon: Icon;
  activeSideBar: boolean;
};

const Link = ({ title, icon: Icon, url, activeSideBar }: LinkProps) => {
  return (
    <NavLink
      to={url}
      className={({ isActive }) =>
        isActive
          ? 'text-sky-600 text-sm text-wrap font-medium flex items-center gap-4'
          : 'text-zinc-400 text-sm text-wrap flex items-center gap-4 transition-all duration-500 ease-in-out hover:text-sky-500'
      }
    >
      <div className="flex flex-wrap">
        <Icon className="size-5" weight="regular" />
      </div>
      <span
        className={`overflow-hidden transition-opacity duration-500 ${activeSideBar ? 'opacity-0' : 'opacity-1'}`}
      >
        {title}
      </span>
    </NavLink>
  );
};
