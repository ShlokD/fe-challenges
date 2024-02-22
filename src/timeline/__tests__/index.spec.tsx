import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import Timeline from "..";

describe("<Timeline />", () => {
  it("should render timeline experience", async () => {
    render(
      <MemoryRouter>
        <Timeline />
      </MemoryRouter>,
    );

    const next = await screen.findByRole("button", { name: /next/i });
    expect(next).toBeDefined();
    expect(screen.getByRole("button", { name: /previous/i })).toBeDefined();
    expect(screen.getByText(/Founded in Ahmedabad, India/i)).toBeDefined();
    fireEvent.click(next);
    expect(
      await screen.findByText(/Secure initial funding of \$100,000/i),
    ).toBeDefined();
  });
});
