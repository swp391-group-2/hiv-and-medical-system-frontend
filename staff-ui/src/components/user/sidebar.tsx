import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import React, { type ReactNode } from "react";
import { NavLink } from "react-router-dom";

export const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <aside className="w-64 h-screen bg-white border-r shadow-sm flex flex-col">
      {children}
    </aside>
  );
};

export const SidebarHeader = (header: string) => {
  return (
    <div>
      <span>{header}</span>
    </div>
  );
};

export const SidebarNav = ({ children }: { children?: React.ReactNode }) => {
  return (
    <nav className="flex-1 overflow-y-auto py-4">
      <ul className="flex flex-col space-y-1">{children}</ul>
    </nav>
  );
};

export const SidebarFooter = ({ children }: { children: ReactNode }) => {
  return <div className="">{children}</div>;
};

interface SidebarNavItemProps {
  path: string;
  icon?: LucideIcon;
  text: string;
  desc: string;
  isActive: boolean;
  children?: React.ReactNode;
}

export const SidebarNavItem = ({
  path,
  icon: Icon,
  text,
  desc,
  children,
  ...rest
}: SidebarNavItemProps) => {
  return (
    <li>
      <NavLink
        to={path}
        className={({ isActive }) =>
          cn(
            "w-full flex items-center gap-2 px-4 py-2 text-base justify-start cursor-pointer",
            isActive
              ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
              : "text-gray-700 hover:bg-gray-100"
          )
        }
        {...rest}
      >
        {Icon && <Icon className="w-5 h-5" />}
        {desc ? (
          <div className="flex flex-col">
            <span>{text}</span>
            <span>{desc}</span>
          </div>
        ) : (
          <span>{text}</span>
        )}
      </NavLink>
      {children && <ul className="pl-8">{children}</ul>}
    </li>
  );
};
