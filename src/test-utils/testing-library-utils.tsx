import "@testing-library/jest-dom/extend-expect";

import { ReactElement } from "react";
import { RenderResult, render as rtlRender } from "@testing-library/react";

import { createQueryProviderWrapper } from "@/test-utils/create-query-provider-wrapper";

const render = (ui: ReactElement): RenderResult =>
  rtlRender(ui, {
    wrapper: createQueryProviderWrapper(),
  });

export * from "@testing-library/react";
export { render };