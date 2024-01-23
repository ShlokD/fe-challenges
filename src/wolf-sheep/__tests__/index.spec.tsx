import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import WolfSheep from "..";

describe("<WolfSheep />", () => {
  it("should render game elements", async () => {
    render(
      <MemoryRouter>
        <WolfSheep />
      </MemoryRouter>,
    );
    expect(
      await screen.findByRole("button", { name: /show instructions/i }),
    ).toBeDefined();
    const addPair = screen.getByRole("button", { name: /add pair/i });
    expect(addPair).toBeDefined();
    expect(screen.getAllByRole("button", { name: /🐺/ })).toHaveLength(3);
    expect(screen.getAllByRole("button", { name: /🐑/ })).toHaveLength(3);

    fireEvent.click(addPair);
    const wolves = screen.getAllByRole("button", { name: /🐺/ });
    expect(wolves).toHaveLength(4);
    const sheep = screen.getAllByRole("button", { name: /🐑/ });
    expect(sheep).toHaveLength(4);
    fireEvent.click(sheep[0]);
    fireEvent.click(sheep[1]);

    const sail = screen.getByRole("button", { name: /sail/i });
    fireEvent.click(sail);

    waitFor(async () => {
      expect(await screen.findByText(/you lose/i)).toBeDefined();
    });
  });
});
