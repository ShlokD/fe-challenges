import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import InterestRate from "..";

describe("<InterestRate />", () => {
  it("should render interest rate calculator", async () => {
    render(
      <MemoryRouter>
        <InterestRate />
      </MemoryRouter>,
    );
    const amount = screen.getByRole("spinbutton", { name: /amount/i });
    const interest = screen.getByRole("spinbutton", {
      name: /interest rate/i,
    });
    const frequency = screen.getByRole("combobox", {
      name: /interest compounding duration/i,
    });
    const time = screen.getByRole("spinbutton", { name: /years/i });
    const calculateBtn = screen.getByRole("button", { name: /calculate/i });
    expect(amount).toBeDefined();
    expect(interest).toBeDefined();
    expect(frequency).toBeDefined();
    expect(time).toBeDefined();
    expect(calculateBtn).toBeDefined();

    fireEvent.change(amount, { target: { value: 100 } });
    fireEvent.change(interest, { target: { value: 5 } });
    fireEvent.change(time, { target: { value: 1 } });
    fireEvent.click(calculateBtn);
    expect(screen.findByText("Interest: 5.00")).toBeDefined();
    expect(screen.findByText("Final Amount: 5.00")).toBeDefined();
  });
});
