import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import Puzzle15 from "..";

describe("<Puzzle15 />", () => {
  it("should render formatting options", async () => {
    render(
      <MemoryRouter>
        <Puzzle15 />
      </MemoryRouter>,
    );

    expect(await screen.findByRole("button", { name: "A" })).toBeDefined();
    expect(screen.getByRole("button", { name: /restart/i })).toBeDefined();
    expect(screen.getAllByRole("button")).toHaveLength(17);
  });
});
