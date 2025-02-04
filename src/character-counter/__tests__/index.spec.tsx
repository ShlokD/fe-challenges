import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import CharacterCounter from "..";

describe("<CharacterCounter />", () => {
  it("should render counter and elements", async () => {
    render(
      <MemoryRouter>
        <CharacterCounter />
      </MemoryRouter>,
    );
    expect(
      await screen.findByRole("button", { name: /delete last counter/i }),
    ).toBeDefined();
    const addCtr = screen.getByRole("button", { name: /add counter/i });
    expect(addCtr).toBeDefined();

    const ctr1 = screen.getByRole("textbox", { name: /counter-1/i });
    expect(ctr1).toBeDefined();
    fireEvent.click(addCtr);
    const ctr2 = screen.getByRole("textbox", { name: /counter-2/i });
    expect(ctr2).toBeDefined();
    fireEvent.change(ctr1, { target: { value: "Hello how are you" } });
    fireEvent.change(ctr2, { target: { value: "Hello how are you" } });

    expect(screen.getByText(/34/i)).toBeDefined();
    expect(screen.getByText("8")).toBeDefined();
    expect(screen.getAllByRole("progressbar")).toHaveLength(10);
  });
});
