import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import DonationsWidget from "..";

describe("<DonationsWidget />", () => {
  it("should render widget", async () => {
    render(
      <MemoryRouter>
        <DonationsWidget />
      </MemoryRouter>,
    );
    const message = await screen.findByText(
      "Only $800 still needed for this project",
    );
    expect(message).toBeDefined();
    const amount = screen.getByRole("spinbutton", { name: /amount/i });
    expect(amount).toBeDefined();
    fireEvent.change(amount, { target: { value: 100 } });
    const giveBtn = screen.getByRole("button", { name: /give now/i });
    expect(giveBtn).toBeDefined();
    fireEvent.click(giveBtn);

    expect(
      await screen.findByText("Only $700 still needed for this project"),
    ).toBeDefined();

    const save = screen.getByRole("button", { name: /save for later/i });
    const share = screen.getByRole("button", { name: /tell your friends/i });

    expect(save).toBeDefined();
    expect(share).toBeDefined();

    expect(
      screen.getByRole("button", { name: /tell your friends/i }),
    ).toBeDefined();

    fireEvent.click(save);
    expect(await screen.findByText("Saved!")).toBeDefined();

    fireEvent.click(screen.getByRole("button", { name: /close dialog/i }));

    fireEvent.click(share);
    expect(await screen.findByRole("link", { name: /tweet/i })).toBeDefined();
  });
});
