import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, it, vi } from "vitest";

import NotificationsPopup from "..";

beforeEach(() => {
  vi.useFakeTimers();
  render(
    <MemoryRouter>
      <NotificationsPopup />
    </MemoryRouter>,
  );
});

afterEach(() => {
  vi.useRealTimers();
});

describe("<NotificationsPopup />", () => {
  it("should render notifications", async () => {
    const text = screen.getByText(/Click to Toggle Notification/i);
    expect(text).toBeDefined();
    const success = screen.getByRole("button", { name: /success/i });
    expect(success).toBeDefined();
    expect(screen.getByRole("button", { name: /warning/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /error/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /info/i })).toBeDefined();

    fireEvent.click(success);
    const notification = screen.getByRole("button", {
      name: /success notification triggered/i,
    });

    expect(notification).toBeDefined();
    fireEvent.click(notification);
    expect(
      screen.queryByRole("button", { name: /success notification triggered/i }),
    ).toEqual(null);
  });
});
