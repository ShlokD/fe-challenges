import { useState } from "react";

import HomeLink from "../home-link";

type Todo = {
  title: string;
  done: boolean;
  isEdit: boolean;
};

const TodoList = () => {
  const date = new Date();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoText, setTodoText] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const handleAddTodo = () => {
    if (!todoText || todoText.length === 0) {
      return;
    }

    setTodos((prev) => [
      ...prev,
      { title: todoText, done: false, isEdit: false },
    ]);

    setTodoText("");
  };

  const handleSearch = (ev: React.ChangeEvent) => {
    setSearch((ev?.target as HTMLInputElement)?.value);
  };

  const handleSearchSubmit = (ev: React.KeyboardEvent) => {
    if (ev?.key === "Enter") {
      setSearch("");
    }
  };

  const handleTodoClick = (index: number) => {
    setTodos((prev) => {
      const newTodos = prev.slice();
      newTodos[index].isEdit = !newTodos[index].isEdit;
      return newTodos;
    });
  };

  const handleDone = (index: number) => {
    setTodos((prev) => {
      const newTodos = prev.slice();
      newTodos[index].done = true;
      newTodos[index].isEdit = false;
      return newTodos;
    });
  };

  const handleDelete = (index: number) => {
    setTodos((prev) => prev.filter((_, i) => i !== index));
  };

  const total = todos.length;
  const done = todos.filter((t) => t.done).length;
  let displayTodos = todos;

  if (filter) {
    displayTodos = displayTodos.filter((t) =>
      filter === "DONE" ? t.done : !t.done,
    );
  }

  if (search) {
    displayTodos = displayTodos.filter((t) =>
      t.title.toLowerCase().includes(search.toLowerCase()),
    );
  }
  return (
    <div className="flex flex-col w-screen">
      <header className="p-4 bg-blue-900 flex flex-row gap-2 justify-center items-center">
        <HomeLink />
        <h1 className="font-bold text-2xl text-white">ToDo List</h1>
      </header>
      <main className="flex flex-col w-screen justify-center">
        <div className="flex flex-row justify-between items-center p-4 my-2">
          <div className="flex flex-row gap-1">
            <p className="text-6xl font-bold text-gray-500">
              {date.toLocaleDateString("default", { day: "2-digit" })}
            </p>
            <div className="flex flex-col">
              <p className="text-xl font-bold text-gray-500">
                {date.toLocaleDateString("default", { month: "short" })}
              </p>
              <p className="text-xl text-gray-500">{date.getFullYear()}</p>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-500">
            {date.toLocaleDateString("default", { weekday: "long" })}
          </p>
        </div>

        <input
          className="my-4 self-center w-11/12 p-3 mx-4 border-2"
          type="search"
          placeholder="Search items"
          aria-label="Search"
          value={search}
          onChange={handleSearch}
          onKeyDown={handleSearchSubmit}
        />
        <progress
          id="todo-progress"
          className="border-2 self-center w-11/12 h-8"
          value={done}
          max={total}
        />
        <div className="flex flex-row justify-center items-center gap-4 self-end p-4 lg:mr-4">
          {filter && (
            <button
              className="p-2 border-2 rounded-lg text-sm"
              onClick={() => setFilter("")}
            >
              Clear
            </button>
          )}
          <input
            className="hidden"
            type="radio"
            name="filter"
            id="done"
            checked={filter === "DONE"}
            value="DONE"
            onChange={(ev) =>
              setFilter((ev?.target as HTMLInputElement)?.value)
            }
          />
          <label
            className={`border-2 rounded-full text-lg p-2 ${
              filter === "DONE" ? "bg-green-400" : "bg-white"
            }`}
            htmlFor="done"
          >
            Done
          </label>
          <input
            className="hidden"
            type="radio"
            name="filter"
            id="pending"
            value="PENDING"
            checked={filter === "PENDING"}
            onChange={(ev) =>
              setFilter((ev?.target as HTMLInputElement)?.value)
            }
          />
          <label
            className={`border-2 rounded-full text-lg p-2 ${
              filter === "PENDING" ? "bg-green-400" : "bg-white"
            }`}
            htmlFor="pending"
          >
            Pending
          </label>
        </div>
        <div className="flex flex-row self-center p-4 lg:w-11/12 w-full">
          <input
            className="w-10/12 border-2 p-4"
            placeholder="Add new item..."
            aria-label="Add new todo"
            value={todoText}
            onChange={(ev) =>
              setTodoText((ev?.target as HTMLInputElement)?.value)
            }
          />
          <button
            className="bg-blue-800 p-4 w-2/12 rounded-r-lg font-bold text-4xl text-white"
            aria-label="Submit Todo"
            onClick={handleAddTodo}
          >
            +
          </button>
        </div>

        <div className="flex flex-col p-4 gap-2">
          {displayTodos.map((todo, index) => {
            return (
              <div
                key={`todo-${index}`}
                className={`flex flex-row justify-center border-2 w-full ${
                  todo.done ? "bg-gray-400" : "bg-white"
                }`}
              >
                <button
                  className={`w-10/12 p-4 rounded-lg text-lg ${
                    todo.done ? "line-through" : "none"
                  }`}
                  disabled={todo.done}
                  onClick={() => handleTodoClick(index)}
                >
                  {todo.title}
                </button>
                {todo.isEdit && (
                  <div className="flex flex-row">
                    <button
                      className="bg-red-500 text-white p-4"
                      onClick={() => handleDelete(index)}
                      aria-label={`Delete ${todo.title}`}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-green-500 text-white p-4"
                      onClick={() => handleDone(index)}
                      aria-label={`Done ${todo.title}`}
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default TodoList;
