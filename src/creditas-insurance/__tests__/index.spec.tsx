import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import Installments from "..";

describe("<InterestRate />", () => {
  it("should render interest rate calculator", async () => {
    render(
      <MemoryRouter>
        <Installments />
      </MemoryRouter>,
    );
    expect(
      await screen.findByRole("combobox", { name: /installments/i }),
    ).toBeDefined();
    const collateral = screen.getByRole("combobox", { name: /collateral/i });
    expect(collateral).toBeDefined();
    expect(
      screen.getByRole("spinbutton", { name: /enter guarantee/i }),
    ).toBeDefined();
    expect(
      screen.getByRole("slider", { name: /set guarantee/i }),
    ).toBeDefined();
    expect(
      screen.getByRole("spinbutton", { name: /enter loan/i }),
    ).toBeDefined();
    expect(screen.getByRole("slider", { name: /set loan/i })).toBeDefined();
    expect(screen.getByText("185")).toBeDefined();
    expect(screen.getByText("Total payments: 4445")).toBeDefined();

    fireEvent.change(collateral, { target: { value: "Property" } });

    expect(screen.getByText("302")).toBeDefined();
    expect(screen.getByText("Total payments: 36216")).toBeDefined();
  });
});
