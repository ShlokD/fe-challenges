import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import MultiCounter from "..";

describe("<MultiCounter />", () => {
  it("should render input to add counter and text for total", async () => {
    render(
      <MemoryRouter>
        <MultiCounter />
      </MemoryRouter>,
    );
    const counterName = await screen.findByRole("textbox", {
      name: /counter name/i,
    });
    expect(counterName).toBeDefined();
    const add = screen.getByRole("button", { name: /add/i });
    expect(add).toBeDefined();
    fireEvent.change(counterName, { target: { value: "A" } });
    fireEvent.click(add);

    fireEvent.change(counterName, { target: { value: "B" } });
    fireEvent.click(add);
    const incA = screen.getByRole("button", { name: /increment a/i });
    const incB = screen.getByRole("button", { name: /increment b/i });
    expect(incA).toBeDefined();
    expect(incB).toBeDefined();
    fireEvent.click(incA);
    fireEvent.click(incB);

    expect(await screen.findByText(/total: 2/i)).toBeDefined();
  });
});
