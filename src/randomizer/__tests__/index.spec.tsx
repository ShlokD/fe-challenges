import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import Randomizer from "..";

describe("<Randomizer />", () => {
  it("should render coins and dice", async () => {
    render(
      <MemoryRouter>
        <Randomizer />
      </MemoryRouter>,
    );
    expect(
      await screen.findByRole("button", { name: /add coin/i }),
    ).toBeDefined();
    expect(screen.getByRole("button", { name: /H/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /flip all/i })).toBeDefined();

    expect(screen.getByRole("button", { name: /6/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /add die/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /roll all/i })).toBeDefined();
  });
});
