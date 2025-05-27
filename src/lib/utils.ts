import { clsx, type ClassValue } from "clsx";
import { format, parseISO } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatISO = (raw: string) => {
  const date = parseISO(raw);
  if (isNaN(date.getTime())) {
    return "Invalid date";
  }
  return format(parseISO(raw), "MMM d, yyyy, h:mm a");
};
