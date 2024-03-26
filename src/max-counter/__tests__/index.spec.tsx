import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import MaxCounter from "..";

describe("<MaxCounter />", () => {
  it("should render counter and add button", async () => {
    render(
      <MemoryRouter>
        <MaxCounter />
      </MemoryRouter>,
    );
    const addBtn = await screen.findByRole("button", {
      name: /add/i,
    });
    expect(addBtn).toBeDefined();
    expect(screen.getByText(/total 0/i)).toBeDefined();
  });
});
