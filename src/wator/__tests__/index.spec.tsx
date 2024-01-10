import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import Wator from "..";

describe("<Wator />", () => {
  it("should render simulation elements", async () => {
    render(
      <MemoryRouter>
        <Wator />
      </MemoryRouter>,
    );

    expect(await screen.findByRole("button", { name: /start/i })).toBeDefined();
    expect(screen.getAllByText(/🦈/i)).toHaveLength(2);
    expect(screen.getAllByText(/🐡/i)).toHaveLength(2);
  });
});
