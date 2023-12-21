import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import GridCountdown from "..";

beforeEach(() => {
  render(
    <MemoryRouter>
      <GridCountdown />
    </MemoryRouter>,
  );
});

describe("<GridCountdown />", () => {
  it("should render form ", async () => {
    const input = await screen.findByText(/select date/i);
    expect(input).toBeDefined();
  });
});
