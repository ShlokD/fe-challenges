import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import BonsaiPricing from "..";

describe("<BonsaiPricing />", () => {
  it("should render list of pricing", async () => {
    render(
      <MemoryRouter>
        <BonsaiPricing />
      </MemoryRouter>,
    );
    expect(
      await screen.findByRole("checkbox", { name: /change frequency/i }),
    ).toBeDefined();

    expect(screen.findByText("Starter")).toBeDefined();
    expect(screen.findByText("Professional")).toBeDefined();
    expect(screen.findByText("Business")).toBeDefined();
    expect(screen.findByText("Accounting & Tax Assistant")).toBeDefined();
    expect(screen.findByText("How does the free trial work?")).toBeDefined();
  });
});
