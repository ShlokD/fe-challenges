import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import Calculator from "..";

beforeEach(() => {
  render(
    <MemoryRouter>
      <Calculator />
    </MemoryRouter>,
  );
});

describe("<Calculator />", () => {
  it("should render Calculator", async () => {
    const ac = await screen.findByRole("button", {
      name: /AC/i,
    });
    expect(ac).toBeDefined();
  });
});
