import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import WhackHog from "..";

describe("<WhackHog />", () => {
  it("should render game elements", async () => {
    render(
      <MemoryRouter>
        <WhackHog />
      </MemoryRouter>,
    );

    expect(await screen.findByText(/Whack the Hedgehog/i)).toBeDefined();

    expect(screen.getByRole("radio", { name: /easy/i })).toBeDefined();
    expect(screen.getByRole("radio", { name: /medium/i })).toBeDefined();
    expect(screen.getByRole("radio", { name: /hard/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /start/i })).toBeDefined();
  });
});
