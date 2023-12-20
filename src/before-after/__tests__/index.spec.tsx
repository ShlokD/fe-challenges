import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import BeforeAfter from "..";

describe("<BeforeAfter />", () => {
  it("should render list of pricing", async () => {
    render(
      <MemoryRouter>
        <BeforeAfter />
      </MemoryRouter>,
    );
    expect(
      await screen.findByRole("slider", { name: /change display/i }),
    ).toBeDefined();

    expect(screen.getByAltText("Before")).toBeDefined();
    expect(screen.getByAltText("After")).toBeDefined();
  });
});
