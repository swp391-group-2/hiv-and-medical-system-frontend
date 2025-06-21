import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import type { LucideIcon } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

export const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <aside className="w-80 h-screen bg-background border-r flex flex-col">
      <ScrollArea className="flex-1">{children}</ScrollArea>
    </aside>
  );
};

export const SidebarHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-8">
      <h2 className="text-xl font-semibold">{children}</h2>
      <Separator className="mt-6" />
    </div>
  );
};

export const SidebarNav = ({ children }: { children?: React.ReactNode }) => {
  return <nav className="p-6 space-y-3">{children}</nav>;
};

interface SidebarNavItemProps {
  path: string;
  icon?: LucideIcon;
  text: string;
  children?: React.ReactNode;
}

export const SidebarNavItem = ({
  path,
  icon: Icon,
  text,
  children,
}: SidebarNavItemProps) => {
  return (
    <div>
      <NavLink
        to={path}
        end
        className={({ isActive }) =>
          cn(
            "flex items-center gap-3 px-6 py-6  border transition-colors",
            isActive && " text-accent-foreground border-l-4 border-l-primary "
          )
        }
      >
        {Icon && <Icon />}
        <span className="text-md">{text}</span>
      </NavLink>
      {children && <div className="ml-8 mt-6 space-y-2">{children}</div>}
    </div>
  );
};
