import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import VideoMenu from "..";

describe("<VideoMenu />", () => {
  it("should render video menu", async () => {
    render(
      <MemoryRouter>
        <VideoMenu />
      </MemoryRouter>,
    );
    const fire = await screen.findByRole("button", { name: /fire/i });
    expect(fire).toBeDefined();

    fireEvent.click(fire);
    expect(
      screen.findByText(/The scientist peered into the microscope/i),
    ).toBeDefined();
  });
});
