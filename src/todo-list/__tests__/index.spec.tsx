import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, vi } from "vitest";

import TodoList from "..";

vi.useFakeTimers();
describe("<TodoList />", () => {
  it("should render todo list experience", async () => {
    vi.setSystemTime(new Date("2020-01-01"));
    render(
      <MemoryRouter>
        <TodoList />
      </MemoryRouter>,
    );

    const year = screen.getByText(/2020/i);
    expect(year).toBeDefined();
    expect(screen.getByText("Wednesday")).toBeDefined();
    expect(screen.getByRole("searchbox", { name: /search/i })).toBeDefined();
    expect(screen.getByRole("radio", { name: /done/i })).toBeDefined();
    expect(screen.getByRole("radio", { name: /pending/i })).toBeDefined();

    const addTodo = screen.getByRole("textbox", { name: /add new todo/i });

    expect(addTodo).toBeDefined();
    const submit = screen.getByRole("button", { name: /submit todo/i });
    expect(submit).toBeDefined();

    fireEvent.change(addTodo, { target: { value: "Something" } });
    fireEvent.click(submit);

    const todo = screen.getByRole("button", { name: /something/i });

    expect(todo).toBeDefined();

    fireEvent.click(todo);

    expect(
      screen.getByRole("button", { name: /delete something/i }),
    ).toBeDefined();

    const done = screen.getByRole("button", { name: /done something/i });
    expect(done).toBeDefined();
    fireEvent.click(done);

    expect(screen.getByRole("button", { name: /something/i }).disabled).toEqual(
      true,
    );
  });
});
