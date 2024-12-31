import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import GlassyCards from "..";

beforeEach(() => {
  render(
    <MemoryRouter>
      <GlassyCards />
    </MemoryRouter>,
  );
});

describe("<GlassyCards />", () => {
  it("should render elements ", async () => {
    expect(screen.getByAltText(/plant 1/i)).toBeDefined();
    expect(screen.getByAltText(/plant 2/i)).toBeDefined();
    expect(screen.getByRole("heading", { name: /plant 1/i })).toBeDefined();
    expect(screen.getByRole("heading", { name: /plant 2/i })).toBeDefined();
  });
});
