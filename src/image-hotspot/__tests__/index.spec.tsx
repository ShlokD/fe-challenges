import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import ImageHotspot from "..";

describe("<ImageHotspot />", () => {
  it("should render hotspots", async () => {
    render(
      <MemoryRouter>
        <ImageHotspot />
      </MemoryRouter>,
    );
    expect(
      await screen.findByRole("button", { name: /hotspot-1/i }),
    ).toBeDefined();
    const image = screen.getByTestId("pov-image");
    fireEvent.click(image, { clientX: 600, clientY: 600 });
    const save = await screen.findByRole("button", { name: /save/i });
    expect(save).toBeDefined();

    const input = screen.getByRole("textbox", { name: /add message/i });
    fireEvent.change(input, { target: { value: "hello" } });
    fireEvent.click(save);
    expect(
      await screen.findByRole("button", { name: /hotspot-3/i }),
    ).toBeDefined();
  });
});
