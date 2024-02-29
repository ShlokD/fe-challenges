import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import HeatMap from "..";

describe("<HeatMap />", () => {
  it("should render heatmap and dates", async () => {
    render(
      <MemoryRouter>
        <HeatMap />
      </MemoryRouter>,
    );
    expect(
      await screen.findByRole("button", { name: /increase count/i }),
    ).toBeDefined();
    expect(
      screen.getByRole("button", { name: /decrease count/i }),
    ).toBeDefined();
    expect(screen.getAllByRole("button", { name: /date-/i })).toHaveLength(365);
  });
});
