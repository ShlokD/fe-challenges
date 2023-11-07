import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import HandCricket from "..";

describe("<HandCricket />", () => {
  it("should render game elements", async () => {
    render(
      <MemoryRouter>
        <HandCricket />
      </MemoryRouter>,
    );
    const heads = await screen.findByRole("button", { name: /heads/i });
    expect(heads).toBeDefined();
    expect(screen.getByRole("button", { name: /tails/i })).toBeDefined();
  });
});
