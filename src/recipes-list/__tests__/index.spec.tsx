import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import RecipesList from "..";

describe("<RecipesList />", () => {
  it("should render title and sorting elements", async () => {
    render(
      <MemoryRouter>
        <RecipesList />
      </MemoryRouter>,
    );
    expect(
      await screen.findByRole("combobox", { name: /sort by/i }),
    ).toBeDefined();
    expect(
      screen.getByRole("searchbox", {
        name: /Search by name or ingredient/i,
      }),
    ).toBeDefined();
  });
});
