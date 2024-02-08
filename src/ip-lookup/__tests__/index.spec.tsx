import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import IPLookup from "..";

global.fetch = vi.fn();

const data = {
  ip: "1.2.3.4",
  city: "Mountain View",
  country_name: "USA",
  org: "Some ISP",
};

global.window.navigator = {
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1",
};

function createFetchResponse() {
  return { json: () => new Promise((resolve) => resolve(data)) };
}

describe("<IPLookup />", () => {
  it("should render ip details", async () => {
    fetch.mockResolvedValueOnce(createFetchResponse());
    render(
      <MemoryRouter>
        <IPLookup />
      </MemoryRouter>,
    );

    expect(
      await screen.findByRole("heading", { name: /1.2.3.4/i }),
    ).toBeDefined();
    expect(screen.getByText(/🌐 mountain view,usa/i)).toBeDefined();
    expect(screen.getByText(/some isp/i)).toBeDefined();
    expect(screen.getByText(/📱/i)).toBeDefined();
    expect(screen.getByText(/mobile safari/i)).toBeDefined();
  });

  it("should render error", async () => {
    render(
      <MemoryRouter>
        <IPLookup />
      </MemoryRouter>,
    );

    expect(
      await screen.findByText(
        /Error loading IP details. Please enable cookies and try again/i,
      ),
    ).toBeDefined();
  });
});
