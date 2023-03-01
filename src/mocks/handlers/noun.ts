
import { rest } from "msw";
import { faker } from "@faker-js/faker";

export const nounHandler = [
  rest.get("**/api/nouns", (_req, res, ctx) => {
    const nouns = Array.from({ length: 6 }).map(() => ({
      id: faker.datatype.number(),
      name: faker.word.noun(),
      imgSrc: faker.image.food(),
    }));

    return res(ctx.status(200), ctx.json(nouns));
  }),
];