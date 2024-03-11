import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import SeatSelection from "..";

describe("<SeatSelection />", () => {
  it("should render list of seats", async () => {
    render(
      <MemoryRouter>
        <SeatSelection />
      </MemoryRouter>,
    );
    expect(await screen.findByText(/stage/i)).toBeDefined();
    const seats = screen.getAllByRole("button", { name: /seat/i });
    const seat = seats.find((seat) => !seat.disabled);
    fireEvent.click(seat);
    const buy = screen.getByRole("button", { name: /buy/i });
    expect(buy).toBeDefined();
    expect(buy.disabled).toEqual(false);
  });
});
