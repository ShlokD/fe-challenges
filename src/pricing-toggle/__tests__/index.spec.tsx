import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, vi } from "vitest";

import PricingToggle from "..";

beforeEach(() => {
  render(
    <MemoryRouter>
      <PricingToggle />
    </MemoryRouter>,
  );
});

describe("<PricingToggle />", () => {
  it("should render plans and toggle", async () => {
    expect(await screen.findByText(/annual/i)).toBeDefined();
    expect(await screen.findByText(/monthly/i)).toBeDefined();
    const frequency = screen.getByRole("checkbox", {
      name: /change frequency/i,
    });
    expect(frequency).toBeDefined();

    expect(screen.getByRole("radio", { name: /basic/i })).toBeDefined();
    expect(screen.getByRole("radio", { name: /professional/i })).toBeDefined();
    expect(screen.getByRole("radio", { name: /master/i })).toBeDefined();
    expect(screen.getByText(/24.99/i)).toBeDefined();
    fireEvent.click(frequency);
    expect(await screen.findByText(/274.89/i)).toBeDefined();
  });
});
