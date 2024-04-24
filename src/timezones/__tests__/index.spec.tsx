import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import Timezones from "..";

describe("<Timezones />", () => {
  it("should render timezone experience", async () => {
    render(
      <MemoryRouter>
        <Timezones />
      </MemoryRouter>,
    );

    expect(await screen.findByRole("button", { name: /add/i })).toBeDefined();
  });
});
