import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import HeroWidget from "..";

describe("<HeroWidget />", () => {
  it("should render hotspots", async () => {
    render(
      <MemoryRouter>
        <HeroWidget />
      </MemoryRouter>,
    );
    expect(await screen.findAllByRole("button")).toHaveLength(5);
    expect(
      screen.getByText(/Take your learning to the next level/i),
    ).toBeDefined();
    expect(
      screen.getByText(
        /Discover courses from our diverse and highly experienced tutors/i,
      ),
    ).toBeDefined();
  });
});
