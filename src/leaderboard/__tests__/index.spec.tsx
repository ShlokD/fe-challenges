import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import Leaderboard from "..";

describe("<Leaderboard />", () => {
  it("should render leaderboard", async () => {
    render(
      <MemoryRouter>
        <Leaderboard />
      </MemoryRouter>,
    );

    expect(await screen.findByText(/john doe/i)).toBeDefined();
    expect(screen.getByText(/1000 points/i)).toBeDefined();
    expect(screen.getByText(/jane smith/i)).toBeDefined();
  });
});
