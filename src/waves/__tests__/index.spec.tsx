import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import Waves from "..";

describe("<Waves />", () => {
  it("should render game elements", async () => {
    render(
      <MemoryRouter>
        <Waves />
      </MemoryRouter>,
    );

    expect(
      await screen.findByText(/Click a dot to see the animation/i),
    ).toBeDefined();
    expect(screen.getAllByRole("button")).toHaveLength(257);
  });
});
