import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import ColorGradient from "..";

describe("<ColorGradient />", () => {
  it("should render accordions", async () => {
    render(
      <MemoryRouter>
        <ColorGradient />
      </MemoryRouter>,
    );
    expect(screen.getAllByRole("group")).toHaveLength(4);
  });
});
