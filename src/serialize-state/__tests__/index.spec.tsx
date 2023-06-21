import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import SerializeState from "..";

describe("<SerializeState />", () => {
  it("should render list of stolen bikes", async () => {
    render(
      <MemoryRouter>
        <SerializeState />
      </MemoryRouter>,
    );
    expect(await screen.findByRole("textbox", /enter state/i)).toBeDefined();
    expect(screen.getByRole("button", { name: /save state/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /set state/i })).toBeDefined();

    expect(screen.getByRole("radio", { name: /radio1/i })).toBeDefined();
    expect(screen.getByRole("radio", { name: /radio2/i })).toBeDefined();
    expect(screen.getByRole("checkbox", { name: /checkbox1/i })).toBeDefined();
    expect(screen.getByRole("checkbox", { name: /checkbox2/i })).toBeDefined();
    expect(screen.getByRole("checkbox", { name: /checkbox3/i })).toBeDefined();
    expect(screen.getByRole("checkbox", { name: /checkbox4/i })).toBeDefined();
    expect(screen.getByRole("checkbox", { name: /checkbox5/i })).toBeDefined();
  });
});
