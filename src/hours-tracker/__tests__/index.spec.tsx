import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, it } from "vitest";

import HoursTracker from "..";

beforeEach(() => {
  render(
    <MemoryRouter>
      <HoursTracker />
    </MemoryRouter>,
  );
});

describe("Hours Tracker", () => {
  it("should render elements", async () => {
    const newSkill = await screen.findByRole("textbox", {
      name: /enter new skill/i,
    });

    expect(newSkill).toBeDefined();
    const addSkill = screen.getByRole("button", { name: /add/i });
    expect(addSkill).toBeDefined();

    fireEvent.change(newSkill, { target: { value: "Baking" } });
    fireEvent.click(addSkill);

    const spanish = screen.getByRole("button", { name: /spanish/i });
    expect(spanish).toBeDefined();
    expect(within(spanish).getByText(/80/i)).toBeDefined();

    expect(screen.getByRole("button", { name: /drums/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /yoga/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /baking/i })).toBeDefined();

    fireEvent.click(spanish);
    const minutes = await screen.findByRole("spinbutton", {
      name: /enter minutes practiced/i,
    });
    expect(minutes).toBeDefined();
    const done = screen.getByRole("button", { name: /done/i });

    expect(done).toBeDefined();
    expect(screen.getByRole("button", { name: /close/i })).toBeDefined();

    fireEvent.change(minutes, { target: { value: 60 } });
    fireEvent.click(done);

    expect(within(spanish).getByText(/81/i)).toBeDefined();
  });
});
