import { rest } from "msw";
import { faker } from "@faker-js/faker";

export const nounHandler = [
  rest.get("**/api/nouns", (_req, res, ctx) => {
    const nouns = [
      {
        id: 1,
        name: "Apple",
        imgSrc: faker.image.food(),
      },
      {
        id: 2,
        name: "Orange",
        imgSrc: faker.image.food(),
      },
      {
        id: 3,
        name: "Grapes",
        imgSrc: faker.image.food(),
      },
    ];

    return res(ctx.status(200), ctx.json(nouns));
  }),
];