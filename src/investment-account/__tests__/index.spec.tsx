import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import InvestmentAccount from "..";

describe("<InvestmentAccount />", () => {
  it("should render investment details", async () => {
    render(
      <MemoryRouter>
        <InvestmentAccount />
      </MemoryRouter>,
    );

    const deposit = await screen.findByRole("button", { name: /deposit/i });

    expect(deposit).toBeDefined();
    expect(screen.getByText(/Rs. 0.00/i)).toBeDefined();
    expect(screen.getByRole("button", { name: /withdraw/i })).toBeDefined();
    fireEvent.click(deposit);
    expect(screen.getByRole("spinbutton", { name: /amount/i })).toBeDefined();
    expect(await screen.findByRole("button", { name: /done/i })).toBeDefined();
  });
});
