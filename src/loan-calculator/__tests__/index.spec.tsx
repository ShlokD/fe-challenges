import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import LoanCalculator from "..";

describe("<LoanCalculator />", () => {
  it("should render widget", async () => {
    render(
      <MemoryRouter>
        <LoanCalculator />
      </MemoryRouter>,
    );
    const amount = await screen.findByRole("spinbutton", {
      name: /loan amount/i,
    });
    expect(amount).toBeDefined();
    const years = screen.getByRole("spinbutton", { name: /years/i });
    const rate = screen.getByRole("spinbutton", { name: /interest rate/i });
    expect(years).toBeDefined();
    expect(rate).toBeDefined();
    fireEvent.change(amount, { target: { value: 200000 } });
    fireEvent.change(years, { target: { value: 10 } });
    fireEvent.change(rate, { target: { value: 7.5 } });

    expect(await screen.findByText("Rs. 2374.04")).toBeDefined();
    expect(await screen.findByText("Rs. 284884.25")).toBeDefined();
  });
});
