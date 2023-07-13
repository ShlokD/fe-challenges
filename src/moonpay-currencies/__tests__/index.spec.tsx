import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, vi } from "vitest";

import MoonpayCurrencies from "..";

global.fetch = vi.fn();

const data = [
  {
    name: "abc",
    code: "xyez",
    supportsTestMode: true,
    isSupportedInUS: false,
  },
  {
    name: "xyz",
    code: "abde",
    supportsTestMode: false,
    isSupportedInUS: true,
  },
];

function createFetchResponse() {
  return { json: () => new Promise((resolve) => resolve(data)) };
}

beforeEach(() => {
  fetch.mockResolvedValue(createFetchResponse());
  render(
    <MemoryRouter>
      <MoonpayCurrencies />
    </MemoryRouter>,
  );
});

describe("<Promotions />", () => {
  it("should render list of currencies", async () => {
    expect(await screen.findByText(/abc/i)).toBeDefined();
    expect(screen.getByText(/xyz/i)).toBeDefined();
    const nonUS = screen.getByRole("checkbox", { name: /non-us only/i });
    const nonTest = screen.getByRole("checkbox", { name: /non-test only/i });
    expect(nonUS).toBeDefined();
    expect(nonTest).toBeDefined();
    fireEvent.click(nonUS);
    expect(screen.queryByText(/xyz/i)).toBeNull();
    fireEvent.click(nonUS);

    fireEvent.click(nonTest);
    expect(screen.queryByText(/abc/i)).toBeNull();
  });
});
