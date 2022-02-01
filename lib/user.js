import useSWR from "swr";
import { fetcher } from "./fetch";

export function useCurrentUser() {
  return useSWR("/api/user", fetcher);
}

export function useUser(id) {
  return useSWR(`/api/users/${id}`, fetcher);
}
