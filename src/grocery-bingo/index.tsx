import { useEffect, useState } from "react";

import HomeLink from "../home-link";

type GroceryItem = {
  title: string;
  checked: boolean;
};
const isBingo = (list: GroceryItem[], size: number) => {
  if (list.filter((item) => item.checked).length < size) {
    return false;
  }

  let row = false;
  for (let i = 0; i < size; ++i) {
    row = true;

    for (let j = 0; j < size; ++j) {
      if (!list[i + j].checked && !(list[i + j].title === "FREE")) {
        row = false;
      }
    }

    if (row) {
      return true;
    }
  }

  let col = false;
  for (let i = 0; i < size; ++i) {
    col = true;
    for (let j = 0; j < size * size; j += size) {
      if (!list[i + j].checked && !(list[i + j].title === "FREE")) {
        col = false;
      }
    }

    if (col) {
      return true;
    }
  }

  let diag1 = true;
  for (let i = 0; i < size * size; i += size + 1) {
    if (!list[i].checked && !(list[i].title === "FREE")) {
      diag1 = false;
    }
  }

  if (diag1) {
    return true;
  }

  let diag2 = true;
  for (let i = (size - 1) * size; i >= size - 1; i -= size - 1) {
    if (!list[i].checked && !(list[i].title === "FREE")) {
      diag2 = false;
    }
  }

  if (diag2) {
    return true;
  }

  return false;
};

const GroceryBingo = () => {
  const size = 5;
  const [title, setTitle] = useState("");
  const [list, setList] = useState<GroceryItem[]>(
    new Array(size * size).fill({ title: "FREE", checked: false }),
  );
  const [bingo, setBingo] = useState("NO_BINGO");

  const handleChecked = (index: number) => {
    setList((prev) => {
      const newList = prev.slice();
      newList[index] = { ...newList[index], checked: !newList[index].checked };
      if (bingo === "NO_BINGO" && isBingo(newList, size)) {
        setBingo("BINGO");
      }
      return newList;
    });
  };

  const reset = () => {
    setList((prev) => {
      return prev.map((item) => ({ ...item, checked: false }));
    });
    setBingo("NO_BINGO");
  };

  const hide = () => {
    setBingo("HIDDEN");
  };

  const handleAddItem = () => {
    if (title.length === 0) {
      return;
    }

    setList((prev) => {
      const newList = prev.slice();
      const randomIndex = Math.floor(Math.random() * newList.length);
      newList[randomIndex] = {
        ...newList[randomIndex],
        title: title.toUpperCase(),
      };
      return newList;
    });
    setTitle("");
  };

  const clearList = () => {
    setList(new Array(size * size).fill({ title: "FREE", checked: false }));
    setBingo("NO_BINGO");
  };

  const saveToLocalStorage = () => {
    window?.localStorage?.setItem("grocery-list", JSON.stringify(list));
  };

  const readFromLocalStorage = () => {
    const rawList = window?.localStorage?.getItem("grocery-list");
    if (rawList) {
      setList(JSON.parse(rawList));
    }
  };

  useEffect(() => {
    readFromLocalStorage();
  }, []);

  useEffect(() => {
    if (list.length > 0) {
      saveToLocalStorage();
    }
  }, [list]);

  return (
    <div className="flex flex-col w-full ">
      <header className="flex flex-row justify-center items-center gap-2 p-4 bg-green-500">
        <HomeLink />
        <h1 className="font-bold text-2xl">Grocery Bingo</h1>
      </header>
      <main className="flex flex-col w-full p-8">
        <div className="flex flex-row gap-2 items-center justify-center">
          <input
            className="p-2 border-2 border-black text-lg"
            value={title}
            aria-label="Enter grocery item"
            placeholder="Eggs,cheese,milk"
            onChange={(ev) => setTitle((ev?.target as HTMLInputElement)?.value)}
          />
          <button
            onClick={handleAddItem}
            aria-label="Add Item"
            className="bg-green-700 text-white font-bold w-12 h-12 rounded-full"
          >
            +
          </button>
          <button
            className="p-2 bg-green-700 text-white font-bold p-4"
            onClick={clearList}
          >
            Clear List
          </button>
        </div>
        <div
          className={`flex flex-col items-center ${
            bingo == "BINGO" ? "opacity-100" : "opacity-0"
          } transition-opacity transition-duration-500`}
        >
          <p className="text-blue-300 font-bold text-4xl p-4 text-center">
            You Got Grocery Bingo!!!
          </p>

          <div className="flex flex-row gap-2">
            <button
              className="p-2 bg-green-700 text-white font-bold p-4"
              onClick={reset}
            >
              Reset
            </button>
            <button
              className="p-2 bg-green-700 text-white font-bold p-4"
              onClick={hide}
            >
              Hide
            </button>
          </div>
        </div>

        <div className="grid grid-rows-5 grid-cols-5 my-4 md:w-2/3 w-full self-center">
          {list.map((item, i) => {
            return (
              <div
                key={`grocery-item-${i}`}
                className={`${
                  item.checked ? "bg-green-800 text-white" : "bg-white"
                } border-2 border-black p-2 text-center`}
              >
                <input
                  className="hidden"
                  type="checkbox"
                  id={`grocery-item=${i}`}
                  defaultChecked={item.checked}
                  onChange={() => handleChecked(i)}
                />
                <label
                  className={`
                  ${
                    item.title === "FREE"
                      ? "text-red-400"
                      : item.checked
                      ? "text-white"
                      : "text-green-700"
                  } font-bold w-2/3 text-xs text-center break-all`}
                  htmlFor={`grocery-item=${i}`}
                >
                  {item.title}
                </label>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default GroceryBingo;
