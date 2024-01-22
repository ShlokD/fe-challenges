import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import Checklist from "..";

describe("<Checklist />", () => {
  it("should render title and elements", async () => {
    render(
      <MemoryRouter>
        <Checklist />
      </MemoryRouter>,
    );
    expect(
      await screen.findByRole("heading", { name: /books/i }),
    ).toBeDefined();
    expect(screen.getAllByRole("checkbox")).toHaveLength(5);
    expect(screen.getByRole("button", { name: /add new item/i })).toBeDefined();
    expect(
      screen.getByRole("button", { name: /previous list/i }),
    ).toBeDefined();
    expect(screen.getByRole("button", { name: /next list/i })).toBeDefined();
  });
});
