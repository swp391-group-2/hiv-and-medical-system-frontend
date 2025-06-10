import { useQuery } from "@tanstack/react-query";
import { getCurrentUser, type User } from "../api/auth";

export function useCurrentUser() {
  return useQuery<User>({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    staleTime: Infinity, // don’t refetch unless you invalidate
    retry: false, // if not logged in, don’t retry
  });
}
