import { createQueryKeys } from "@lukemorales/query-key-factory";

import { getNouns } from "./services";

export const nounKeys = createQueryKeys("nouns", {
  findAll: () => ({
    queryKey: ["list"],
    queryFn: () => getNouns(),
  }),
});