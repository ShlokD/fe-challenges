import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import RPSMatchup from "..";

describe("<RPSMatchup />", () => {
  it("should render matchups and controls", async () => {
    render(
      <MemoryRouter>
        <RPSMatchup />
      </MemoryRouter>,
    );
    expect(await screen.findByRole("button", { name: /start/i })).toBeDefined();
    expect(screen.getByRole("slider", { name: /matchups 32/i })).toBeDefined();
  });
});
