import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import PokeCards from "..";

global.fetch = vi.fn();
const data = {
  results: [],
};
function createFetchResponse() {
  return { json: () => new Promise((resolve) => resolve(data)) };
}

beforeEach(() => {
  fetch.mockResolvedValue(createFetchResponse());

  render(
    <MemoryRouter>
      <PokeCards />
    </MemoryRouter>,
  );
});

describe("<PokeCards />", () => {
  it("should render plans and toggle", async () => {
    expect(
      await screen.findByText(/Select a Pokemon Stat on your card/i),
    ).toBeDefined();
    expect(
      await screen.findByText(/The one with the higher stat wins points/i),
    ).toBeDefined();

    expect(screen.getByRole("button", { name: /start/i })).toBeDefined();
  });
});
