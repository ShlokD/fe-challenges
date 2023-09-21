import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, vi } from "vitest";

import SmartFilters from "..";

global.fetch = vi.fn();

describe("<StolenBikes />", () => {
  it("should render filters", async () => {
    render(
      <MemoryRouter>
        <SmartFilters />
      </MemoryRouter>,
    );
    expect(await screen.findByText(/add a filter/i)).toBeDefined();
    expect(
      screen.getByRole("combobox", { name: /select filter name/i }),
    ).toBeDefined();
  });
});
