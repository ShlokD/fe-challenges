import { DragEvent, FormEvent, useEffect, useRef, useState } from "react";

import HomeLink from "../home-link";

const fruits = [
  "Apple",
  "Banana",
  "Orange",
  "Grape",
  "Strawberry",
  "Mango",
  "Pineapple",
  "Watermelon",
  "Kiwi",
  "Blueberry",
  "Cherry",
  "Peach",
  "Pear",
  "Coconut",
  "Grapefruit",
  "Papaya",
  "Avocado",
  "Lychee",
  "Pomegranate",
  "Honeydew",
];

type Item = {
  value: string;
  saved: boolean;
};
const SortableList = () => {
  const [items, setItems] = useState<Item[]>(
    new Array(5).fill({ value: "", saved: false }),
  );
  const values = items.map((i) => i.value);
  const suggestions = fruits.filter((f) => !values.includes(f));
  const inputsRef = useRef<HTMLInputElement[] | null[]>([]);
  const [emptySlot, setEmptySlot] = useState(0);

  const setItem = (index: number, value: string) => {
    setItems((prev) => {
      const newItems = [...prev];
      newItems[index] = {
        ...newItems[index],
        value,
      };
      return newItems;
    });
  };

  const saveItem = (index: number, value: string) => {
    let nextIndex = -1;
    setItems((prev) => {
      const newItems = [...prev];
      newItems[index] = {
        value: value.length === 0 ? newItems[index].value : value,
        saved: true,
      };
      nextIndex = newItems.findIndex((v) => v.value.length === 0);
      if (nextIndex !== items.length) {
        setEmptySlot(nextIndex);
      }
      return newItems;
    });
  };

  const handleSubmit = (index: number, ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    saveItem(index, items[index].value);
  };

  const clearItem = (index: number) => {
    setItems((prev) => {
      const newItems = [...prev];
      newItems[index] = {
        ...newItems[index],
        value: "",
        saved: false,
      };
      if (emptySlot === -1) {
        setEmptySlot(index);
      }
      return newItems;
    });
  };

  const addSuggestion = (suggestion: string) => {
    saveItem(emptySlot, suggestion);
  };

  const handleDragEnter = (e: DragEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleDragStart = (e: DragEvent<HTMLButtonElement>, index: number) => {
    e.dataTransfer.setData("text/plain", String(index));
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: DragEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLButtonElement>, destination: number) => {
    e.stopPropagation();
    e.preventDefault();

    const data = e.dataTransfer.getData("text");

    const source = Number(data);
    if (isNaN(source)) {
      return;
    }

    setItems((prev) => {
      const newItems = [...prev];
      const temp = newItems[destination];
      newItems[destination] = newItems[source];
      newItems[source] = temp;
      return newItems;
    });
  };
  useEffect(() => {
    inputsRef.current?.[emptySlot]?.focus();
  }, [emptySlot]);
  return (
    <div className="flex flex-col w-full">
      <header className="bg-blue-600 p-4 flex justify-center gap-4 items-center">
        <HomeLink />
        <h1 className="text-white font-bold self-center text-2xl">
          Sortable List
        </h1>
      </header>
      <main className="flex flex-col w-full min-h-screen p-2">
        <div className="flex gap-2 items-center ">
          <div className="flex flex-col w-2/3 gap-4 items-center">
            {items.map((item, i) => {
              const num = i + 1;
              const disabled = i > emptySlot;
              return item.saved ? (
                <button
                  className="bg-blue-500 p-4 rounded-xl shadow w-4/5 hover:bg-blue-700"
                  onClick={() => clearItem(i)}
                  key={`input-${i}`}
                  draggable
                  onDragEnter={handleDragEnter}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, i)}
                  onDragStart={(e) => handleDragStart(e, i)}
                >
                  {item.value}
                </button>
              ) : (
                <form key={`input-${i}`} onSubmit={(ev) => handleSubmit(i, ev)}>
                  <input
                    disabled={disabled}
                    placeholder={`${num}. Add Fruit`}
                    aria-label={disabled ? `${num} Add  Fruit` : item.value}
                    value={item.value}
                    autoFocus={i === emptySlot}
                    onChange={(ev) => setItem(i, ev.target.value)}
                    ref={(el) => (inputsRef.current[i] = el)}
                    className={`${
                      disabled ? "bg-gray-100" : "bg-white"
                    } shadow border-2 rounded-xl p-4 focus:border-yellow-400 hover:border-black`}
                    list="suggestions-list"
                  />
                </form>
              );
            })}
            <datalist id="suggestions-list">
              {suggestions.map((suggestion, i) => {
                return (
                  <option value={suggestion} key={`input-suggestion-${i}`}>
                    {suggestion}
                  </option>
                );
              })}
            </datalist>
          </div>
          <div className="flex flex-col gap-1 w-1/3 items-start">
            <p className="text-2xl font-bold p-2">Suggested Fruits</p>
            {suggestions.map((suggestion, i) => {
              return (
                <button
                  key={`button-suggestion-${i}`}
                  className="text-gray-500"
                  onClick={() => addSuggestion(suggestion)}
                >
                  + {suggestion}
                </button>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};
export default SortableList;
