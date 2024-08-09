import { ChartBar, Icon, Users, UsersThree } from '@phosphor-icons/react';

type Menus = {
  title: string;
  url: string;
  icon: Icon;
};

export const menus: Menus[] = [
  {
    title: 'Dashoboard',
    url: '/dashboard',
    icon: ChartBar,
  },
  {
    title: 'Usuários',
    url: '/users',
    icon: Users,
  },
  {
    title: 'Pacientes',
    url: '/patients',
    icon: UsersThree,
  },
];
