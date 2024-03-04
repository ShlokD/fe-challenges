import { useState } from "react";

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

const MultiSearchSelect = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const addSuggestion = (s: string) => {
    setSelected((prev) => {
      return [...prev, s];
    });
  };

  const removeItem = (s: string) => {
    setSelected((prev) => {
      return prev.filter((f) => f !== s);
    });
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };
  let suggestions = fruits.filter((f) => !selected.includes(f));

  if (searchTerm.length > 0) {
    suggestions = suggestions.filter((f) =>
      f.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }
  return (
    <div className="flex flex-col w-full min-h-screen ">
      <header className="p-4 bg-black text-white flex flex-row items-center justify-center gap-2">
        <div className="p-2 bg-white">
          <HomeLink />
        </div>
        <h1 className="font-bold text-2xl">Multi Search Select</h1>
      </header>
      <main className="flex flex-col min-h-screen w-full bg-yellow-200 p-2">
        <div
          className="flex flex-wrap gap-1 bg-blue-50 border-2 border-black p-8 w-full"
          style={{
            height: "20vh",
          }}
        >
          {selected.map((s, i) => {
            return (
              <button
                key={`selected-${i}`}
                className="bg-pink-400 p-2 text-white rounded-2xl shadow font-bold text-lg"
                onClick={() => removeItem(s)}
              >
                {s} x
              </button>
            );
          })}
        </div>

        <div
          className="flex flex-col items-start my-4 bg-blue-50 p-4 w-full overflow-scroll border-2 border-black"
          style={{
            height: "70vh",
          }}
        >
          <input
            type="search"
            className="rounded-xl p-4 self-center text-lg font-bold w-2/3 border-2 border-black"
            onChange={(ev) => handleSearch(ev.target.value)}
            value={searchTerm}
            placeholder="Search..."
            aria-label="Search fruits"
          ></input>

          {suggestions.map((s, i) => {
            return (
              <button
                className="p-4 w-full text-left text-2xl font-bold border-b-2 border-black"
                onClick={() => addSuggestion(s)}
                key={`suggestion-${i}`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default MultiSearchSelect;
