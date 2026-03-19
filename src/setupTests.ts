import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeAll, afterAll } from "vitest";
import { server } from "./mocks/server";

// Extend Vitest's expect with jest-dom matchers
import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

// MSW Lifecycle
beforeAll(() => server.listen());
afterEach(() => {
  cleanup();
  server.resetHandlers();
});
afterAll(() => server.close());
