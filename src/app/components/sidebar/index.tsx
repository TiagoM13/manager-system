import { NavLink } from "react-router-dom";
import {
  Icon,
  ChartBar,
  SignOut,
  User,
  Users,
  UsersThree
} from "@phosphor-icons/react";

import { UserProfile } from "../user";

export const Sidebar = () => {
  return (
    <div className="h-screen bg-black p-4 w-screen max-w-[220px]">
      <div className="p-2">
        <UserProfile />
      </div>

      <div className="mt-4 p-2 space-y-6">
        <Link title="Dashboard" icon={ChartBar} url="/" />
        <Link title="Perfil" icon={User} url="/profile" />
        <Link title="Usuários" icon={Users} url="/users" />
        <Link title="Pacientes" icon={UsersThree} url="/patients" />
      </div>

      <button className="flex gap-2 text-zinc-400 ml-5 hover:text-zinc-200 transition absolute bottom-12">
        <SignOut className="size-5" />
        Sair
      </button>
    </div>
  );
}

type LinkProps = {
  title: string
  url: string
  icon: Icon
}

const Link = ({ title, icon: Icon, url }: LinkProps) => {
  return (
    <NavLink to={url} className={
      (({ isActive }) => isActive ?
        "text-zinc-200 font-medium flex items-center gap-3 ml-3"
        : "text-zinc-400 flex items-center gap-3 ml-3")}
    >
      <Icon className="size-5" weight="regular" />
      {title}
    </NavLink >
  )
}

