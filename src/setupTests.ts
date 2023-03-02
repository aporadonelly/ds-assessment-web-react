import "@testing-library/jest-dom";

import { vi, expect, beforeAll, afterEach, afterAll } from "vitest";
import matchers from "@testing-library/jest-dom/matchers";
import moment from "moment";

import { server } from "./mocks/server";

const env = process.env;

expect.extend(matchers);

beforeEach(() => {
  vi.resetModules();

  process.env = {
    ...env,
    TEST_CONFERENCE_START_DATE_TIME: moment().format("YYYY-MM-DD HH:mm:ss"),
  };
});

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  process.env = env;

  server.resetHandlers();
});

afterAll(() => {
  server.close();
});