import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import XRKeyboard from "..";

describe("<XRKeyboard />", () => {
  it("should render xr keyboard", async () => {
    render(
      <MemoryRouter>
        <XRKeyboard />
      </MemoryRouter>,
    );
    const space = await screen.findByRole("button", { name: /space/i });
    expect(space).toBeDefined();

    let hKey = screen.getByRole("button", { name: "h" });
    expect(hKey).toBeDefined();
    fireEvent.click(hKey);
    expect(screen.getAllByText("h")[0]).toBeDefined();

    const atKey = screen.getByRole("button", { name: "@" });
    expect(atKey).toBeDefined();
    fireEvent.click(atKey);

    expect(screen.getByText("h@")).toBeDefined();

    const delKey = screen.getByRole("button", { name: "del" });
    expect(delKey).toBeDefined();
    fireEvent.click(delKey);

    expect(screen.getAllByText("h")[0]).toBeDefined();

    const shiftKey = screen.getByRole("button", { name: "shift" });
    expect(shiftKey).toBeDefined();
    fireEvent.click(shiftKey);

    hKey = screen.getByRole("button", { name: "H" });

    expect(hKey).toBeDefined();
    fireEvent.click(hKey);
    expect(screen.getByText("hH")).toBeDefined();
  });
});
