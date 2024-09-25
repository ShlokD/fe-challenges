import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import DonationPage from "..";

describe("<DonationPage />", () => {
  it("should render donation values", async () => {
    render(
      <MemoryRouter>
        <DonationPage />
      </MemoryRouter>,
    );

    expect(await screen.findByRole("radio", { name: /1/i })).toBeDefined();
    expect(
      screen.getByRole("button", { name: /support for rs.200/i }),
    ).toBeDefined();
    const two = screen.getByRole("radio", { name: /2/i });
    expect(two).toBeDefined();
    fireEvent.click(two);
    expect(
      screen.getByRole("button", { name: /support for rs.400/i }),
    ).toBeDefined();
    const textbox = screen.getByRole("spinbutton", {
      name: /number of coffees/i,
    });
    expect(textbox).toBeDefined();
    fireEvent.click(textbox);
    fireEvent.change(textbox, { target: { value: 8 } });
    expect(
      screen.getByRole("button", { name: /support for rs.1600/i }),
    ).toBeDefined();
  });
});
