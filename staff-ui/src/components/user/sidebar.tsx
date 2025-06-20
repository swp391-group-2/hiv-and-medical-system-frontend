import { useId, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, type LucideIcon } from "lucide-react";
import React, { type ReactNode } from "react";
import { NavLink } from "react-router-dom";
import {
  CollapsibleTrigger,
  Collapsible,
  CollapsibleContent,
} from "../ui/collapsible";

export const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <aside className="w-96 min-h-screen bg-white border-r shadow-sm flex flex-col">
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
  desc?: string;
  collapsible?: boolean;
  defaultOpen?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const SidebarNavItem = ({
  path,
  icon: Icon,
  text,
  desc,
  collapsible = false,
  defaultOpen = false,
  className,
  children,
}: SidebarNavItemProps) => {
  // generate a11y id for the collapsible content
  const contentId = useId();
  const [open, setOpen] = useState(defaultOpen);

  if (collapsible) {
    return (
      <Collapsible defaultOpen={defaultOpen} onOpenChange={setOpen}>
        <CollapsibleTrigger asChild>
          <li
            className={cn(
              "flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100",
              className
            )}
            aria-controls={contentId}
          >
            <div className="flex items-center gap-2">
              {Icon && <Icon className="w-5 h-5 mr-4" />}
              <div className="flex flex-col">
                <span>{text}</span>
                {desc && <span className="text-sm text-gray-400">{desc}</span>}
              </div>
            </div>
            {open ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronUp className="w-4 h-4" />
            )}
          </li>
        </CollapsibleTrigger>

        <CollapsibleContent asChild>
          <ul id={contentId} className="">
            {children}
          </ul>
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <li>
      <NavLink
        to={path}
        className={({ isActive }) =>
          cn(
            "flex items-center gap-2 px-4 py-2 hover:bg-gray-100",
            isActive
              ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
              : "text-gray-700",
            className
          )
        }
      >
        {Icon && <Icon className="w-5 h-5 mr-4" />}
        <div className="flex flex-col">
          <span>{text}</span>
          {desc && <span className="text-sm text-gray-400">{desc}</span>}
        </div>
      </NavLink>
    </li>
  );
};
