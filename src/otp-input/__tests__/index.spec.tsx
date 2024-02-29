import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import OTPInput from "..";

beforeEach(() => {
  render(
    <MemoryRouter>
      <OTPInput />
    </MemoryRouter>,
  );
});

describe("<OTPInput />", () => {
  it("should render inputs", async () => {
    const otpInput = await screen.findAllByRole("textbox", {
      name: /otp digit/i,
    });
    expect(otpInput).toHaveLength(6);
    expect(screen.getByRole("button", { name: /verify/i })).toBeDefined();
    expect(
      screen.getByRole("button", { name: /request again/i }),
    ).toBeDefined();
  });
});
