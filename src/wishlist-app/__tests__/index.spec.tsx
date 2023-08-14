import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import Wishlist from "..";

describe("<Wishlist />", () => {
  it("should render form and wishlist", async () => {
    render(
      <MemoryRouter>
        <Wishlist />
      </MemoryRouter>,
    );
    const add = await screen.findByRole("button", { name: /add/i });
    expect(add).toBeDefined();
    const urlInput = screen.getByRole("textbox", {
      name: /product url/i,
    });

    expect(urlInput).toBeDefined();
    expect(
      screen.getByText(/Your wishlist is empty. Add some urls to get started/i),
    ).toBeDefined();
    fireEvent.change(urlInput, {
      target: {
        value:
          "https://www.flipkart.com/boult-audio-y1-zen-enc-mic-40hrs-playtime-fast-charging-pro-calling-ipx5-btv-5-3-bluetooth-headset/p/itme4d24273ffaeb",
      },
    });
    fireEvent.click(add);

    expect(
      await screen.getByRole("link", {
        name: /boult audio y1 zen enc/i,
      }),
    ).toBeDefined();
    expect(
      screen.getByRole("button", { name: /delete product 0/i }),
    ).toBeDefined();
    expect(
      screen.getByRole("button", { name: /mark as done product 0/i }),
    ).toBeDefined();
  });
});
