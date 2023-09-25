import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import PasswordStrength from "..";

beforeEach(() => {
  render(
    <MemoryRouter>
      <PasswordStrength />
    </MemoryRouter>,
  );
});

describe("<PasswordStrength />", () => {
  it("should render inputs", async () => {
    const pwd = await screen.findByLabelText(/enter password/i);
    expect(pwd).toBeDefined();
    fireEvent.change(pwd, {
      target: {
        value: "deltagamm@",
      },
    });
    const upper = await screen.findByRole("checkbox", { name: "A" });
    expect(upper.checked).toEqual(true);

    const lower = await screen.findByRole("checkbox", { name: "a" });
    expect(lower.checked).toEqual(true);

    const digit = await screen.findByRole("checkbox", { name: "0-9" });
    expect(digit.checked).toEqual(false);

    const special = await screen.findByRole("checkbox", { name: "$" });
    expect(special.checked).toEqual(true);
  });
});
