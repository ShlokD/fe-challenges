import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, it, vi } from "vitest";

import CalendarReminder from "..";

beforeEach(() => {
  vi.useFakeTimers().setSystemTime(new Date(2024, 11, 1));
  render(
    <MemoryRouter>
      <CalendarReminder />
    </MemoryRouter>,
  );
});

afterEach(() => {
  vi.useRealTimers();
});

describe("<CalendarReminder />", () => {
  it(
    "should render calendar and reminders",
    async () => {
      expect(
        screen.getByRole("button", { name: /add reminder/i }),
      ).toBeDefined();
      expect(
        screen.getByRole("combobox", { name: /choose month/i }),
      ).toBeDefined();
      expect(
        screen.getByRole("combobox", { name: /choose year/i }),
      ).toBeDefined();
      const dateBtn = screen.getByRole("button", { name: /25-11-2024/i });
      expect(dateBtn).toBeDefined();
      fireEvent.click(dateBtn);
      const message = screen.getByRole("textbox", { name: /message/i });
      expect(message).toBeDefined();
      const submit = screen.getByRole("button", { name: /done/i });
      expect(submit).toBeDefined();
      fireEvent.change(message, { target: { value: "abc" } });
      fireEvent.click(submit);
      fireEvent.click(dateBtn);
      expect(screen.getByRole("button", { name: "abc" })).toBeDefined();
      const del = screen.getByRole("button", { name: /delete abc/i });
      expect(del).toBeDefined();
      fireEvent.click(del);
      expect(screen.queryByRole("button", { name: "abc" })).toEqual(null);
    },
    8 * 1000,
  );
});
