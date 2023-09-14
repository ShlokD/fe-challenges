import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import Patatap from "..";

beforeEach(() => {
  render(
    <MemoryRouter>
      <Patatap />
    </MemoryRouter>,
  );
});

describe("<Patatap />", () => {
  it("should render buttons", async () => {
    const svg = await screen.findByTitle("loader");
    waitForElementToBeRemoved(svg);
    expect(await screen.findAllByRole("button")).toHaveLength(26);
  });
});
