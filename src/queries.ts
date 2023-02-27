import { useQuery } from "@tanstack/react-query";

import { nounKeys } from "./query-keys";

export function useNouns() {
  return useQuery(nounKeys.findAll());
}