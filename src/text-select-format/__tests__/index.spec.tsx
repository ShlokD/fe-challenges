import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, vi } from "vitest";

import TextSelectFormat from "..";

describe("<TextSelectFormat />", () => {
  it("should render buttons for formatting", async () => {
    vi.setSystemTime(new Date("2020-01-01"));
    render(
      <MemoryRouter>
        <TextSelectFormat />
      </MemoryRouter>,
    );
    expect(screen.getByRole("button", { name: /bold/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /italic/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /underline/i })).toBeDefined();
  });
});
