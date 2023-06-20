import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import CarsCarousel from "..";

beforeEach(() => {
  render(
    <MemoryRouter>
      <CarsCarousel />
    </MemoryRouter>,
  );
});

describe("<CarsCarousel />", () => {
  it("should render cars", async () => {
    expect(await screen.findByText(/XC90 Recharge/i)).toBeDefined();
    expect(
      screen.getByRole("combobox", { name: /select body type/i }),
    ).toBeDefined();
  });
});
