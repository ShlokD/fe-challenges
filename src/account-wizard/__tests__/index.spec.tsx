import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import AccountWizard from "..";

describe("<AccountWizard />", () => {
  it("should render account", async () => {
    render(
      <MemoryRouter>
        <AccountWizard />
      </MemoryRouter>,
    );
    const name = await screen.findByRole("textbox", {
      name: /enter your name/i,
    });
    expect(name).toBeDefined();

    const email = await screen.findByRole("textbox", {
      name: /enter your email/i,
    });
    expect(email).toBeDefined();

    const next = await screen.findByRole("button", {
      name: /next/i,
    });
    expect(next).toBeDefined();

    fireEvent.change(name, { target: { value: "aaa" } });
    fireEvent.change(email, { target: { value: "aaa@aaa.com" } });
    fireEvent.click(next);

    const age = await screen.findByRole("spinbutton", {
      name: /enter your age/i,
    });
    expect(age).toBeDefined();

    fireEvent.change(age, { target: { value: "20" } });

    const daily = await screen.findByRole("radio", {
      name: /daily/i,
    });
    expect(daily).toBeDefined();

    const weekly = await screen.findByRole("radio", {
      name: /weekly/i,
    });
    expect(weekly).toBeDefined();

    const monthly = await screen.findByRole("radio", {
      name: /monthly/i,
    });
    expect(monthly).toBeDefined();

    fireEvent.click(monthly, { target: { value: "monthly" } });

    const submit = await screen.findByRole("button", {
      name: /submit/i,
    });
    expect(submit).toBeDefined();
    fireEvent.click(submit);

    await waitFor(
      () => {
        expect(screen.getByText("Hello aaa")).toBeDefined();
        expect(
          screen.getByText("You've signed up for a monthly newsletter"),
        ).toBeDefined();
      },
      { timeout: 4000 },
    );
  });
});
