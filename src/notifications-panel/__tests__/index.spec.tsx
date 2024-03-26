import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import Notifications from "..";

beforeEach(() => {
  render(
    <MemoryRouter>
      <Notifications />
    </MemoryRouter>,
  );
});

describe("<Notifications />", () => {
  it("should render notifications", async () => {
    const notify = await screen.findAllByRole("checkbox");
    expect(notify).toHaveLength(10);
  });
});
