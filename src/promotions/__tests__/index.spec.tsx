import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, vi } from "vitest";

import Promotions from "..";

global.fetch = vi.fn();

const data = [
  {
    id: "PROMO_1",
    name: "Promotion One",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    heroImageUrl: "https://via.placeholder.com/600x300",
    onlyNewCustomers: false,
    termsAndConditionsButtonText: "Terms & Conditions",
    joinNowButtonText: "Join Now",
    sequence: 10,
  },
  {
    id: "PROMO_2",
    name: "Promotion Two",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    heroImageUrl: "https://via.placeholder.com/600x300",
    onlyNewCustomers: true,
    termsAndConditionsButtonText: "Terms & Conditions",
    joinNowButtonText: "Join Now",
    sequence: 9,
  },
];

function createFetchResponse() {
  return { json: () => new Promise((resolve) => resolve(data)) };
}

beforeEach(() => {
  fetch.mockResolvedValue(createFetchResponse());
  render(
    <MemoryRouter>
      <Promotions />
    </MemoryRouter>,
  );
});

describe("<Promotions />", () => {
  it("should render header and list of promos", async () => {
    expect(
      screen.getByRole("radio", { name: /all promotions/i }),
    ).toBeDefined();
    expect(screen.getByRole("radio", { name: /new customers/i })).toBeDefined();
    expect(await screen.findByText(/promotion one/i)).toBeDefined();
    expect(screen.getByText(/promotion two/i)).toBeDefined();
  });

  it("should show filtered promos", async () => {
    const newCustomersToggle = screen.getByRole("radio", {
      name: /new customers/i,
    });
    expect(newCustomersToggle).toBeDefined();
    fireEvent.click(newCustomersToggle);
    expect(screen.queryByText(/promotion one/i)).toBeNull();
    expect(await screen.findByText(/promotion two/i)).toBeDefined();
  });
});
