import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import type { LucideIcon } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

export const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <aside className="w-64 h-screen bg-background border-r flex flex-col">
      <ScrollArea className="flex-1">{children}</ScrollArea>
    </aside>
  );
};

export const SidebarHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold">{children}</h2>
      <Separator className="mt-4" />
    </div>
  );
};

export const SidebarNav = ({ children }: { children?: React.ReactNode }) => {
  return <nav className="p-4 space-y-2">{children}</nav>;
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
      <Button variant="ghost" className="w-full justify-start" asChild>
        <NavLink
          to={path}
          className={({ isActive }) =>
            cn(
              "flex items-center gap-2 px-4 py-2",
              isActive && "bg-accent text-accent-foreground"
            )
          }
        >
          {Icon && <Icon className="w-4 h-4" />}
          <span>{text}</span>
        </NavLink>
      </Button>
      {children && <div className="ml-6 mt-2 space-y-1">{children}</div>}
    </div>
  );
};
