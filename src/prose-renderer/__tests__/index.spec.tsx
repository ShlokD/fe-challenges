import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import ProseRenderer from "..";

describe("<ProseRenderer />", () => {
  it("should render formatting options", async () => {
    render(
      <MemoryRouter>
        <ProseRenderer />
      </MemoryRouter>,
    );

    expect(
      await screen.findByRole("button", { name: /increase font/i }),
    ).toBeDefined();
    expect(
      screen.getByRole("button", { name: /decrease font/i }),
    ).toBeDefined();

    expect(screen.getByRole("button", { name: /left align/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /center align/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /right align/i })).toBeDefined();
    expect(
      screen.getByRole("button", { name: /justify align/i }),
    ).toBeDefined();
  });
});
