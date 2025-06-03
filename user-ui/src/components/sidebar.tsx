import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

export const Sidebar = (...props: React.ReactNode[]) => {
  return <aside>{...props}</aside>;
};

export const SidebarHeader = (header: string) => {
  return (
    <div>
      <span>{header}</span>
    </div>
  );
};

export const SidebarNav = (...props: React.ReactNode[]) => {
  return (
    <nav>
      <ul>{...props}</ul>
    </nav>
  );
};

interface SidebarNavItemProps {
  path: string;
  icon?: LucideIcon;
  text: string;
  isActive: boolean;
  children?: React.ReactNode;
}

export const SidebarNavItem = ({
  path,
  icon: Icon,
  text,
  children,
  ...rest
}: SidebarNavItemProps) => {
  return (
    <li>
      <NavLink
        to={path}
        className={({ isActive }) =>
          cn(
            "w-full flex items-center gap-2 px-4 py-2 text-base justify-start",
            isActive
              ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
              : "text-gray-700 hover:bg-gray-100"
          )
        }
        {...rest}
      >
        {Icon && <Icon className="w-5 h-5" />}
        <span>{text}</span>
      </NavLink>
      {children && <ul className="pl-8">{children}</ul>}
    </li>
  );
};
