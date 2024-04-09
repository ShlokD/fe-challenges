import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import DeliveryTracker from "..";

describe("<DeliveryTracker />", () => {
  it("should render components", async () => {
    render(
      <MemoryRouter>
        <DeliveryTracker />
      </MemoryRouter>,
    );

    expect(await screen.findByRole("button", { name: /next/i })).toBeDefined();
    expect(screen.getByText(/ghost town/i)).toBeDefined();
    expect(screen.getByText(/your order is on the way/i)).toBeDefined();
    expect(screen.getAllByText(/order received/i)).toHaveLength(2);
    expect(screen.getByText(/picked up/i)).toBeDefined();

    expect(screen.getByText(/out for delivery/i)).toBeDefined();
    expect(screen.getByText(/delivered/i)).toBeDefined();
  });
});
